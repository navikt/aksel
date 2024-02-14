import { TranslationDictionary } from "./i18n.types";

/**
 * https://github.com/Shopify/polaris/blob/main/polaris-react/src/utilities/get.ts#L3
 */
const OBJECT_NOTATION_MATCHER = /\[(.*?)\]|(\w+)/g;

export function get(
  obj: TranslationDictionary | undefined,
  keypath: string | string[],
) {
  if (obj == null) return undefined;

  const keys = Array.isArray(keypath) ? keypath : getKeypath(keypath);
  let acc: string | TranslationDictionary = obj;

  for (let i = 0; i < keys.length; i++) {
    const val = acc[keys[i]];
    if (val === undefined) {
      return "";
    }
    acc = val;
  }

  if (typeof acc !== "string") {
    throw new Error(
      "Error translating key. The keypath does not resolve to a string.",
    );
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
