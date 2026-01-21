function omit<T extends object, K extends keyof T>(
  obj: T,
  props: K[],
): Omit<T, K> {
  const filteredEntries = Object.entries(obj).filter(
    ([key]) => !props.includes(key as K),
  );

  return Object.fromEntries(filteredEntries) as Omit<T, K>;
}

export { omit };
