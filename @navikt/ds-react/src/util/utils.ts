export function addPropToObject(
  obj: object,
  [key, value]: [string | number, any]
): object {
  obj[key] = value;
  return obj;
}

export function omit(obj: object, props: string[]) {
  return Object.entries(obj)
    .filter(([key]) => !props.includes(key))
    .reduce(addPropToObject, {});
}
