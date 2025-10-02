"use client";

import { useClientLayoutEffect } from "../../../util";
import { useRefWithInit } from "../../../util/hooks/useRefWithInit";

export function useLatestRef<T>(value: T) {
  const latest = useRefWithInit(createLatestRef, value).current!;

  latest.next = value;

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
