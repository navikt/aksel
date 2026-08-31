import type { PartialTranslations } from "./i18n.types";

// Based on https://github.com/Shopify/polaris/blob/main/polaris-react/src/utilities/get.ts

export function get(
  keypath: string,
  objs: (PartialTranslations | undefined)[],
) {
  const keys = keypath.split(".");

  for (const obj of objs) {
    if (!obj) {
      continue;
    }

    let acc: string | PartialTranslations = obj;

    for (let i = 0; i < keys.length; i++) {
      const val = acc[keys[i]];
      if (val === undefined) {
        continue;
      }
      acc = val;
    }

    if (typeof acc === "string") {
      return acc;
    }
  }

  throw new Error(
    `Error translating key. Keypath '${keypath}' does not resolve to a string.`,
  );
}
