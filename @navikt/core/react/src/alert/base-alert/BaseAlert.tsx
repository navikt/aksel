import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";
import { AkselColor } from "../../types";
import { Heading } from "../../typography";
import { createContext } from "../../util/create-context";

type BaseAlert = {
  size: "medium" | "small";
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
}

interface BaseAlertComponent
  extends React.ForwardRefExoticComponent<
    BaseAlertProps & React.RefAttributes<HTMLDivElement>
  > {
  Header: typeof BaseAlertHeader;
  Title: typeof BaseAlertTitle;
  Content: typeof BaseAlertContent;
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
        <BaseAlertProvider size={size}>{children}</BaseAlertProvider>
      </div>
    );
  },
) as BaseAlertComponent;

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

BaseAlert.Header = BaseAlertHeader;
BaseAlert.Title = BaseAlertTitle;
BaseAlert.Content = BaseAlertContent;

export {
  BaseAlert as Root,
  BaseAlertHeader as Header,
  BaseAlertTitle as Title,
  BaseAlertContent as Content,
};

export type {
  BaseAlertProps as RootProps,
  BaseAlertHeaderProps as HeaderProps,
  BaseAlertTitleProps as TitleProps,
  BaseAlertContentProps as ContentProps,
};
