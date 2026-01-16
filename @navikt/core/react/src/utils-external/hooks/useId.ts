"use client";

//https://github.com/mui/material-ui/blob/master/packages/mui-utils/src/useId.ts
import React, { useEffect, useState } from "react";

/* eslint-disable react-hooks/rules-of-hooks */

let globalId = 0;
function useGlobalId(idOverride?: string): string | undefined {
  // biome-ignore lint/correctness/useHookAtTopLevel: At runtime, `useGlobalId` is invariant.
  const [defaultId, setDefaultId] = useState(idOverride);
  const id = idOverride || defaultId;

  // biome-ignore lint/correctness/useHookAtTopLevel: At runtime, `useGlobalId` is invariant.
  useEffect(() => {
    if (defaultId == null) {
      // Fallback to this default id when possible.
      // Use the incrementing value for client-side rendering only.
      // We can't use it server-side.
      // If you want to use random values please consider the Birthday Problem: https://en.wikipedia.org/wiki/Birthday_problem
      globalId += 1;
      setDefaultId(`aksel-id-${globalId}`);
    }
  }, [defaultId]);
  return id;
}

const maybeReactUseId: undefined | (() => string) = (React as any)[
  "useId" + "" // Workaround for https://github.com/webpack/webpack/issues/14814
];
/**
 *
 * @example <div id={useId()} />
 * @param idOverride
 * @returns {string}
 */
function useId(idOverride?: string): string {
  if (maybeReactUseId !== undefined) {
    const reactId = maybeReactUseId();
    return idOverride ?? reactId.replace(/(:)/g, "");
  }
  // biome-ignore lint/correctness/useHookAtTopLevel: `useId` is invariant at runtime.
  return useGlobalId(idOverride) ?? "";
}

export { useId };
