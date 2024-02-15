import nb from "./locales/nb.json";

export interface TranslationDictionary {
  [key: string]: string | TranslationDictionary;
}

/* https://stackoverflow.com/questions/47914536/use-partial-in-nested-property-with-typescripts */
type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type ComponentTranslation = RecursivePartial<typeof nb>;
