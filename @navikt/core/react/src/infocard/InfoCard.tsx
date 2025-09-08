import React, { forwardRef } from "react";
import { InformationSquareFillIcon } from "@navikt/aksel-icons";
import { useRenameCSS } from "../theme/Theme";
import { AkselColor } from "../types";
import { Heading } from "../typography";
import { createContext } from "../util/create-context";

type InfoCardContext = {
  size: "medium" | "small";
};

const [InfoCardContextProvider, useInfoCardContext] =
  createContext<InfoCardContext>({
    name: "InfoCardContext",
    errorMessage: "useInfoCardContext must be used within an InfoCard",
  });

/* https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/alert_role */
interface InfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Changes the size of the InfoCard.
   * @default "medium"
   */
  size?: InfoCardContext["size"];
  /**
   * Overrides card color
   */
  "data-color"?: AkselColor;
}

export const InfoCard = forwardRef<HTMLDivElement, InfoCardProps>(
  (
    {
      children,
      className,
      size = "medium",
      "data-color": dataColor = "info",
      ...restProps
    }: InfoCardProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    return (
      <div
        ref={forwardedRef}
        {...restProps}
        className={cn(className, "navds-info-card", `navds-info-card--${size}`)}
        data-color={dataColor}
      >
        <InfoCardContextProvider size={size}>
          {children}
        </InfoCardContextProvider>
      </div>
    );
  },
);

/* ----------------------------- InfoCardHeader ----------------------------- */
interface InfoCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * @default <InformationSquareFillIcon />
   */
  icon?: React.ReactNode;
}

export const InfoCardHeader = forwardRef<HTMLDivElement, InfoCardHeaderProps>(
  (
    { children, className, icon, ...restProps }: InfoCardHeaderProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    return (
      <div
        ref={forwardedRef}
        {...restProps}
        className={cn(className, "navds-info-card__header")}
      >
        <div className={cn("navds-info-card__icon")} aria-hidden>
          {icon ?? <InformationSquareFillIcon />}
        </div>
        {children}
      </div>
    );
  },
);

/* ----------------------------- InfoCardTitle ----------------------------- */
interface InfoCardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  /**
   * Changes the HTML element used for the title.
   * @default "h2"
   */
  as?: "h2" | "h3" | "h4" | "h5" | "h6";
}

export const InfoCardTitle = forwardRef<HTMLHeadingElement, InfoCardTitleProps>(
  (
    { children, className, as = "h2", ...restProps }: InfoCardTitleProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();
    const { size } = useInfoCardContext();

    return (
      <Heading
        ref={forwardedRef}
        {...restProps}
        as={as}
        size={size === "medium" ? "small" : "xsmall"}
        className={cn(className, "navds-info-card__title")}
      >
        {children}
      </Heading>
    );
  },
);

/* ----------------------------- InfoCardContent ---------------------------- */
interface InfoCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const InfoCardContent = forwardRef<HTMLDivElement, InfoCardContentProps>(
  (
    { children, className, ...restProps }: InfoCardContentProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    return (
      <div
        ref={forwardedRef}
        {...restProps}
        className={cn(className, "navds-info-card__content")}
      >
        {children}
      </div>
    );
  },
);

export default InfoCard;
