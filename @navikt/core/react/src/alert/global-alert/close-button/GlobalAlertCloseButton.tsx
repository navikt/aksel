import { BaseAlert } from "../../base-alert";

type GlobalAlertCloseButtonProps = BaseAlert.CloseButtonProps;

/**
 * @see 🏷️ {@link GlobalAlertCloseButtonProps}
 * @example
 * ```jsx
 *  <GlobalAlert>
 *    <GlobalAlert.Header>
 *      <GlobalAlert.Title>Info title</GlobalAlert.Title>
 *     <GlobalAlert.CloseButton onClick={() => alert("Closed!")} />
 *    </GlobalAlert.Header>
 *  </GlobalAlert>
 * ```
 */
const GlobalAlertCloseButton = BaseAlert.CloseButton;

export { GlobalAlertCloseButton };
export type { GlobalAlertCloseButtonProps };
