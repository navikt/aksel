import { TranslationDictionary, TranslationObject } from "./i18n.types";

export function merge(...objs: TranslationDictionary[]) {
  let final: TranslationDictionary = {};

  for (const obj of objs) {
    final = mergeRecursively(final, obj);
  }

  return final;
}

function mergeRecursively<T>(
  objA: T,
  objB: TranslationDictionary | TranslationObject,
) {
  const objARes = { ...objA };

  for (const key in objB) {
    if (!(key in objB)) {
      continue;
    }

    const a = objARes[key];
    const b = objB[key];

    if (b && typeof b !== "string" && typeof a !== "string") {
      objARes[key] = mergeRecursively(a, b);
    } else {
      objARes[key] = b;
    }
  }

  return objARes;
}
