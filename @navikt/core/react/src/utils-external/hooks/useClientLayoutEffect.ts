"use client";

import { useLayoutEffect } from "react";

const useClientLayoutEffect = globalThis?.document ? useLayoutEffect : () => {};

export { useClientLayoutEffect };
