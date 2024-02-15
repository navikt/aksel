import { createContext, useContext, useMemo } from "react";
import { get } from "./get";
import { ComponentTranslation, TranslationDictionary } from "./i18n.types";
import nb from "./locales/nb.json";
import { merge } from "./merge";

/**
 * https://regex101.com/r/LYKWi3/1
 */
const REPLACE_REGEX = /{[^}]*}/g;

export const I18nContext = createContext<
  TranslationDictionary | TranslationDictionary[]
>(nb);

/* https://dev.to/pffigueiredo/typescript-utility-keyof-nested-object-2pa3 */
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export function useI18n(local: ComponentTranslation) {
  const i18n = useContext(I18nContext);

  const translation = useMemo(
    () => (Array.isArray(i18n) ? merge(...i18n.slice().reverse()) : i18n),
    [i18n],
  );

  /**
   * https://github.com/Shopify/polaris/blob/2115f9ba2f5bcbf2ad15745233501bff2db81ecf/polaris-react/src/utilities/i18n/I18n.ts#L24
   */
  const translate = (
    id: NestedKeyOf<typeof nb>,
    options?: { replacements: string | number },
  ) => {
    const text = get(local, id) || get(translation, id);

    if (!text) {
      return "";
    }

    if (options?.replacements) {
      return text.replace(REPLACE_REGEX, (match) => {
        const replacement = match.substring(1, match.length - 1);

        if (options.replacements[replacement] === undefined) {
          const replacementData = JSON.stringify(options.replacements);

          throw new Error(
            `Error translating key '${id}'. No replacement syntax ({}) found for key '${replacement}'. The following replacements were passed: '${replacementData}'`,
          );
        }

        return options.replacements[replacement];
      });
    }

    return text;
  };

  return translate;
}
