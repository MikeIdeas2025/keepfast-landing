import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = body;

    // Validation
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!email || !email.trim() || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.toLowerCase().trim();

    // Add contact to Resend Audience
    // Note: You need to create an Audience in Resend dashboard first
    try {
      await resend.contacts.create({
        email: trimmedEmail,
        firstName: trimmedName.split(" ")[0] || trimmedName,
        lastName: trimmedName.split(" ").slice(1).join(" ") || "",
        unsubscribed: false,
      });
    } catch (contactError: any) {
      // If contact already exists, that's okay - we'll still send confirmation
      if (contactError?.message?.includes("already exists")) {
        console.log("Contact already exists:", trimmedEmail);
      } else {
        throw contactError;
      }
    }

    // Send confirmation email to user
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "Keepfa.st <onboarding@resend.dev>",
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
                  <a href="#" style="color: #999; text-decoration: underline;">Unsubscribe</a>
                </p>
              </div>
            </body>
          </html>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
      // Don't fail the request if email fails - contact was still added
    }

    return NextResponse.json(
      { success: true, message: "Successfully added to waitlist" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Waitlist submission error:", error);
    return NextResponse.json(
      { error: "Failed to process request. Please try again." },
      { status: 500 }
    );
  }
}

