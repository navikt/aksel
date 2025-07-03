"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getCookie } from "typescript-cookie";
import {
  acceptCookiesAction,
  rejectCookiesAction,
} from "@/app/_ui/cookie-consent/CookieConsent.actions";
import {
  CONSENT_TRACKER_ID,
  CONSENT_TRACKER_STATE,
  CookieData,
} from "@/app/_ui/cookie-consent/CookieConsent.config";

type CookieConsentContextType = {
  consentState:
    | { state: CONSENT_TRACKER_STATE; loaded: true }
    | { state: null; loaded: false };
  showCookieBanner: boolean;
  acceptCookiesAction: () => Promise<void>;
  rejectCookiesAction: () => Promise<void>;
};

const CookieConsentContext = createContext<CookieConsentContextType | null>(
  null,
);

function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consentState, setConsentState] = useState<
    CookieConsentContextType["consentState"]
  >({
    state: null,
    loaded: false,
  });

  const syncConsentState = useCallback(() => {
    const rawState = getCookie(CONSENT_TRACKER_ID);

    if (!rawState) {
      setConsentState({
        state: "undecided",
        loaded: true,
      });
      return;
    }

    try {
      const cookieData = JSON.parse(rawState) as CookieData;

      setConsentState({
        state: cookieData.consents.tracking ?? "undecided",
        loaded: true,
      });
    } catch {
      console.error("Failed to parse cookie data", rawState);
    }
  }, []);

  useEffect(() => {
    syncConsentState();
  }, [syncConsentState]);

  const contextValue = useMemo(() => {
    const actions = {
      acceptCookiesAction: async () => {
        await acceptCookiesAction();
        syncConsentState();
      },
      rejectCookiesAction: async () => {
        await rejectCookiesAction();
        syncConsentState();
      },
    };

    if (!consentState.loaded) {
      return {
        consentState,
        showCookieBanner: false,
        ...actions,
      };
    }

    return {
      consentState,
      showCookieBanner: !["accepted", "rejected"].includes(consentState.state),
      ...actions,
    };
  }, [consentState, syncConsentState]);

  return (
    <CookieConsentContext.Provider value={contextValue}>
      {children}
    </CookieConsentContext.Provider>
  );
}

function useCookieConsent() {
  const context = useContext(CookieConsentContext);

  if (!context) {
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider",
    );
  }
  return context;
}

export { CookieConsentProvider, useCookieConsent };
