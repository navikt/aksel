import { Locale } from "date-fns";
import { useProvider } from "../../provider/Provider";
import { get } from "./get";
import {
  Component,
  ComponentTranslation,
  PartialTranslations,
  TFunction,
} from "./i18n.types";

/* https://regex101.com/r/LYKWi3/1 */
const REPLACE_REGEX = /{[^}]*}/g;

export function useI18n<T extends Component>(
  componentName: T,
  ...localTranslations: (ComponentTranslation<T> | undefined)[]
) {
  const context = useProvider();
  const contextTranslations = context.translations || [];
  const i18nObjects: (PartialTranslations | undefined)[] = [
    ...localTranslations,
    ...(Array.isArray(contextTranslations)
      ? contextTranslations.map((t) => t[componentName])
      : [contextTranslations[componentName]]),
    context.locale[componentName],
  ];

  /* https://github.com/Shopify/polaris/blob/2115f9ba2f5bcbf2ad15745233501bff2db81ecf/polaris-react/src/utilities/i18n/I18n.ts#L24 */
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
  const context = useProvider();
  const contextTranslations = context.translations || [];
  const i18nObjects = Array.isArray(contextTranslations)
    ? contextTranslations.map((t) => t.global)
    : [contextTranslations.global];
  i18nObjects.push(context.locale.global);

  for (const obj of i18nObjects) {
    if (obj?.dateLocale) {
      return obj.dateLocale as Locale;
    }
  }
  throw new Error("dateLocale not found.");
}
