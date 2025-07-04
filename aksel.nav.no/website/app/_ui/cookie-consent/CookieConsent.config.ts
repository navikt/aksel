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

export { CONSENT_TRACKER_ID, CURRENT_VERSION };

export type { CONSENT_TRACKER_STATE, CookieData };
