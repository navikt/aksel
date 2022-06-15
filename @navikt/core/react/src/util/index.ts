import { useEffect, useLayoutEffect } from "react";

export * from "./OverridableComponent";
export * from "./useId";
export { default as mergeRefs } from "./mergeRefs";
export { default as debounce } from "./debounce";

const canUseDOM = (): boolean => {
  return (
    typeof window !== "undefined" &&
    typeof window.document !== "undefined" &&
    typeof window.document.createElement !== "undefined"
  );
};

export const useClientLayoutEffect = canUseDOM() ? useLayoutEffect : () => {};

export const omit = (obj: object, props: string[]) =>
  Object.entries(obj)
    .filter(([key]) => !props.includes(key))
    .reduce(
      (obj, [key, value]) => ({
        ...obj,
        [key]: value,
      }),
      {}
    );

export interface ListenerT {
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
export const useEventListener = <T extends ListenerT>(
  name: Parameters<ListenerT["addEventListener"]>[0],
  handler: Parameters<ListenerT["addEventListener"]>[1],
  target: null | T | Window = typeof window !== "undefined" ? window : null
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

/* https://github.com/radix-ui/primitives/blob/main/packages/core/primitive/src/primitive.tsx */
export const composeEventHandlers = <E>(
  originalEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void
) => {
  return function handleEvent(event: E) {
    originalEventHandler?.(event);

    if (!(event as unknown as Event).defaultPrevented) {
      return ourEventHandler?.(event);
    }
  };
};
