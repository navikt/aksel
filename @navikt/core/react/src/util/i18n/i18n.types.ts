import nb from "./locales/nb";

export interface TranslationObject {
  [key: string]: string | TranslationObject;
}

export interface TranslationDictionary {
  [key: string]: TranslationObject;
}

/* https://stackoverflow.com/questions/47914536/use-partial-in-nested-property-with-typescripts */
type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type Component = keyof typeof nb;

export type ComponentTranslation<T extends Component> = RecursivePartial<
  (typeof nb)[T]
>;
