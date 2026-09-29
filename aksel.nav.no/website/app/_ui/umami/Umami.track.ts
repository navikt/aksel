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

const UMAMI_READY_EVENT = "aksel:umami-ready";

/**
 * Tracks the event once the Umami script has loaded.
 * Use on mount, where the script may not have loaded yet (e.g. direct visits).
 * @returns Cleanup function that cancels a pending track.
 */
function umamiTrackWhenReady(
  event: string,
  properties?: Record<string, unknown>,
): () => void {
  if (window.umami) {
    umamiTrack(event, properties);
    return () => {};
  }

  const handler = () => umamiTrack(event, properties);
  window.addEventListener(UMAMI_READY_EVENT, handler, { once: true });
  return () => window.removeEventListener(UMAMI_READY_EVENT, handler);
}

export { UMAMI_READY_EVENT, umamiTrack, umamiTrackWhenReady };
