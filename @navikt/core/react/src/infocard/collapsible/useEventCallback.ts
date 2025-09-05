"use client";

import React from "react";
import { useRefWithInit } from "./useRefWithInit";

// https://github.com/mui/material-ui/issues/41190#issuecomment-2040873379
const useInsertionEffect = (React as any)[
  `useInsertionEffect${Math.random().toFixed(1)}`.slice(0, -3)
];

const useSafeInsertionEffect =
  // React 17 doesn't have useInsertionEffect.
  useInsertionEffect &&
  // Preact replaces useInsertionEffect with useLayoutEffect and fires too late.
  useInsertionEffect !== React.useLayoutEffect
    ? useInsertionEffect
    : (fn: any) => fn();

type Callback = (...args: any[]) => any;

type Stable<T extends Callback> = {
  /** The next value for callback */
  next: T | undefined;
  /** The function to be called by trampoline. This must fail during the initial render phase. */
  callback: T | undefined;
  trampoline: T;
  effect: () => void;
};

/**
 * Returns a stable function whose identity never changes,
 * but whose body always calls the latest callback,
 * updated at the earliest safe moment in the commit phase.
 *
 * **How**
 * - Stores the latest callback in a ref (stable.next) and exposes a stable trampoline function.
 * - Updates stable.callback from stable.next in useInsertionEffect (or a safe fallback),
 *   so the trampoline calls the newest logic before layout effects and before any sync events can fire after commit.
 * - In dev, the initial callback throws if invoked during render, catching “event called while rendering” bugs.
 *
 * **Why**
 * - Avoids stale closures in event handlers without changing function identity.
 * - Ensures no “stale window” between commit and effect where a sync event (autoFocus, programmatic click, layout-effect work) could call an outdated handler.
 * - Works across React 18/17 by picking the earliest effect that actually runs early enough.
 */
function useEventCallback<T extends Callback>(callback: T | undefined): T {
  const stable = useRefWithInit(createStableCallback).current;
  stable.next = callback;
  useSafeInsertionEffect(stable.effect);
  return stable.trampoline;
}

function createStableCallback() {
  const stable: Stable<any> = {
    next: undefined,
    callback: assertNotCalled,
    trampoline: (...args: []) => stable.callback?.(...args),
    effect: () => {
      stable.callback = stable.next;
    },
  };
  return stable;
}

function assertNotCalled() {
  if (process.env.NODE_ENV !== "production") {
    throw new Error("[Aksel]: Cannot call an event handler while rendering.");
  }
}

export { useEventCallback };
