import { TranslationDictionary } from "./i18n.types";

export function merge(...objs: TranslationDictionary[]) {
  let final: TranslationDictionary = {};

  for (const obj of objs) {
    final = mergeRecursively(final, obj);
  }

  return final;
}

function mergeRecursively(
  objA: TranslationDictionary,
  objB: TranslationDictionary,
) {
  const objARes = { ...objA };

  for (const key in objB) {
    if (!(key in objB)) {
      continue;
    }

    const a = objARes[key];
    const b = objB[key];

    if (typeof b !== "string" && typeof a !== "string") {
      objARes[key] = mergeRecursively(a, b);
    } else {
      objARes[key] = b;
    }
  }

  return objARes;
}
