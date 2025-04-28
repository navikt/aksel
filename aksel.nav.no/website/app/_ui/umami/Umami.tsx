import { getCookieConsent } from "@/app/_ui/consent-banner/ConsentBanner.utils";
import { UmamiScript } from "./Umami.script";

async function Umami() {
  const consent = await getCookieConsent();

  return <UmamiScript enabled={consent === "accepted"} />;
}

export { Umami };
