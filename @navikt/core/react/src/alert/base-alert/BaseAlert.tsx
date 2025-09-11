import React, { forwardRef } from "react";
import { XMarkIcon } from "@navikt/aksel-icons";
import { Button } from "../../button";
import { useRenameCSS } from "../../theme/Theme";
import { AkselColor } from "../../types";
import { Heading } from "../../typography";
import { createContext } from "../../util/create-context";
import { useI18n } from "../../util/i18n/i18n.hooks";

type BaseAlert = {
  size: "medium" | "small";
  statusType: "alert" | "message";
};

const [BaseAlertProvider, useBaseAlert] = createContext<BaseAlert>({
  name: "BaseAlert",
  errorMessage: "useBaseAlert must be used within an BaseAlertProvider",
});

interface BaseAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Component content.
   */
  children: React.ReactNode;
  /**
   * Changes the size of the BaseAlert.
   * @default "medium"
   */
  size?: BaseAlert["size"];
  /**
   * Overrides color
   */
  "data-color"?: AkselColor;
  /**
   * Intensity of the alert
   */
  type: "moderate" | "strong";
  /**
   * Centers alert and removed border-radius
   * @default false
   */
  global?: boolean;
  /**
   * Changes the semantics of the alert. Use "alert" for important information that needs user attention, and "message" for less important information.
   */
  statusType: BaseAlert["statusType"];
}

const BaseAlert = forwardRef<HTMLDivElement, BaseAlertProps>(
  (
    {
      children,
      className,
      size = "medium",
      "data-color": dataColor,
      type,
      global = false,
      statusType,
      ...restProps
    }: BaseAlertProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    return (
      <div
        ref={forwardedRef}
        {...restProps}
        className={cn(className, "navds-base-alert")}
        data-size={size}
        data-color={dataColor}
        data-type={type}
        data-global={global}
      >
        <BaseAlertProvider size={size} statusType={statusType}>
          {children}
        </BaseAlertProvider>
      </div>
    );
  },
);

/* ----------------------------- BaseAlertHeader ----------------------------- */
interface BaseAlertHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Icon to display in the header.
   */
  icon?: React.ReactNode;
}

/**
 * @see 🏷️ {@link BaseAlertHeaderProps}
 * @example
 * ```jsx
 *  <BaseAlert>
 *    <BaseAlert.Header icon={<InformationSquareIcon />}>
 *      <BaseAlert.Title>Info tittel</BaseAlert.Title>
 *    </BaseAlert.Header>
 *  </BaseAlert>
 * ```
 */
const BaseAlertHeader = forwardRef<HTMLDivElement, BaseAlertHeaderProps>(
  (
    { children, className, icon, ...restProps }: BaseAlertHeaderProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    return (
      <div
        ref={forwardedRef}
        {...restProps}
        className={cn(className, "navds-base-alert__header")}
      >
        {icon && (
          <div className={cn("navds-base-alert__icon")} aria-hidden>
            {icon}
          </div>
        )}
        {children}
      </div>
    );
  },
);

/* ----------------------------- BaseAlertTitle ----------------------------- */
interface BaseAlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  /**
   * Changes the HTML element used for the title.
   * @default "h2"
   */
  as?: "h2" | "h3" | "h4" | "h5" | "h6";
}

/**
 * Title component for BaseAlert. Remember to use correct heading-level with the `as` prop.
 * @see 🏷️ {@link BaseAlertTitleProps}
 * @example
 * ```jsx
 *  <BaseAlert>
 *    <BaseAlert.Header>
 *      <BaseAlert.Title as="h2">Info tittel</BaseAlert.Title>
 *    </BaseAlert.Header>
 *  </BaseAlert>
 * ```
 */
const BaseAlertTitle = forwardRef<HTMLHeadingElement, BaseAlertTitleProps>(
  (
    { children, className, as = "h2", ...restProps }: BaseAlertTitleProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();
    const { size } = useBaseAlert();

    return (
      <Heading
        ref={forwardedRef}
        {...restProps}
        as={as}
        size={size === "medium" ? "small" : "xsmall"}
        className={cn(className, "navds-base-alert__title")}
      >
        {children}
      </Heading>
    );
  },
);

/* ----------------------------- BaseAlertContent ---------------------------- */
interface BaseAlertContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * @see 🏷️ {@link BaseAlertContentProps}
 * @example
 * ```jsx
 *  <BaseAlert>
 *    <BaseAlert.Header>
 *      <BaseAlert.Title>Info tittel</BaseAlert.Title>
 *    </BaseAlert.Header>
 *
 *    <BaseAlert.Content>Innhold</BaseAlert.Content>
 *  </BaseAlert>
 * ```
 */
const BaseAlertContent = forwardRef<HTMLDivElement, BaseAlertContentProps>(
  (
    { children, className, ...restProps }: BaseAlertContentProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    return (
      <div
        ref={forwardedRef}
        /* TODO: Replace with solution from https://github.com/navikt/aksel/pull/4075 */
        data-color=""
        {...restProps}
        className={cn(className, "navds-base-alert__content")}
      >
        {children}
      </div>
    );
  },
);

/* ----------------------------- BaseAlertCloseButton ---------------------------- */
type BaseAlertCloseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * @see 🏷️ {@link BaseAlertCloseButtonProps}
 * @example
 * ```jsx
 *  <BaseAlert>
 *    <BaseAlert.Header>
 *      <BaseAlert.Title>Info tittel</BaseAlert.Title>
 *      <BaseAlert.CloseButton aria-label="Lukk varsel">
 *    </BaseAlert.Header>
 *  </BaseAlert>
 * ```
 */
const BaseAlertCloseButton = forwardRef<
  HTMLButtonElement,
  BaseAlertCloseButtonProps
>(
  (
    { children, className, ...restProps }: BaseAlertCloseButtonProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();
    const translate = useI18n("Alert");
    const { statusType } = useBaseAlert();

    return (
      <Button
        ref={forwardedRef}
        {...restProps}
        data-color="neutral"
        variant="tertiary-neutral"
        className={cn(className, "navds-base-alert__close-button")}
        type="button"
        icon={
          <XMarkIcon
            title={
              statusType === "alert"
                ? translate("closeAlert")
                : translate("closeMessage")
            }
          />
        }
      >
        {children}
      </Button>
    );
  },
);

export {
  BaseAlert as Root,
  BaseAlertHeader as Header,
  BaseAlertTitle as Title,
  BaseAlertContent as Content,
  BaseAlertCloseButton as CloseButton,
};

export type {
  BaseAlertProps as RootProps,
  BaseAlertHeaderProps as HeaderProps,
  BaseAlertTitleProps as TitleProps,
  BaseAlertContentProps as ContentProps,
  BaseAlertCloseButtonProps as CloseButtonProps,
};
