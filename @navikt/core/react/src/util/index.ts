import { useEffect } from "react";

export * from "./OverridableComponent";
export * from "./useId";

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

export const useEventListener = <K extends keyof GlobalEventHandlersEventMap>(
  type: K,
  listener: (
    this: GlobalEventHandlers,
    ev: GlobalEventHandlersEventMap[K]
  ) => any
): void =>
  useEffect(() => {
    document.addEventListener(type, listener);
    return () => {
      document.removeEventListener(type, listener);
    };
  }, [type, listener]);
