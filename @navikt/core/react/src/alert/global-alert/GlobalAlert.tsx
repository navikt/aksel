import React, { forwardRef } from "react";
import { BaseAlert } from "../base-alert";

interface GlobalAlertProps
  extends Omit<
    BaseAlert.RootProps,
    "type" | "global" | "statusType" | "data-color"
  > {
  variant: BaseAlert.RootProps["variant"];
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
   *    <GlobalAlert.Header icon={<InformationSquareIcon />}>
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
 * A component for displaying important content in your application.
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/globalAlert)
 * @see 🏷️ {@link GlobalAlertProps}
 * @example
 * ```jsx
 *  <GlobalAlert variant="error">
 *    <GlobalAlert.Header>
 *      <GlobalAlert.Title>Alert tittel</GlobalAlert.Title>
 *    </GlobalAlert.Header>
 *    <GlobalAlert.Content>Innhold</GlobalAlert.Content>
 *  </GlobalAlert>
 * ```
 */
const GlobalAlert = forwardRef<HTMLDivElement, GlobalAlertProps>(
  ({ variant, ...restProps }: GlobalAlertProps, forwardedRef) => {
    return (
      <BaseAlert.Root
        ref={forwardedRef}
        role={variant === "announcement" ? "status" : "alert"}
        {...restProps}
        type="strong"
        global
        statusType={variant === "announcement" ? "message" : "alert"}
        variant={variant}
      />
    );
  },
) as GlobalAlertComponent;

/* ----------------------------- GlobalAlertHeader ----------------------------- */
type GlobalAlertHeaderProps = Omit<BaseAlert.HeaderProps, "icon">;

/**
 * @see 🏷️ {@link GlobalAlertHeaderProps}
 * @example
 * ```jsx
 *  <GlobalAlert>
 *    <GlobalAlert.Header icon={<InformationSquareIcon />}>
 *      <GlobalAlert.Title>Info tittel</GlobalAlert.Title>
 *    </GlobalAlert.Header>
 *  </GlobalAlert>
 * ```
 */
const GlobalAlertHeader = forwardRef<HTMLDivElement, GlobalAlertHeaderProps>(
  (props, forwardedRef) => {
    return <BaseAlert.Header ref={forwardedRef} {...props} />;
  },
);

/* ----------------------------- GlobalAlertTitle ----------------------------- */
type GlobalAlertTitleProps = BaseAlert.TitleProps;

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
const GlobalAlertTitle = BaseAlert.Title;

/* ----------------------------- GlobalAlertContent ---------------------------- */
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

/* ----------------------------- GlobalAlertClose ---------------------------- */
type GlobalAlertCloseProps = BaseAlert.CloseProps;

/**
 * @see 🏷️ {@link GlobalAlertCloseProps}
 * @example
 * ```jsx
 *  <GlobalAlert>
 *    <GlobalAlert.Header>
 *      <GlobalAlert.Title>Info tittel</GlobalAlert.Title>
 *     <GlobalAlert.Close onClick={() => alert("Lukket!")} />
 *    </GlobalAlert.Header>
 *
 *  </GlobalAlert>
 * ```
 */
const GlobalAlertClose = BaseAlert.Close;

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
  GlobalAlertContentProps,
  GlobalAlertHeaderProps,
  GlobalAlertProps,
  GlobalAlertTitleProps,
  GlobalAlertCloseProps,
};
