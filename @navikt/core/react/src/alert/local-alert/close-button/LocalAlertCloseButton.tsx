import { BaseAlert } from "../../base-alert";

type LocalAlertCloseButtonProps = BaseAlert.CloseButtonProps;

/**
 * @see 🏷️ {@link LocalAlertCloseButtonProps}
 * @example
 * ```jsx
 *  <LocalAlert>
 *    <LocalAlert.Header>
 *      <LocalAlert.Title>Info title</LocalAlert.Title>
 *     <LocalAlert.CloseButton onClick={() => alert("Closed!")} />
 *    </LocalAlert.Header>
 *  </LocalAlert>
 * ```
 */
const LocalAlertCloseButton = BaseAlert.CloseButton;

export { LocalAlertCloseButton };
export type { LocalAlertCloseButtonProps };
