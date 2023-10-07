/**
 * https://github.com/Shopify/polaris/blob/main/polaris-react/src/utilities/get.ts#L3
 */
const OBJECT_NOTATION_MATCHER = /\[(.*?)\]|(\w+)/g;

export function get<T>(
  obj: { [key: string]: any } | undefined,
  keypath: string | string[]
): T | any {
  if (obj == null) return undefined;

  const keys = Array.isArray(keypath) ? keypath : getKeypath(keypath);
  let acc = obj;

  for (let i = 0; i < keys.length; i++) {
    const val = acc[keys[i]];
    if (val === undefined) {
      return "";
    }
    acc = val;
  }

  return acc;
}

function getKeypath(str: string) {
  const path: string[] = [];
  let result: RegExpExecArray | null;
  while ((result = OBJECT_NOTATION_MATCHER.exec(str))) {
    const [, first, second] = result;
    path.push(first || second);
  }

  return path;
}
