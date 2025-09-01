"use client";

import { type EffectCallback, useEffect } from "react";

/**
 * A React.useEffect equivalent that runs once, when the component is mounted.
 */
function useOnMount(fn: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fn, []);
}

export { useOnMount };
