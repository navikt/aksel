/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * TODO: Migrate to Umami
 * Preset for logging navigation-events
 * @param src Component/Elements to keep track of
 * @param to Destination URL
 */
export const amplitudeLogNavigation = (src: string, to: string | null) => {
  return;

  /* Until migrated to umami, we skip any logging here */
  /* amplitude.track?.(AmplitudeEvents.navigasjon, {
      src,
      to,
      from: window.location.pathname,
    }); */
};
