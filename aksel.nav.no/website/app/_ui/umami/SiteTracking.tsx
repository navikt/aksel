"use client";

import { ConsentBanner } from "@/app/_ui/consent-banner/ConsentBanner";
import { CookieConsentProvider } from "@/app/_ui/cookie-consent/CookieConsent.Provider";
import { Umami } from "@/app/_ui/umami/Umami";

/**
 * Cookie consent, consent banner and Umami.
 * Root-level `not-found.tsx` and `error.tsx` render outside `(routes)/layout.tsx`, so they need this too.
 */
function SiteTracking({
  isDraftMode = false,
  children,
}: {
  isDraftMode?: boolean;
  children: React.ReactNode;
}) {
  return (
    <CookieConsentProvider>
      <Umami isDraftMode={isDraftMode} />
      <ConsentBanner />
      {children}
    </CookieConsentProvider>
  );
}

export { SiteTracking };
