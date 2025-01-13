import type { Types } from "@amplitude/analytics-browser";
import { useEffect } from "react";

const batchedEvents: Parameters<Pick<Types.BrowserClient, "track">["track"]>[] =
  [];

export let amplitude: Pick<Types.BrowserClient, "init" | "track"> = {
  track: (/* ...eventsData */) => {
    /* Until re-enabled in _app.tsx, we can skip storing events */
    /* batchedEvents.push(eventsData); */
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
const useAmplitudeInit = () => {
  useEffect(() => {
    const isProdUrl = () => window.location.host === "aksel.nav.no";
    const isExample = () => window.location.pathname.includes("eksempler/");
    const isTemplate = () => window.location.pathname.includes("templates/");
    const isPreview = () => !!document.getElementById("exit-preview-id");

    const initAmplitude = async () => {
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
    initAmplitude();
  }, []);
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
