import { showConsentBanner } from "./ConsentBanner.utils";
import { ConsentBannerView } from "./ConsentBanner.view";

async function ConsentBanner() {
  const showBanner = await showConsentBanner();

  if (!showBanner) {
    return null;
  }

  return <ConsentBannerView />;
}

export { ConsentBanner };
