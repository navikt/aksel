import type { EventName, EventPropertiesMap } from "@navikt/analytics-types";

// Overload 1: taxonomy event — fully typed
function umamiTrack<T extends EventName>(
  event: T,
  properties: EventPropertiesMap[T],
): void;
// Overload 2: custom/non-taxonomy event — loose typing
function umamiTrack(event: string, properties?: Record<string, unknown>): void;

function umamiTrack(event: string, properties?: Record<string, unknown>): void {
  if (typeof window !== "undefined" && window.umami) {
    window.umami.track(event, properties);
  }
}

export { umamiTrack };
