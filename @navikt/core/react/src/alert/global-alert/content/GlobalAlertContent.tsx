import { BaseAlert } from "../../base-alert";

type GlobalAlertContentProps = BaseAlert.ContentProps;

/**
 * @see 🏷️ {@link GlobalAlertContentProps}
 * @example
 * ```jsx
 *  <GlobalAlert>
 *    <GlobalAlert.Header>
 *      <GlobalAlert.Title>Info tittel</GlobalAlert.Title>
 *    </GlobalAlert.Header>
 *
 *    <GlobalAlert.Content>Innhold</GlobalAlert.Content>
 *  </GlobalAlert>
 * ```
 */
const GlobalAlertContent = BaseAlert.Content;

export { GlobalAlertContent };
export type { GlobalAlertContentProps };
