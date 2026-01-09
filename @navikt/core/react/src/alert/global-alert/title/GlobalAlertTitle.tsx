import { BaseAlert } from "../../base-alert";

type GlobalAlertTitleProps = BaseAlert.TitleProps;

/**
 * Title component for GlobalAlert. Remember to use correct heading-level with the `as` prop.
 * @see 🏷️ {@link GlobalAlertTitleProps}
 * @example
 * ```jsx
 *  <GlobalAlert>
 *    <GlobalAlert.Header>
 *      <GlobalAlert.Title as="h2">Info title</GlobalAlert.Title>
 *    </GlobalAlert.Header>
 *  </GlobalAlert>
 * ```
 */

const GlobalAlertTitle = BaseAlert.Title;

export { GlobalAlertTitle };

export type { GlobalAlertTitleProps };
