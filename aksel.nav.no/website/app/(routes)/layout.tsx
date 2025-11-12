import { draftMode } from "next/headers";
import { SanityLive } from "@/app/_sanity/live";
import { ConsentBanner } from "@/app/_ui/consent-banner/ConsentBanner";
import { CookieConsentProvider } from "@/app/_ui/cookie-consent/CookieConsent.Provider";
import { DraftOverlay } from "@/app/_ui/draft-overlay/DraftOverlay";
import { Umami } from "@/app/_ui/umami/Umami";

export default async function IndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <>
      <CookieConsentProvider>
        <Umami isDraftMode={isDraftMode} />
        <ConsentBanner />
        {children}
        {isDraftMode && <DraftOverlay />}
      </CookieConsentProvider>
      <SanityLive
        intervalOnGoAway={false}
        refreshOnFocus={false}
        refreshOnMount={false}
      />
    </>
  );
}
