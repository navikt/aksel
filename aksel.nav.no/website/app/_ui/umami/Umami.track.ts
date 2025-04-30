function umamiTrack(
  event: string,
  data: Record<string, string | undefined> = {},
): void {
  if (typeof window !== "undefined" && window.umami) {
    window.umami.track(event, data);
  }
}

export { umamiTrack };
