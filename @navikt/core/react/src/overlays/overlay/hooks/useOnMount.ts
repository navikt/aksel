"use client";

import React from "react";

const EMPTY_DEPENDENCY = [] as unknown[];

/**
 * A React.useEffect that runs once when the component is mounted.
 */
export function useOnMount(fn: React.EffectCallback) {
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(fn, EMPTY_DEPENDENCY);
}
