"use client";

import { type MutableRefObject, useRef } from "react";

const UNINITIALIZED = {};

/**
 * A useRef() that is initialized with a function. Note that it accepts an optional
 * initialization argument, so the initialization function doesn't need to be an inline closure.
 *
 * @example
 * ```tsx
 * const ref = useRefWithInit(sortColumns, columns);
 * ```
 */
function useRefWithInit<T>(init: () => T): MutableRefObject<T>;
function useRefWithInit<T, U>(
  init: (arg: U) => T,
  initArg: U,
): MutableRefObject<T>;
function useRefWithInit(init: (arg?: unknown) => unknown, initArg?: unknown) {
  const ref = useRef(UNINITIALIZED as any);

  if (ref.current === UNINITIALIZED) {
    ref.current = init(initArg);
  }

  return ref;
}

export { useRefWithInit };
