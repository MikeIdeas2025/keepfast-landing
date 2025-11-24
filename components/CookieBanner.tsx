"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getPostHog, initPostHog } from "@/lib/posthog";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Verifica se siamo nel browser
    if (typeof window === 'undefined') return;
    
    const cookieConsent = localStorage.getItem("cookieConsent");
    console.log('Cookie consent status:', cookieConsent);
    
    if (!cookieConsent) {
      // Mostra il banner dopo un breve delay
      const timer = setTimeout(() => {
        console.log('Showing cookie banner');
        setShowBanner(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      console.log('Cookie consent already set, not showing banner');
    }
  }, []);

  const acceptCookies = async () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
    
    // Inizializza e abilita PostHog (solo se configurato)
    if (typeof window !== 'undefined') {
      try {
        await initPostHog();
        const posthog = getPostHog();
        if (posthog && (posthog as any).__loaded) {
          posthog.opt_in_capturing();
          posthog.capture('cookie_consent_accepted');
        }
      } catch (error) {
        console.warn('PostHog not available:', error);
      }
    }
  };

  const rejectCookies = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setShowBanner(false);
    
    // Disabilita PostHog (solo se configurato)
    if (typeof window !== 'undefined') {
      try {
        const posthog = getPostHog();
        if (posthog && (posthog as any).__loaded) {
          posthog.opt_out_capturing();
        }
      } catch (error) {
        console.warn('PostHog not available:', error);
      }
    }
  };

  // Non renderizzare fino a quando non siamo nel browser (evita problemi di hydration)
  if (!mounted || !showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 animate-appearFromBottom">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-2">🍪 We use cookies</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We use cookies and analytics to improve your experience and understand how you use our site. 
              By clicking "Accept All", you consent to our use of cookies.{" "}
              <Link href="/cookie-policy" className="text-brand-yellow hover:underline font-medium">
                Learn more
              </Link>
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={rejectCookies}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Reject
            </button>
            <button
              onClick={acceptCookies}
              className="btn btn-brand-yellow px-6 py-2 text-sm font-medium"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
