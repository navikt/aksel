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
  target: null | T | Window = window
): void => {
  useEffect(() => {
    if (!target) {
      return;
    }
    target?.addEventListener(name, handler);
    return () => {
      target?.addEventListener(name, handler);
    };
  }, [name, handler, target]);
};
