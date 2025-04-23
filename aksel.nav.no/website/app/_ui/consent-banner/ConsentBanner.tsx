import { showConsentBanner } from "./ConsentBanner.utils";
import { ConsentBannerView } from "./ConsentBanner.view";

/**
 * ConsentBanner uses next/cookies to check if the current consent-state for the user.
 * @note Since we use `next/cookies`, pages/layouts using component needs `export const dynamic = "force-dynamic";`
 * to ensure the component is server rendered.
 */
async function ConsentBanner() {
  const showBanner = await showConsentBanner();

  if (!showBanner) {
    return null;
  }

  return <ConsentBannerView />;
}

export { ConsentBanner };
