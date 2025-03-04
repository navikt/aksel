import type { Types } from "@amplitude/analytics-browser";

export const amplitude: Pick<Types.BrowserClient, "init" | "track"> = {
  track: () => {
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
