"use client";

import { useCookieConsent } from "@/app/_ui/cookie-consent/CookieConsent.Provider";
import { UmamiScript } from "./Umami.script";

function Umami() {
  const context = useCookieConsent();

  if (!context.consentState.loaded) {
    return null;
  }

  return <UmamiScript enabled={context.consentState.state === "accepted"} />;
}

export { Umami };
