"use client";

import { useEffect } from "react";
import { initPostHog } from "@/lib/posthog";

export default function PostHogProvider() {
  useEffect(() => {
    // Inizializza PostHog solo se l'utente ha già accettato i cookie
    const init = async () => {
      try {
        if (typeof window !== 'undefined') {
          const cookieConsent = localStorage.getItem("cookieConsent");
          if (cookieConsent === "accepted") {
            await initPostHog();
          }
        }
      } catch (error) {
        // Non bloccare l'app se c'è un errore
        console.warn('PostHogProvider error:', error);
      }
    };
    
    init();
  }, []);

  return null;
}
