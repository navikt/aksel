import React, { forwardRef } from "react";
import { BaseAlert } from "../../base-alert";
import {
  LocalAlertClose,
  type LocalAlertCloseProps,
} from "../close/LocalAlertClose";
import {
  LocalAlertContent,
  type LocalAlertContentProps,
} from "../content/LocalAlertContent";
import {
  LocalAlertHeader,
  type LocalAlertHeaderProps,
} from "../header/LocalAlertHeader";
import {
  LocalAlertTitle,
  type LocalAlertTitleProps,
} from "../title/LocalAlertTitle";

interface LocalAlertProps
  extends Omit<
    BaseAlert.RootProps,
    "type" | "global" | "statusType" | "data-color"
  > {
  variant: Exclude<BaseAlert.RootProps["variant"], undefined>;
}

interface LocalAlertComponent
  extends React.ForwardRefExoticComponent<
    LocalAlertProps & React.RefAttributes<HTMLDivElement>
  > {
  /**
   * @see 🏷️ {@link LocalAlertHeaderProps}
   * @example
   * ```jsx
   *  <LocalAlert>
   *    <LocalAlert.Header>
   *      <LocalAlert.Title>Info tittel</LocalAlert.Title>
   *    </LocalAlert.Header>
   *  </LocalAlert>
   * ```
   */
  Header: typeof LocalAlertHeader;

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
  Title: typeof LocalAlertTitle;

  /**
   * @see 🏷️ {@link LocalAlertContentProps}
   * @example
   * ```jsx
   *  <LocalAlert>
   *    <LocalAlert.Header>
   *      <LocalAlert.Title>Info tittel</LocalAlert.Title>
   *    </LocalAlert.Header>
   *
   *    <LocalAlert.Content>Innhold</LocalAlert.Content>
   *  </LocalAlert>
   * ```
   */
  Content: typeof LocalAlertContent;

  /**
   * @see 🏷️ {@link LocalAlertCloseProps}
   * @example
   * ```jsx
   *  <LocalAlert>
   *    <LocalAlert.Header>
   *      <LocalAlert.Title>Info tittel</LocalAlert.Title>
   *     <LocalAlert.Close onClick={() => alert("Lukket!")} />
   *    </LocalAlert.Header>
   *  </LocalAlert>
   * ```
   */
  Close: typeof LocalAlertClose;
}

/**
 * A component for displaying important content in your application.
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/localalert)
 * @see 🏷️ {@link LocalAlertProps}
 * @example
 * ```jsx
 *  <LocalAlert variant="error">
 *    <LocalAlert.Header>
 *      <LocalAlert.Title>Alert tittel</LocalAlert.Title>
 *    </LocalAlert.Header>
 *    <LocalAlert.Content>Innhold</LocalAlert.Content>
 *  </LocalAlert>
 * ```
 */
const LocalAlert = forwardRef<HTMLDivElement, LocalAlertProps>(
  ({ variant, ...restProps }: LocalAlertProps, forwardedRef) => {
    return (
      <BaseAlert.Root
        ref={forwardedRef}
        role="alert"
        {...restProps}
        type="strong"
        global={false}
        statusType="alert"
        variant={variant}
      />
    );
  },
) as LocalAlertComponent;

LocalAlert.Header = LocalAlertHeader;
LocalAlert.Title = LocalAlertTitle;
LocalAlert.Content = LocalAlertContent;
LocalAlert.Close = LocalAlertClose;

export {
  LocalAlert,
  LocalAlertContent,
  LocalAlertHeader,
  LocalAlertTitle,
  LocalAlertClose,
};
export type {
  LocalAlertProps,
  LocalAlertContentProps,
  LocalAlertHeaderProps,
  LocalAlertTitleProps,
  LocalAlertCloseProps,
};
