"use client";

import { useEffect } from "react";

interface ListenerT {
  addEventListener(
    name: string,
    handler: (event?: any) => void,
    ...args: any[]
  );

  removeEventListener(
    name: string,
    handler: (event?: any) => void,
    ...args: any[]
  );
}

/* https://github.com/streamich/react-use/blob/master/src/useEvent.ts */
const useEventListener = <T extends ListenerT>(
  name: Parameters<ListenerT["addEventListener"]>[0],
  handler: Parameters<ListenerT["addEventListener"]>[1],
  target: null | T | Window = typeof window !== "undefined" ? window : null,
): void => {
  useEffect(() => {
    if (!target) {
      return;
    }
    target?.addEventListener(name, handler);
    return () => {
      target?.removeEventListener(name, handler);
    };
  }, [name, handler, target]);
};

export { useEventListener };
export type { ListenerT };
