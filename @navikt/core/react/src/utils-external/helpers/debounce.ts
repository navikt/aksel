"use client";

import { Timeout } from "../../utils/hooks";

// https://github.com/mui/material-ui/blob/master/packages/mui-utils/src/debounce.js
function debounce<T extends unknown[]>(
  func: (...args: T) => void,
  wait = 166,
  leading = false,
) {
  const timeout = new Timeout();
  function debounced(this: any, ...args: T) {
    const later = () => {
      func.apply(this, args);
    };
    if (!timeout.isStarted() && leading) {
      later();
    }
    timeout.start(wait, later);
  }

  debounced.clear = timeout.clear;

  return debounced;
}

export { debounce };
