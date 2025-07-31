import type nb from "./locales/nb";

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
