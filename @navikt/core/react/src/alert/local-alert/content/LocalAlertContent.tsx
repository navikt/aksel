import { BaseAlert } from "../../base-alert";

type LocalAlertContentProps = BaseAlert.ContentProps;

/**
 * @see 🏷️ {@link LocalAlertContentProps}
 * @example
 * ```jsx
 *  <LocalAlert>
 *    <LocalAlert.Header>
 *      <LocalAlert.Title>Info title</LocalAlert.Title>
 *    </LocalAlert.Header>
 *
 *    <LocalAlert.Content>Content</LocalAlert.Content>
 *  </LocalAlert>
 * ```
 */
const LocalAlertContent = BaseAlert.Content;

export { LocalAlertContent };
export type { LocalAlertContentProps };
