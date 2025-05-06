type UmamiNavigationProps = {
  kilde: string;
  url: string;
};

type UmamiTrackDefaultProps = Record<string, string | undefined> | undefined;

function umamiTrack<T extends `navigere` | string>(
  event: T,
  data: T extends "navigere" ? UmamiNavigationProps : UmamiTrackDefaultProps,
): void {
  if (typeof window !== "undefined" && window.umami) {
    window.umami.track(event, data);
  }
}

export { umamiTrack };
