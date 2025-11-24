// Lazy import di PostHog per evitare errori durante il SSR
let posthog: any = null;
let posthogInitialized = false;

export const initPostHog = async () => {
  try {
    if (typeof window === 'undefined') return;
    
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';
    
    if (!posthogKey) {
      return; // PostHog non configurato, non fare nulla
    }

    // Import dinamico solo quando necessario
    if (!posthog && !posthogInitialized) {
      posthogInitialized = true;
      const posthogModule = await import('posthog-js');
      posthog = posthogModule.default;
      
      if (posthog && !(posthog as any).__loaded) {
        posthog.init(posthogKey, {
          api_host: posthogHost,
          loaded: (ph: any) => {
            if (process.env.NODE_ENV === 'development') {
              console.log('PostHog loaded successfully');
            }
          },
          // Rispetta il consenso ai cookie - disabilitato di default
          opt_out_capturing_by_default: true,
          // Session replay disabilitato di default
          disable_session_recording: true,
          // Autocapture eventi base
          autocapture: true,
          // Persistenza del consenso
          persistence: 'localStorage+cookie',
        });
      }
    }
  } catch (error) {
    // Non bloccare l'app se PostHog fallisce
    console.warn('PostHog initialization failed:', error);
    posthog = null;
  }
}

export const getPostHog = () => {
  return posthog;
}
