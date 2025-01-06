import type { Types } from "@amplitude/analytics-browser";
import { useEffect, useState } from "react";

const batchedEvents: Parameters<Pick<Types.BrowserClient, "track">["track"]>[] =
  [];

export let amplitude: Pick<Types.BrowserClient, "init" | "track"> = {
  track: (...eventsData) => {
    batchedEvents.push(eventsData);
    return {
      promise: new Promise<Types.Result>((resolve) =>
        resolve({
          event: { event_type: "MockEvent" },
          code: 200,
          message: "Success: pre-batched amplitude-tracking",
        }),
      ),
    };
  },
  init: () => ({ promise: new Promise<void>((resolve) => resolve()) }),
};

const AMPLITUDE_PUBLIC_API_KEY = "1a9a84a5e557ac9635a250bc27d75030";

/**
 * https://www.docs.developers.amplitude.com/data/sdks/browser-2/#tracking-default-events
 * https://javascript.plainenglish.io/how-to-implement-amplitude-in-next-js-a-3-step-guide-6803c44ca862
 */
const isProdUrl = () => window.location.host === "aksel.nav.no";
const isExample = () => window.location.pathname.includes("eksempler/");
const isTemplate = () => window.location.pathname.includes("templates/");
const isPreview = () => !!document.getElementById("exit-preview-id");

const initAmplitude = async () => {
  //console.log("initAmplitude");
  if (isExample() || isTemplate()) {
    return;
  }

  if (!isProdUrl()) {
    mockAmplitude();
    return;
  }

  amplitude = await import("@amplitude/analytics-browser");
  amplitude
    .init(AMPLITUDE_PUBLIC_API_KEY, undefined, {
      useBatch: true,
      serverUrl: "https://amplitude.nav.no/collect",
      defaultTracking: {
        pageViews: {
          trackHistoryChanges: "pathOnly",
          trackOn: () => {
            return !isPreview();
          },
        },
      },
    })
    .promise.then(() =>
      batchedEvents
        .splice(0, batchedEvents.length)
        .forEach(([event, eventData]) => amplitude.track(event, eventData)),
    )
    .catch(async () => {
      const { logger } = await import("@navikt/next-logger");
      logger.error("Failed logging batched events");
    });
};

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, days = 365): void {
  const timeUntilExpiry = days * 24 * 60 * 60 * 1000;
  const expiry = new Date();
  expiry.setTime(expiry.getTime() + timeUntilExpiry);
  value = encodeURIComponent(value);
  document.cookie = `${name}=${value}; expires=${expiry.toUTCString()}; path=/`;
}

const useAmplitudeInit = () => {
  const [consent, setConsent] = useState<string | null>(() =>
    getCookie("cookieConsent"),
  );

  useEffect(() => {
    if (consent === "true") initAmplitude();
  }, [consent]);

  return {
    promptForConsent: consent === null,
    allowCookies: () => {
      setCookie("cookieConsent", "true");
      setConsent("true");
    },
    rejectCookies: () => {
      setCookie("cookieConsent", "false");
      setConsent("false");
    },
  };
};

/**
 * Allows logging events to console in dev
 */
function mockAmplitude() {
  amplitude = {
    track: (
      eventInput: Types.BaseEvent | string,
      eventProperties?: Record<string, any>,
    ) => {
      console.group("Mocked amplitude-event");
      console.table({ eventInput, ...eventProperties });
      console.groupEnd();
      return {
        promise: new Promise<Types.Result>((resolve) =>
          resolve({
            event: { event_type: "MockEvent" },
            code: 200,
            message: "Success: mocked amplitude-tracking",
          }),
        ),
      };
    },
    init: () => ({ promise: new Promise<void>((resolve) => resolve()) }),
  };
}

export default useAmplitudeInit;
