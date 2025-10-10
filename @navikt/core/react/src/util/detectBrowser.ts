const hasNavigator = typeof navigator !== "undefined";

const isSafari = hasNavigator && /apple/i.test(navigator.vendor);

export { isSafari };
