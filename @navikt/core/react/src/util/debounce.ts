"use client";

import { Timeout } from "./hooks/useTimeout";

// https://github.com/mui/material-ui/blob/master/packages/mui-utils/src/debounce.js
export default function debounce<T extends unknown[]>(
  func: (...args: T) => void,
  wait = 166,
  leading = false,
) {
  const timeout = new Timeout();
  function debounced(this: any, ...args: T) {
    const later = () => {
      // Clear first to mark idle before invoking callback
      timeout.clear();
      func.apply(this, args);
    };
    if (!timeout.isStarted() && leading) {
      later();
    }
    timeout.start(wait, later);
  }

  debounced.clear = () => {
    timeout.clear();
  };

  return debounced;
}
