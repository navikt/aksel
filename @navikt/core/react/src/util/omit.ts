export const omit = (obj: object, props: string[]) =>
  Object.entries(obj)
    .filter(([key]) => !props.includes(key))
    .reduce(
      (prevObj, [key, value]) => ({
        ...prevObj,
        [key]: value,
      }),
      {}
    );
