"use client";

import { useClientLayoutEffect } from "../../utils-external";
import { useRefWithInit } from "./useRefWithInit";

function useValueAsRef<T>(value: T) {
  const latest = useRefWithInit(createLatestRef, value).current;

  latest.next = value;

  // oxlint-disable-next-line react/exhaustive-deps
  useClientLayoutEffect(latest.effect);

  return latest;
}

function createLatestRef<T>(value: T) {
  const latest = {
    current: value,
    next: value,
    effect: () => {
      latest.current = latest.next;
    },
  };
  return latest;
}

export { useValueAsRef };
