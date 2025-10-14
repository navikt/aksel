import { BaseAlert } from "../../base-alert";

type LocalAlertCloseProps = BaseAlert.CloseProps;

/**
 * @see 🏷️ {@link LocalAlertCloseProps}
 * @example
 * ```jsx
 *  <LocalAlert>
 *    <LocalAlert.Header>
 *      <LocalAlert.Title>Info tittel</LocalAlert.Title>
 *     <LocalAlert.Close onClick={() => alert("Lukket!")} />
 *    </LocalAlert.Header>
 *
 *  </LocalAlert>
 * ```
 */
const LocalAlertClose = BaseAlert.Close;

export { LocalAlertClose };
export type { LocalAlertCloseProps };
