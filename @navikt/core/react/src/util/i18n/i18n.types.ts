import type nb from "./locales/nb";

export interface GenericNestedTranslationObject {
  [key: string]: string | GenericNestedTranslationObject;
}

export interface GenericTranslationObject {
  [key: string]: GenericNestedTranslationObject;
}

/* https://stackoverflow.com/questions/47914536/use-partial-in-nested-property-with-typescripts */
type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type TranslationObject = typeof nb;

export type PartialTranslationObject = RecursivePartial<TranslationObject>;

export type Component = keyof TranslationObject;

export type ComponentTranslation<T extends Component> = RecursivePartial<
  TranslationObject[T]
>;
