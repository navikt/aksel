import { client } from "@/app/_sanity/client";
import { writeToken } from "@/app/_sanity/token";
import { CONSENT_TRACKER_STATE } from "@/app/_ui/cookie-consent/CookieConsent.config";

const stateToSanityKey = {
  accepted: "accept",
  rejected: "decline",
} as const;

export async function POST(request: Request) {
  try {
    const { state } = (await request.json()) as {
      state: CONSENT_TRACKER_STATE;
    };

    if (!["accepted", "rejected"].includes(state)) {
      return new Response(null, { status: 400 });
    }

    await client
      .config({
        token: writeToken,
      })
      .patch("cookie_tracker")
      .inc({ total: 1, [stateToSanityKey[state]]: 1 })
      .commit()
      .catch(() => console.warn("Cookie tracker document patch failed"));

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Cookie consent tracking failed:", error);
    return new Response(null, { status: 500 });
  }
}
