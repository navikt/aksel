"use client";

// oxlint-disable-next-line no-restricted-imports -- This is the SSR-safe wrapper around `useLayoutEffect`.
import { useLayoutEffect } from "react";

const useClientLayoutEffect = globalThis?.document ? useLayoutEffect : () => {};

export { useClientLayoutEffect };
