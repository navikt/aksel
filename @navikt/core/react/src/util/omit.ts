export function omit<T extends object, K extends keyof T>(
  obj: T,
  props: K[],
): Omit<T, K> {
  return Object.entries(obj)
    .filter(([key]) => !props.includes(key as K))
    .reduce(
      (prevObj, [key, value]) => ({
        ...prevObj,
        [key]: value,
      }),
      {} as Omit<T, K>,
    );
}
