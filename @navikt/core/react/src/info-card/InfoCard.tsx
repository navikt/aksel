import React, { forwardRef } from "react";
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

interface InfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * InfoCard content.
   */
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

interface InfoCardComponent
  extends React.ForwardRefExoticComponent<
    InfoCardProps & React.RefAttributes<HTMLDivElement>
  > {
  Header: typeof InfoCardHeader;
  Title: typeof InfoCardTitle;
  Content: typeof InfoCardContent;
}

/**
 * A component for displaying informational content in a card format.
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/infocard)
 * @see 🏷️ {@link InfoCardProps}
 * @example
 * ```jsx
 *  <InfoCard data-color="info">
 *    <InfoCard.Header icon={<InformationSquareIcon />}>
 *      <InfoCard.Title>Info tittel</InfoCard.Title>
 *    </InfoCard.Header>
 *    <InfoCard.Content>Innhold</InfoCard.Content>
 *  </InfoCard>
 * ```
 */
const InfoCard = forwardRef<HTMLDivElement, InfoCardProps>(
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
) as InfoCardComponent;

/* ----------------------------- InfoCardHeader ----------------------------- */
interface InfoCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Icon to display in `Header`.
   */
  icon?: React.ReactNode;
}

/**
 * @see 🏷️ {@link InfoCardHeaderProps}
 * @example
 * ```jsx
 *  <InfoCard>
 *    <InfoCard.Header icon={<InformationSquareIcon />}>
 *      <InfoCard.Title>Info tittel</InfoCard.Title>
 *    </InfoCard.Header>
 *  </InfoCard>
 * ```
 */
const InfoCardHeader = forwardRef<HTMLDivElement, InfoCardHeaderProps>(
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
        {icon && (
          <div className={cn("navds-info-card__icon")} aria-hidden>
            {icon}
          </div>
        )}
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

/**
 * Title component for InfoCard. Remember to use correct heading-level with the `as` prop.
 * @see 🏷️ {@link InfoCardTitleProps}
 * @example
 * ```jsx
 *  <InfoCard>
 *    <InfoCard.Header>
 *      <InfoCard.Title as="h2">Info tittel</InfoCard.Title>
 *    </InfoCard.Header>
 *  </InfoCard>
 * ```
 */
const InfoCardTitle = forwardRef<HTMLHeadingElement, InfoCardTitleProps>(
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

/**
 * @see 🏷️ {@link InfoCardContentProps}
 * @example
 * ```jsx
 *  <InfoCard>
 *    <InfoCard.Header>
 *      <InfoCard.Title>Info tittel</InfoCard.Title>
 *    </InfoCard.Header>
 *
 *    <InfoCard.Content>Innhold</InfoCard.Content>
 *  </InfoCard>
 * ```
 */
const InfoCardContent = forwardRef<HTMLDivElement, InfoCardContentProps>(
  (
    { children, className, ...restProps }: InfoCardContentProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    return (
      <div
        ref={forwardedRef}
        /* TODO: Replace with solution from https://github.com/navikt/aksel/pull/4075 */
        data-color=""
        {...restProps}
        className={cn(className, "navds-info-card__content")}
      >
        {children}
      </div>
    );
  },
);

InfoCard.Header = InfoCardHeader;
InfoCard.Title = InfoCardTitle;
InfoCard.Content = InfoCardContent;

export { InfoCard, InfoCardHeader, InfoCardTitle, InfoCardContent };
export type {
  InfoCardProps,
  InfoCardHeaderProps,
  InfoCardTitleProps,
  InfoCardContentProps,
};
