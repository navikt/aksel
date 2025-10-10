interface NavigatorUAData {
  brands: { brand: string; version: string }[];
  mobile: boolean;
  platform: string;
}

function getNavigatorData(): { platform: string; maxTouchPoints: number } {
  if (!hasNavigator) {
    return { platform: "", maxTouchPoints: -1 };
  }

  const uaData = (navigator as any).userAgentData as
    | NavigatorUAData
    | undefined;

  if (uaData?.platform) {
    return {
      platform: uaData.platform,
      maxTouchPoints: navigator.maxTouchPoints,
    };
  }

  return {
    platform: navigator.platform ?? "",
    maxTouchPoints: navigator.maxTouchPoints ?? -1,
  };
}

const nav = getNavigatorData();

const hasNavigator = typeof navigator !== "undefined";

const isSafari = hasNavigator && /apple/i.test(navigator.vendor);

const isWebKit =
  typeof CSS === "undefined" || !CSS.supports
    ? false
    : CSS.supports("-webkit-backdrop-filter:none");

const isIOS =
  /* iPads can claim to be MacIntel */
  nav.platform === "MacIntel" && nav.maxTouchPoints > 1
    ? true
    : /iP(hone|ad|od)|iOS/.test(nav.platform);

export { isSafari, isWebKit, isIOS };
