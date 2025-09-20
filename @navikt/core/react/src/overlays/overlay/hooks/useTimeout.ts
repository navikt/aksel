"use client";

import { useOnMount } from "./useOnMount";
import { useRefWithInit } from "./useRefWithInit";

type TimeoutId = number;

const EMPTY = 0 as TimeoutId;

class Timeout {
  static create() {
    return new Timeout();
  }

  currentId: TimeoutId = EMPTY;

  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(delay: number, fn: () => void) {
    this.clear();
    this.currentId = setTimeout(() => {
      this.currentId = EMPTY;
      fn();
    }, delay) as unknown as number; /* Node.js types are enabled in development */
  }

  isStarted() {
    return this.currentId !== EMPTY;
  }

  clear = () => {
    if (this.currentId !== EMPTY) {
      clearTimeout(this.currentId as TimeoutId);
      this.currentId = EMPTY;
    }
  };

  disposeEffect = () => {
    return this.clear;
  };
}

/**
 * A `setTimeout` with automatic cleanup and guard.
 */
function useTimeout() {
  const timeout = useRefWithInit(Timeout.create).current!;

  useOnMount(timeout.disposeEffect);

  return timeout;
}

export { Timeout, useTimeout };
