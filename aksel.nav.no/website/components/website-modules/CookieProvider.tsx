"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Cookies } from "typescript-cookie";

export const CONSENT_TRACKER_ID = "aksel-consent";

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

const getCookieConsent = () => {
  const rawState = Cookies.get(CONSENT_TRACKER_ID) as string;

  if (!rawState) {
    return "undecided";
  }

  const cookieData = JSON.parse(rawState) as CookieData;

  return cookieData.consents.tracking as CONSENT_TRACKER_STATE;
};

const updateCookieConsent = (state: CONSENT_TRACKER_STATE) => {
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

type CookieContextType = {
  consent: CONSENT_TRACKER_STATE | null;
  updateConsent: (state: CONSENT_TRACKER_STATE) => void;
};

const CookieContext = createContext<CookieContextType | null>(null);

export const CookieProvider = ({ children }: { children: React.ReactNode }) => {
  const [consent, setConsent] = useState<CONSENT_TRACKER_STATE | null>(null);

  useEffect(() => {
    const acceptedTracking = getCookieConsent();

    setConsent(acceptedTracking);
  }, []);

  const updateConsent = (state: CONSENT_TRACKER_STATE) => {
    updateCookieConsent(state);
    setConsent(state);
  };

  const contextValue = useMemo(() => {
    return {
      consent,
      updateConsent,
    };
  }, [consent]);

  return (
    <CookieContext.Provider value={contextValue}>
      {children}
    </CookieContext.Provider>
  );
};

export const useCookies = () => {
  const context = useContext(CookieContext);

  if (!context) {
    throw new Error("useCookies must be used within a CookieProvider");
  }

  return context;
};
