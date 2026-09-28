import { draftMode } from "next/headers";
import { SanityLive } from "@/app/_sanity/live";
import { DraftOverlay } from "@/app/_ui/draft-overlay/DraftOverlay";
import { SiteTracking } from "@/app/_ui/umami/SiteTracking";

export default async function IndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <>
      <SiteTracking isDraftMode={isDraftMode}>
        {children}
        {isDraftMode && <DraftOverlay />}
      </SiteTracking>
      {isDraftMode && <SanityLive includeDrafts onWelcome={false} />}
    </>
  );
}
