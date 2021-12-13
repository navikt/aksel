export * from "./OverridableComponent";
export * from "./useId";
export * from "./useEventListener";

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

export const mergeCallbacks = (callback1, callback2) => (event) => {
  callback1 && callback1(event);
  callback2 && callback2(event);
};
