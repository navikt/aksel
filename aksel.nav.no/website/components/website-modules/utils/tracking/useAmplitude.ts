import type { Types } from "@amplitude/analytics-browser";
import { useEffect } from "react";

export let amplitude: Partial<Pick<Types.BrowserClient, "init" | "track">>;

const AMPLITUDE_PUBLIC_API_KEY = "1a9a84a5e557ac9635a250bc27d75030";

/**
 * https://www.docs.developers.amplitude.com/data/sdks/browser-2/#tracking-default-events
 * https://javascript.plainenglish.io/how-to-implement-amplitude-in-next-js-a-3-step-guide-6803c44ca862
 */
const useAmplitudeInit = () => {
  useEffect(() => {
    const isProdUrl = () => window.location.host === "aksel.nav.no";

    const isExamples = () => window.location.pathname.includes("eksempler/");
    const isPreview = () => !!document.getElementById("exit-preview-id");

    const initAmplitude = async () => {
      if (!isProdUrl) {
        mockAmplitude();
        return;
      }

      amplitude = await import("@amplitude/analytics-browser");
      amplitude.init(AMPLITUDE_PUBLIC_API_KEY, undefined, {
        useBatch: true,
        serverUrl: "https://amplitude.nav.no/collect",
        defaultTracking: {
          pageViews: {
            trackHistoryChanges: "pathOnly",
            trackOn: () => {
              return !isExamples() && !isPreview();
            },
          },
        },
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
      eventOptions?: Types.EventOptions
    ) => {
      console.log({ eventInput, eventProperties, eventOptions });
      return {
        promise: new Promise<Types.Result>((resolve) =>
          resolve({
            event: { event_type: "MockEvent" },
            code: 200,
            message: "Success: mocked amplitude-tracking",
          })
        ),
      };
    },
  };
}

export default useAmplitudeInit;
