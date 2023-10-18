import { AmplitudeEvents } from "./events";
import { amplitude } from "./useAmplitude";

/**
 * Preset for logging navigation-events
 * @param src Component/Elements to keep track of
 * @param to Destination URL
 */
export const amplitudeLogNavigation = (src: string, to: string) =>
  amplitude.track(AmplitudeEvents.navigasjon, {
    src,
    to,
    from: window.location.pathname,
  });
