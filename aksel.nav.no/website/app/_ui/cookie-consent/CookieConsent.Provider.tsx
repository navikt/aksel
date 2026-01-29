"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getCookie, setCookie } from "typescript-cookie";
import {
  CONSENT_TRACKER_ID,
  CONSENT_TRACKER_STATE,
  CURRENT_VERSION,
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
    // eslint-disable-next-line
    // eslint-disable-next-line react-hooks/set-state-in-effect
    syncConsentState();
  }, [syncConsentState]);

  const contextValue = useMemo(() => {
    const actions = {
      acceptCookiesAction: async () => {
        await updateCookieConsent("accepted");
        syncConsentState();
      },
      rejectCookiesAction: async () => {
        await updateCookieConsent("rejected");
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

async function updateCookieConsent(newState: CONSENT_TRACKER_STATE) {
  if (!validateConsentState(newState)) {
    console.error(`Invalid state: ${newState}`);
    return;
  }

  let createdAt = new Date().toISOString();

  const oldCookieValue = getCookie(CONSENT_TRACKER_ID);
  if (oldCookieValue) {
    try {
      const oldCookieData = JSON.parse(oldCookieValue) as CookieData;
      createdAt = oldCookieData.createdAt;
    } catch {
      return console.error("Failed to parse old cookie data", oldCookieValue);
    }
  }

  const cookieData: CookieData = {
    createdAt,
    updatedAt: new Date().toISOString(),
    version: CURRENT_VERSION,
    consents: {},
  };

  cookieData.consents.tracking = newState;

  const cookieJson = JSON.stringify(cookieData);

  setCookie(CONSENT_TRACKER_ID, cookieJson, {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  });

  if (!["accepted", "rejected"].includes(newState)) {
    return;
  }

  await fetch("/api/cookie-consent/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ state: newState }),
  }).finally(() => {});
}

function validateConsentState(state: string): state is CONSENT_TRACKER_STATE {
  return ["accepted", "rejected", "undecided", "no_action"].includes(state);
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
