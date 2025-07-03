"use server";

import { client } from "@/app/_sanity/client";
import { writeToken } from "@/app/_sanity/token";
import { CONSENT_TRACKER_STATE } from "@/app/_ui/cookie-consent/CookieConsent.config";

const stateToSanityKey = {
  accepted: "accept",
  rejected: "decline",
} as const;

async function trackCookieConsent(
  newState: CONSENT_TRACKER_STATE,
): Promise<void> {
  if (!["accepted", "rejected"].includes(newState)) {
    return;
  }

  await client
    .config({
      token: writeToken,
    })
    .patch("cookie_tracker")
    .inc({ total: 1, [stateToSanityKey[newState]]: 1 })
    .commit()
    .catch(() => console.warn("Cookie tracker document patch failed"));
}

export { trackCookieConsent };
