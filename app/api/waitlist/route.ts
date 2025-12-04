import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting: Simple in-memory store
// In production with multiple instances, consider using Redis or Vercel KV
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();
const RATE_LIMIT_MAX_REQUESTS = 3;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

// Clean up old entries periodically (every 5 minutes)
if (typeof global !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      if (now > entry.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

function getRateLimitKey(request: NextRequest): string {
  // Get IP address from request
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
  return `waitlist:${ip}`;
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetTime) {
    // Create new entry
    const resetTime = now + RATE_LIMIT_WINDOW_MS;
    rateLimitStore.set(key, { count: 1, resetTime });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1, resetTime };
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetTime: entry.resetTime };
  }

  // Increment count
  entry.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - entry.count, resetTime: entry.resetTime };
}

// Email validation regex (RFC 5322 compliant, simplified)
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  if (email.length > 254) return false; // RFC 5321 limit
  return EMAIL_REGEX.test(email);
}

function sanitizeInput(input: string, maxLength: number = 255): string {
  if (!input || typeof input !== 'string') return '';
  // Remove control characters and trim
  return input.replace(/[\x00-\x1F\x7F]/g, '').trim().slice(0, maxLength);
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  
  try {
    // Rate limiting check
    const rateLimitKey = getRateLimitKey(request);
    const rateLimit = checkRateLimit(rateLimitKey);
    
    if (!rateLimit.allowed) {
      const resetSeconds = Math.ceil((rateLimit.resetTime - Date.now()) / 1000);
      console.warn(`[${requestId}] Rate limit exceeded`, {
        ip: rateLimitKey,
        resetIn: resetSeconds,
      });
      return NextResponse.json(
        { 
          error: "Too many requests. Please try again later.",
          retryAfter: resetSeconds 
        },
        { 
          status: 429,
          headers: {
            'Retry-After': resetSeconds.toString(),
            'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
          }
        }
      );
    }

    const body = await request.json();
    const { name, email } = body;

    // Validation with sanitization
    if (!name || !name.trim()) {
      console.warn(`[${requestId}] Validation failed: name missing`);
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!email || !email.trim()) {
      console.warn(`[${requestId}] Validation failed: email missing`);
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Sanitize and validate email
    const trimmedEmail = email.toLowerCase().trim();
    if (!isValidEmail(trimmedEmail)) {
      console.warn(`[${requestId}] Validation failed: invalid email format`, { email: trimmedEmail.substring(0, 20) + '...' });
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const trimmedName = sanitizeInput(name, 100);
    if (trimmedName.length === 0) {
      console.warn(`[${requestId}] Validation failed: name empty after sanitization`);
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    // Add contact to Resend Audience
    // Note: resend.contacts.create() works without an Audience ID - it creates contacts in the default audience
    let contactCreated = false;
    try {
      await resend.contacts.create({
        email: trimmedEmail,
        firstName: trimmedName.split(" ")[0] || trimmedName,
        lastName: trimmedName.split(" ").slice(1).join(" ") || "",
        unsubscribed: false,
      });
      contactCreated = true;
      console.log(`[${requestId}] Contact created successfully`, { email: trimmedEmail.substring(0, 20) + '...' });
    } catch (contactError: any) {
      // If contact already exists, that's okay - we'll still send confirmation
      if (contactError?.message?.includes("already exists") || contactError?.statusCode === 422) {
        console.log(`[${requestId}] Contact already exists`, { email: trimmedEmail.substring(0, 20) + '...' });
        contactCreated = true; // Consider it successful
      } else {
        console.error(`[${requestId}] Failed to create contact`, {
          error: contactError?.message || 'Unknown error',
          statusCode: contactError?.statusCode,
          email: trimmedEmail.substring(0, 20) + '...',
        });
        // Don't throw - we'll still try to send the email
      }
    }

    // Send confirmation email to user
    let emailSent = false;
    try {
      const fromEmail = process.env.RESEND_FROM_EMAIL || "Keepfa.st <onboarding@resend.dev>";
      await resend.emails.send({
        from: fromEmail,
        to: trimmedEmail,
        subject: "🎉 You're on the Keepfa.st waitlist!",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #FFF8E7 0%, #FFE5E5 50%, #FFF4CC 100%); padding: 40px 20px; text-align: center; border-radius: 12px; margin-bottom: 30px;">
                <h1 style="color: #1A1A1A; margin: 0; font-size: 32px;">Welcome to Keepfa.st!</h1>
              </div>
              
              <p style="font-size: 18px; margin-bottom: 20px;">Hi ${trimmedName},</p>
              
              <p style="font-size: 16px; margin-bottom: 20px;">
                Thanks for joining the waitlist! We're building something special for indie founders like you.
              </p>
              
              <p style="font-size: 16px; margin-bottom: 20px;">
                <strong>Keepfa.st</strong> helps you stop SaaS churn before it happens by:
              </p>
              
              <ul style="font-size: 16px; margin-bottom: 30px; padding-left: 20px;">
                <li>📊 Calculating health scores for every customer</li>
                <li>🎯 Identifying who's at risk of churning</li>
                <li>💡 Providing AI-powered actionable insights</li>
                <li>⚡ Automatically tracking signals from your stack</li>
              </ul>
              
              <p style="font-size: 16px; margin-bottom: 30px;">
                We'll let you know as soon as we're ready to launch. In the meantime, follow us on <a href="https://twitter.com/keepfast" style="color: #FFB800; text-decoration: none; font-weight: 600;">Twitter</a> for updates!
              </p>
              
              <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #eee;">
                <p style="font-size: 14px; color: #666; margin: 0;">
                  Made with ❤️ for indie hackers
                </p>
                <p style="font-size: 12px; color: #999; margin-top: 10px;">
                  <a href="https://keepfa.st/privacy-policy" style="color: #999; text-decoration: underline;">Privacy Policy</a>
                </p>
              </div>
            </body>
          </html>
        `,
      });
      emailSent = true;
      console.log(`[${requestId}] Confirmation email sent successfully`, { 
        email: trimmedEmail.substring(0, 20) + '...',
        duration: Date.now() - startTime,
      });
    } catch (emailError: any) {
      console.error(`[${requestId}] Failed to send confirmation email`, {
        error: emailError?.message || 'Unknown error',
        statusCode: emailError?.statusCode,
        email: trimmedEmail.substring(0, 20) + '...',
        duration: Date.now() - startTime,
      });
      // Don't fail the request if email fails - contact was still added
    }

    const duration = Date.now() - startTime;
    console.log(`[${requestId}] Waitlist submission completed`, {
      email: trimmedEmail.substring(0, 20) + '...',
      contactCreated,
      emailSent,
      duration,
      rateLimitRemaining: rateLimit.remaining,
    });

    return NextResponse.json(
      { success: true, message: "Successfully added to waitlist" },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
        }
      }
    );
  } catch (error: any) {
    const duration = Date.now() - startTime;
    console.error(`[${requestId}] Waitlist submission error`, {
      error: error?.message || 'Unknown error',
      stack: error?.stack,
      duration,
    });
    
    // Return generic error to client, but log detailed error
    return NextResponse.json(
      { error: "Failed to process request. Please try again." },
      { status: 500 }
    );
  }
}

