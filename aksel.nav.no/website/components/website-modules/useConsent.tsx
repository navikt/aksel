import { useEffect, useState } from "react";
import { Cookies } from "typescript-cookie";

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

const getStorageAcceptedTracking = () => {
  const rawState = Cookies.get(CONSENT_TRACKER_ID) as string;

  if (!rawState) {
    return "undecided";
  }

  const cookieData = JSON.parse(rawState) as CookieData;

  return cookieData.consents.tracking as CONSENT_TRACKER_STATE;
};

const updateConsent = (state: CONSENT_TRACKER_STATE) => {
  const cookieData: CookieData = {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: 1,
    consents: {},
  };

  cookieData.consents.tracking = state;

  const cookieJson = JSON.stringify(cookieData);

  Cookies.set(CONSENT_TRACKER_ID, cookieJson, {
    expires: 365,
    domain: window.location.hostname,
  });
};

const useConsent = () => {
  const [consent, setConsent] = useState<CONSENT_TRACKER_STATE>("undecided");

  useEffect(() => {
    const acceptedTracking = getStorageAcceptedTracking();

    setConsent(acceptedTracking);
  }, []);

  return { consent, updateConsent };
};

export default useConsent;
