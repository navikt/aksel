"use client";

import { useLayoutEffect } from "react";

export const useClientLayoutEffect = globalThis?.document
  ? useLayoutEffect
  : () => {};
