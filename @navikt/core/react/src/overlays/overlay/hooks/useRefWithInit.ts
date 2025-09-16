"use client";

import React from "react";

const UNINITIALIZED = {};

/**
 * useRef initialized with a function on mount.
 */
export function useRefWithInit<T>(init: () => T): React.RefObject<T> {
  const ref = React.useRef(UNINITIALIZED as any);

  if (ref.current === UNINITIALIZED) {
    ref.current = init();
  }

  return ref;
}
