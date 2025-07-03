"use server";

import { cookies } from "next/headers";
import { client } from "@/app/_sanity/client";
import { writeToken } from "@/app/_sanity/token";
import {
  CONSENT_TRACKER_ID,
  CONSENT_TRACKER_STATE,
  CURRENT_VERSION,
  CookieData,
} from "@/app/_ui/cookie-consent/CookieConsent.config";

const stateToSanityKey = {
  accepted: "accept",
  rejected: "decline",
} as const;

async function updateCookieConsent(
  newState: CONSENT_TRACKER_STATE,
): Promise<void> {
  if (!validateConsentState(newState)) {
    throw new Error(`Invalid state: ${newState}`);
  }

  const cookieStore = await cookies();

  let createdAt = new Date().toISOString();

  const oldCookieValue = cookieStore.get(CONSENT_TRACKER_ID)?.value;
  if (oldCookieValue) {
    const oldCookieData = JSON.parse(oldCookieValue) as CookieData;
    createdAt = oldCookieData.createdAt;
  }

  const cookieData: CookieData = {
    createdAt,
    updatedAt: new Date().toISOString(),
    version: CURRENT_VERSION,
    consents: {},
  };

  cookieData.consents.tracking = newState;

  const cookieJson = JSON.stringify(cookieData);

  cookieStore.set(CONSENT_TRACKER_ID, cookieJson, {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  });

  if (["accepted", "rejected"].includes(newState)) {
    await client
      .config({
        token: writeToken,
      })
      .patch("cookie_tracker")
      .inc({ total: 1, [stateToSanityKey[newState]]: 1 })
      .commit()
      .catch(() => console.warn("Cookie tracker document patch failed"));
  }
}

function validateConsentState(state: string): state is CONSENT_TRACKER_STATE {
  return ["accepted", "rejected", "undecided", "no_action"].includes(state);
}

async function acceptCookiesAction(): Promise<void> {
  await updateCookieConsent("accepted");
}

async function rejectCookiesAction(): Promise<void> {
  await updateCookieConsent("rejected");
}

export { acceptCookiesAction, rejectCookiesAction };
