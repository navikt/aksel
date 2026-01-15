"use client";

import { useEffect } from "react";
import { useRefWithInit } from "./useRefWithInit";

const EMPTY = 0;

class Timeout {
  static create() {
    return new Timeout();
  }

  currentId: number = EMPTY;

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
      clearTimeout(this.currentId);
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(timeout.disposeEffect, []);

  return timeout;
}

export { Timeout, useTimeout };
