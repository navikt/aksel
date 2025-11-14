import { BaseAlert } from "../../base-alert";

type GlobalAlertCloseProps = BaseAlert.CloseProps;

/**
 * @see 🏷️ {@link GlobalAlertCloseProps}
 * @example
 * ```jsx
 *  <GlobalAlert>
 *    <GlobalAlert.Header>
 *      <GlobalAlert.Title>Info title</GlobalAlert.Title>
 *     <GlobalAlert.Close onClick={() => alert("Closed!")} />
 *    </GlobalAlert.Header>
 *  </GlobalAlert>
 * ```
 */
const GlobalAlertClose = BaseAlert.Close;

export { GlobalAlertClose };
export type { GlobalAlertCloseProps };
