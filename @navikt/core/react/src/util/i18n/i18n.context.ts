import { Locale } from "date-fns";
import { useContext } from "react";
import { LanguageProviderContext } from "../../provider/i18n/LanguageProvider";
import { get } from "./get";
import {
  Component,
  ComponentTranslation,
  PartialTranslations,
  Translations,
} from "./i18n.types";

/**
 * https://regex101.com/r/LYKWi3/1
 */
const REPLACE_REGEX = /{[^}]*}/g;

/* https://dev.to/pffigueiredo/typescript-utility-keyof-nested-object-2pa3 */
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type TFunction<T extends Component> = (
  keypath: NestedKeyOf<Translations[T]>,
  replacements?: Record<string, string | number>,
) => string;

export function useI18n<T extends Component>(
  componentName: T,
  ...local: (ComponentTranslation<T> | undefined)[]
) {
  const languageProviderContext = useContext(LanguageProviderContext);
  const i18n = languageProviderContext.translations;
  const i18nObjects: (PartialTranslations | undefined)[] = [
    ...local,
    ...(Array.isArray(i18n)
      ? i18n.map((t) => t[componentName])
      : [i18n[componentName]]),
  ];

  /**
   * https://github.com/Shopify/polaris/blob/2115f9ba2f5bcbf2ad15745233501bff2db81ecf/polaris-react/src/utilities/i18n/I18n.ts#L24
   */
  const translate: TFunction<T> = (keypath, replacements) => {
    const text = get(keypath, i18nObjects);

    if (replacements) {
      return text.replace(REPLACE_REGEX, (match) => {
        const replacement = match.substring(1, match.length - 1);

        if (replacements[replacement] === undefined) {
          const replacementData = JSON.stringify(replacements);
          throw new Error(
            `Error translating key '${keypath}'. No replacement syntax ({}) found for key '${replacement}'. The following replacements were passed: '${replacementData}'`,
          );
        }

        return replacements[replacement] as string; // can also be a number, but JS doesn't mind...
      });
    }

    return text;
  };

  return translate;
}

export function useDateLocale() {
  const languageProviderContext = useContext(LanguageProviderContext);
  const i18n = languageProviderContext.translations;
  const i18nObjects = Array.isArray(i18n)
    ? i18n.map((t) => t.global)
    : [i18n.global];

  for (const obj of i18nObjects) {
    if (obj?.dateLocale) {
      return obj.dateLocale as Locale;
    }
  }
  throw new Error("dateLocale not found.");
}
