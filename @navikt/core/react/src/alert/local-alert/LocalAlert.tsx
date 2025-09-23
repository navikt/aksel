import React, { forwardRef } from "react";
import { BaseAlert } from "../base-alert";

interface LocalAlertProps
  extends Omit<
    BaseAlert.RootProps,
    "type" | "global" | "statusType" | "data-color"
  > {
  variant: BaseAlert.RootProps["variant"];
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
   *
   *  </LocalAlert>
   * ```
   */
  Close: typeof LocalAlertClose;
}

/**a
 * A component for displaying important content in your application.
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/localAlert)
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
        role={variant === "announcement" ? "status" : "alert"}
        {...restProps}
        type="strong"
        global={false}
        statusType={variant === "announcement" ? "message" : "alert"}
        variant={variant}
      />
    );
  },
) as LocalAlertComponent;

/* ----------------------------- LocalAlertHeader ----------------------------- */
type LocalAlertHeaderProps = Omit<BaseAlert.HeaderProps, "icon">;

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
const LocalAlertHeader = forwardRef<HTMLDivElement, LocalAlertHeaderProps>(
  (props, forwardedRef) => {
    return <BaseAlert.Header ref={forwardedRef} {...props} />;
  },
);

/* ----------------------------- LocalAlertTitle ----------------------------- */
type LocalAlertTitleProps = BaseAlert.TitleProps;

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
const LocalAlertTitle = BaseAlert.Title;

/* ----------------------------- LocalAlertContent ---------------------------- */
type LocalAlertContentProps = BaseAlert.ContentProps;

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
const LocalAlertContent = BaseAlert.Content;

/* ----------------------------- LocalAlertClose ---------------------------- */
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
  LocalAlertContentProps,
  LocalAlertHeaderProps,
  LocalAlertProps,
  LocalAlertTitleProps,
  LocalAlertCloseProps,
};
