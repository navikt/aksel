import { BaseAlert } from "../../base-alert";

type LocalAlertTitleProps = BaseAlert.TitleProps;

/**
 * Title component for LocalAlert. Remember to use correct heading-level with the `as` prop.
 * @see 🏷️ {@link LocalAlertTitleProps}
 * @example
 * ```jsx
 *  <LocalAlert>
 *    <LocalAlert.Header>
 *      <LocalAlert.Title as="h2">Info tittel</LocalAlert.Title>
 *    </LocalAlert.Header>
 *  </LocalAlert>
 * ```
 */
const LocalAlertTitle = BaseAlert.Title;

export { LocalAlertTitle };
export type { LocalAlertTitleProps };
