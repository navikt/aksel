"use server";

/**
 * TODO:
 * - Add next-logger instead of console.log
 */
import { cookies } from "next/headers";
import { client } from "@/app/_sanity/client";

const CURRENT_VERSION = 1;
const CONSENT_TRACKER_ID = "aksel-consent";

type CONSENT_TRACKER_STATE =
  | "undecided"
  | "accepted"
  | "rejected"
  | "no_action";

type CookieData = {
  createdAt: string;
  updatedAt: string;
  version: number;
  consents: {
    tracking?: CONSENT_TRACKER_STATE;
  };
};

const stateToSanityKey = {
  accepted: "accept",
  rejected: "decline",
} as const;

async function acceptCookiesAction(): Promise<void> {
  await updateCookieConsent("accepted");
}

async function rejectCookiesAction(): Promise<void> {
  await updateCookieConsent("rejected");
}

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
        token: process.env.SANITY_WRITE,
      })
      .patch("cookie_tracker")
      .inc({ total: 1, [stateToSanityKey[newState]]: 1 })
      .commit()
      .catch(() => console.warn("Cookie tracker document patch failed"));
  }
}

async function getCookieConsent(): Promise<CONSENT_TRACKER_STATE> {
  const cookieStore = await cookies();

  const rawState = cookieStore.get(CONSENT_TRACKER_ID)?.value;

  if (!rawState) {
    return "undecided";
  }

  const cookieData = JSON.parse(rawState) as CookieData;

  return cookieData.consents.tracking ?? "undecided";
}

/**
 * Helper utility to check if the consent banner should be shown.
 */
async function showConsentBanner(): Promise<boolean> {
  try {
    const consent = await getCookieConsent();
    return !["accepted", "rejected"].includes(consent);
  } catch (error) {
    console.error("Error getting cookie consent:", error);
    return false;
  }
}

function validateConsentState(state: string): state is CONSENT_TRACKER_STATE {
  return ["accepted", "rejected", "undecided", "no_action"].includes(state);
}

export {
  getCookieConsent,
  showConsentBanner,
  acceptCookiesAction,
  rejectCookiesAction,
};
