"use client";

import React from "react";

const UNINITIALIZED = {};

/**
 * A React.useRef() that is initialized with a function. Note that it accepts an optional
 * initialization argument, so the initialization function doesn't need to be an inline closure.
 *
 * @usage
 *   const ref = useRefWithInit(sortColumns, columns)
 */
export function useRefWithInit<T>(init: () => T): React.RefObject<T> {
  const ref = React.useRef(UNINITIALIZED as any);

  if (ref.current === UNINITIALIZED) {
    ref.current = init();
  }

  return ref;
}
