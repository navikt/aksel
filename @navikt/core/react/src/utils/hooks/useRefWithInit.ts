"use client";

import React, { useRef } from "react";

const UNINITIALIZED = {};

/**
 * useRef initialized with a function on mount.
 */
function useRefWithInit<T>(init: () => T): React.RefObject<T>;
function useRefWithInit<T, U>(
  init: (arg: U) => T,
  initArg: U,
): React.RefObject<T>;
function useRefWithInit(init: (arg?: unknown) => unknown, initArg?: unknown) {
  const ref = useRef(UNINITIALIZED as any);

  // eslint-disable-next-line react-hooks/refs
  if (ref.current === UNINITIALIZED) {
    // eslint-disable-next-line react-hooks/refs
    ref.current = init(initArg);
  }

  return ref;
}

export { useRefWithInit };
