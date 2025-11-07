import React, { forwardRef } from "react";
import { BaseAlert } from "../../base-alert";
import {
  GlobalAlertClose,
  type GlobalAlertCloseProps,
} from "../close/GlobalAlertClose";
import {
  GlobalAlertContent,
  type GlobalAlertContentProps,
} from "../content/GlobalAlertContent";
import {
  GlobalAlertHeader,
  type GlobalAlertHeaderProps,
} from "../header/GlobalAlertHeader";
import {
  GlobalAlertTitle,
  type GlobalAlertTitleProps,
} from "../title/GlobalAlertTitle";

interface GlobalAlertProps
  extends Omit<
    BaseAlert.RootProps,
    "type" | "global" | "statusType" | "data-color"
  > {
  status: Exclude<BaseAlert.RootProps["status"], undefined>;
}

interface GlobalAlertComponent
  extends React.ForwardRefExoticComponent<
    GlobalAlertProps & React.RefAttributes<HTMLDivElement>
  > {
  /**
   * @see 🏷️ {@link GlobalAlertHeaderProps}
   * @example
   * ```jsx
   *  <GlobalAlert>
   *    <GlobalAlert.Header>
   *      <GlobalAlert.Title>Info tittel</GlobalAlert.Title>
   *    </GlobalAlert.Header>
   *  </GlobalAlert>
   * ```
   */
  Header: typeof GlobalAlertHeader;

  /**
   * Title component for GlobalAlert. Remember to use correct heading-level with the `as` prop.
   * @see 🏷️ {@link GlobalAlertTitleProps}
   * @example
   * ```jsx
   *  <GlobalAlert>
   *    <GlobalAlert.Header>
   *      <GlobalAlert.Title as="h2">Info tittel</GlobalAlert.Title>
   *    </GlobalAlert.Header>
   *  </GlobalAlert>
   * ```
   */
  Title: typeof GlobalAlertTitle;

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
  Content: typeof GlobalAlertContent;

  /**
   * @see 🏷️ {@link GlobalAlertCloseProps}
   * @example
   * ```jsx
   *  <GlobalAlert>
   *    <GlobalAlert.Header>
   *      <GlobalAlert.Title>Info tittel</GlobalAlert.Title>
   *     <GlobalAlert.Close onClick={() => alert("Lukket!")} />
   *    </GlobalAlert.Header>
   *  </GlobalAlert>
   * ```
   */
  Close: typeof GlobalAlertClose;
}

/**
 * A component for displaying alerts about your app.
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/globalalert)
 * @see 🏷️ {@link GlobalAlertProps}
 * @example
 * ```jsx
 *  <GlobalAlert status="error">
 *    <GlobalAlert.Header>
 *      <GlobalAlert.Title>Alert tittel</GlobalAlert.Title>
 *    </GlobalAlert.Header>
 *    <GlobalAlert.Content>Innhold</GlobalAlert.Content>
 *  </GlobalAlert>
 * ```
 */
const GlobalAlert = forwardRef<HTMLDivElement, GlobalAlertProps>(
  (props: GlobalAlertProps, forwardedRef) => {
    return (
      <BaseAlert.Root
        ref={forwardedRef}
        role="alert"
        {...props}
        type="strong"
        global
        statusType="alert"
      />
    );
  },
) as GlobalAlertComponent;

GlobalAlert.Header = GlobalAlertHeader;
GlobalAlert.Title = GlobalAlertTitle;
GlobalAlert.Content = GlobalAlertContent;
GlobalAlert.Close = GlobalAlertClose;

export {
  GlobalAlert,
  GlobalAlertContent,
  GlobalAlertHeader,
  GlobalAlertTitle,
  GlobalAlertClose,
};
export type {
  GlobalAlertProps,
  GlobalAlertHeaderProps,
  GlobalAlertTitleProps,
  GlobalAlertContentProps,
  GlobalAlertCloseProps,
};
