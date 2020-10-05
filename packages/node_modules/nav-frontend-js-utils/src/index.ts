export function autobind(ctx) {
  Object.getOwnPropertyNames(ctx.constructor.prototype)
    .filter((prop) => typeof ctx[prop] === "function")
    .forEach((method) => {
      ctx[method] = ctx[method].bind(ctx);
    });
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString()
    .substring(1);
}

export function guid() {
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

export function fn(value): () => any {
  return typeof value === "function" ? value : () => value;
}

export function addPropToObject(
  obj: object,
  [key, value]: [string | number, any]
): object {
  obj[key] = value;
  return obj;
}

export function omit(obj: object, ...props) {
  return Object.entries(obj)
    .filter(([key]) => !props.includes(key))
    .reduce(addPropToObject, {});
}

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

export function clamp(
  lower: number,
  upper: number,
  numberish: string | number
) {
  const num = parseFloat(numberish.toString());
  if (num < lower) return lower;
  if (num > upper) return upper;
  return num;
}

export function getViewportDimensions() {
  return {
    w: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    h: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
  };
}

export function getScrollParents(element: HTMLElement) {
  let parent: HTMLElement;
  const arr: (HTMLElement | Window)[] = [];
  const overflowRegex = /(auto|scroll)/;

  for (
    parent = element;
    parent !== document.body;
    parent = parent.parentElement!
  ) {
    const style = getComputedStyle(parent);
    if (
      overflowRegex.test(style.overflow! + style.overflowY! + style.overflowX!)
    ) {
      arr.push(parent);
    }
  }

  arr.push(window);

  return arr;
}

export const keyCodes = {
  tab: 9,
  enter: 13,
  space: 32,
  pageup: 33,
  pagedown: 34,
  end: 35,
  home: 36,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  esc: 27,
};

export { EventThrottler } from "./eventThrottler";
