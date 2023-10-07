import { useContext } from "react";
import nb from "../../locales/nb.json";
import { I18nContext } from "./context";

/* https://dev.to/pffigueiredo/typescript-utility-keyof-nested-object-2pa3 */
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export function useI18n() {
  const i18n = useContext(I18nContext);

  /**
   * https://github.com/Shopify/polaris/blob/2115f9ba2f5bcbf2ad15745233501bff2db81ecf/polaris-react/src/utilities/i18n/I18n.ts#L24
   */
  const translate = (
    id: NestedKeyOf<typeof nb>,
    localTranslation?: string | number
  ): string => {
    console.log({ i18n, id, localTranslation });
    return "";
  };

  return translate;
}
