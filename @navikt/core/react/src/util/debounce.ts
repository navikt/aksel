"use client";
// https://github.com/mui/material-ui/blob/master/packages/mui-utils/src/debounce.js
export default function debounce<T extends unknown[]>(
  func: (...args: T) => void,
  wait = 166,
  leading = false,
) {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  function debounced(this: any, ...args: T) {
    const later = () => {
      timeout = undefined;
      func.apply(this, args);
    };
    if (!timeout && leading) {
      later();
    }
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }

  debounced.clear = () => {
    clearTimeout(timeout);
  };

  return debounced;
}
