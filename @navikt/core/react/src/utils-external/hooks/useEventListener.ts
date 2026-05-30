"use client";

import { useEffect } from "react";
import { useEventCallback } from "../../utils/hooks/useEventCallback";

interface ListenerT {
  addEventListener(
    name: string,
    handler: (event?: any) => void,
    ...args: any[]
  ): void;

  removeEventListener(
    name: string,
    handler: (event?: any) => void,
    ...args: any[]
  ): void;
}

/* https://github.com/streamich/react-use/blob/master/src/useEvent.ts */
const useEventListener = <T extends ListenerT>(
  name: Parameters<ListenerT["addEventListener"]>[0],
  handler: Parameters<ListenerT["addEventListener"]>[1],
  target: null | T | Window = typeof window !== "undefined" ? window : null,
): void => {
  /* Keep listener identity stable so inline handlers do not re-register every render. */
  const stableHandler = useEventCallback(handler);

  useEffect(() => {
    if (!target) {
      return;
    }
    target?.addEventListener(name, stableHandler);
    return () => {
      target?.removeEventListener(name, stableHandler);
    };
  }, [name, stableHandler, target]);
};

export { useEventListener };
export type { ListenerT };
