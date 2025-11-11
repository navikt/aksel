"use client";

import React, { useRef, useState } from "react";

/**
 * useRef initialized with a function on mount.
 */
function useRefWithInit<T>(init: () => T): React.RefObject<T>;
function useRefWithInit<T, U>(
  init: (arg: U) => T,
  initArg: U,
): React.RefObject<T>;
function useRefWithInit(init: (arg?: unknown) => unknown, initArg?: unknown) {
  const [initialValue] = useState(() => init(initArg));
  const ref = useRef(initialValue);

  return ref;
}

export { useRefWithInit };
