import { BaseAlert } from "../../utils/components/base-alert";

type GlobalAlertContentProps = BaseAlert.ContentProps;

/**
 * @see 🏷️ {@link GlobalAlertContentProps}
 * @example
 * ```jsx
 *  <GlobalAlert>
 *    <GlobalAlert.Header>
 *      <GlobalAlert.Title>Info title</GlobalAlert.Title>
 *    </GlobalAlert.Header>
 *
 *    <GlobalAlert.Content>Content</GlobalAlert.Content>
 *  </GlobalAlert>
 * ```
 */
const GlobalAlertContent = BaseAlert.Content;

export { GlobalAlertContent };
export type { GlobalAlertContentProps };
