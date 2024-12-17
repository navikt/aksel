"use client";

import _ from "lodash";

// 166 == 10 frames at 60fps
const wrappedDebounce: typeof _.debounce = (
  func: () => any,
  wait = 166,
  options?: { leading?: boolean; maxWait?: number; trailing?: boolean },
) => {
  return _.debounce(func, wait, options);
};

export default wrappedDebounce;
