"use client";

import { useLayoutEffect } from "react";

const noop = () => {};

export const useClientLayoutEffect = globalThis?.document
  ? useLayoutEffect
  : noop;
