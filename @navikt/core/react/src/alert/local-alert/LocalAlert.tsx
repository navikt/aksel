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
  Header: typeof LocalAlertHeader;
  Title: typeof LocalAlertTitle;
  Content: typeof LocalAlertContent;
  CloseButton: typeof LocalAlertCloseButton;
}

/**a
 * A component for displaying important content in your application.
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/localAlert)
 * @see 🏷️ {@link LocalAlertProps}
 * @example
 * ```jsx
 *  <LocalAlert data-color="info">
 *    <LocalAlert.Header icon={<InformationSquareIcon />}>
 *      <LocalAlert.Title>Info tittel</LocalAlert.Title>
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
        {...restProps}
        type="strong"
        global={false}
        statusType={variant === "success" ? "message" : "alert"}
        variant={variant}
      />
    );
  },
) as LocalAlertComponent;

/* ----------------------------- LocalAlertHeader ----------------------------- */
type LocalAlertHeaderProps = BaseAlert.HeaderProps;

/**
 * @see 🏷️ {@link LocalAlertHeaderProps}
 * @example
 * ```jsx
 *  <LocalAlert>
 *    <LocalAlert.Header icon={<InformationSquareIcon />}>
 *      <LocalAlert.Title>Info tittel</LocalAlert.Title>
 *    </LocalAlert.Header>
 *  </LocalAlert>
 * ```
 */
const LocalAlertHeader = BaseAlert.Header;

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

/* ----------------------------- LocalAlertCloseButton ---------------------------- */
type LocalAlertCloseButtonProps = BaseAlert.CloseButtonProps;

/**
 * @see 🏷️ {@link LocalAlertCloseButtonProps}
 * @example
 * ```jsx
 *  <LocalAlert>
 *    <LocalAlert.Header>
 *      <LocalAlert.Title>Info tittel</LocalAlert.Title>
 *     <LocalAlert.CloseButton onClick={() => alert("Lukket!")} />
 *    </LocalAlert.Header>
 *
 *  </LocalAlert>
 * ```
 */
const LocalAlertCloseButton = BaseAlert.CloseButton;

LocalAlert.Header = LocalAlertHeader;
LocalAlert.Title = LocalAlertTitle;
LocalAlert.Content = LocalAlertContent;
LocalAlert.CloseButton = LocalAlertCloseButton;

export {
  LocalAlert,
  LocalAlertContent,
  LocalAlertHeader,
  LocalAlertTitle,
  LocalAlertCloseButton,
};
export type {
  LocalAlertContentProps,
  LocalAlertHeaderProps,
  LocalAlertProps,
  LocalAlertTitleProps,
  LocalAlertCloseButtonProps,
};
