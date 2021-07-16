function nativeRaf() {
  if (typeof window !== "undefined") {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame;
  }
  return undefined;
}

function polyfillRaf() {
  return (callback, element, delay) => {
    setTimeout(callback, delay || 1000 / 60, new Date().getTime());
  };
}

export const requestAnimationFrame = nativeRaf() || polyfillRaf();
