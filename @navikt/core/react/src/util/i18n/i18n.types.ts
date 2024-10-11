import type nb from "./locales/nb";

/* https://stackoverflow.com/questions/47914536/use-partial-in-nested-property-with-typescripts */
type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type Translations = typeof nb;

export type PartialTranslations = RecursivePartial<Translations>;

export type Component = keyof Translations;

export type ComponentTranslation<T extends Component> = RecursivePartial<
  Translations[T]
>;
