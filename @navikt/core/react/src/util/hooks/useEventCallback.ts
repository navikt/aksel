"use client";

/**
 * Stable event callback: returns a function whose identity never changes but always
 * invokes the latest `callback`. Avoids stale closures without re‑creating handlers.
 *
 * Why not `useCallback`? Its identity depends on a deps array:
 * - omit deps -> stale; include deps -> new function each render.
 * - This hook decouples identity from freshness.
 *
 * How it works: a single stable "trampoline" function delegates to a mutable ref. The current
 * `callback` is promoted from `next` in an insertion/layout phase effect so abandoned concurrent
 * renders cannot leak outdated handlers.
 *
 * Guarantees: stable identity; latest logic executed; no calls from uncommitted renders; dev
 * error if invoked during render; safe when `callback` is undefined (no-op).
 */
import React, { useLayoutEffect } from "react";
import { useRefWithInit } from "./useRefWithInit";

/* https://github.com/mui/material-ui/issues/41190#issuecomment-2040873379 */
const useInsertionEffect = (React as any)[
  `useInsertionEffect${Math.random().toFixed(1)}`.slice(0, -3)
];

const useSafeInsertionEffect =
  // React 17 doesn't have useInsertionEffect.
  useInsertionEffect &&
  // Preact replaces useInsertionEffect with useLayoutEffect and fires too late.
  useInsertionEffect !== useLayoutEffect
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
  update: (value: Callback | undefined) => void;
};

/**
 * TODO: Long term, replace `useCallbackRef` with this hook.
 */
export function useEventCallback<T extends Callback>(
  callback: T | undefined,
): T {
  const stable = useRefWithInit(createStableCallback).current as Stable<T>;
  stable.update(callback);
  useSafeInsertionEffect(stable.effect);
  return stable.trampoline;
}

function createStableCallback() {
  const stable: Stable<Callback> = {
    next: undefined,
    callback: assertNotCalled,
    trampoline: (...args: any[]) => stable.callback?.(...args),
    effect: () => {
      stable.callback = stable.next;
    },
    update: (value) => {
      stable.next = value;
    },
  };
  return stable;
}

function assertNotCalled() {
  if (process.env.NODE_ENV !== "production") {
    throw new Error("Aksel: Cannot call an event handler while rendering.");
  }
}
