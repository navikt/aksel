import React, { HTMLAttributes, forwardRef } from "react";
import { useRenameCSS } from "../theme/Theme";
import { BodyLong, Heading } from "../typography";
import { createContext } from "../util/create-context";
import {
  LinkAnchor,
  LinkAnchorArrow,
  LinkAnchorOverlay,
  LinkAnchorProps,
} from "../util/link-anchor";

/* ------------------------------ LinkCard Root ----------------------------- */
interface LinkCardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @default true
   */
  arrow?: boolean;
  /**
   * Changes padding and typo sizes.
   * @default "medium"
   */
  size?: "small" | "medium";
}

type LinkCardContextProps = {
  size: LinkCardProps["size"];
  arrow: LinkCardProps["arrow"];
};

const [LinkCardContextProvider, useLinkCardContext] =
  createContext<LinkCardContextProps>({
    name: "LinkCardContextProvider",
  });

interface LinkCardComponent
  extends React.ForwardRefExoticComponent<
    LinkCardProps & React.RefAttributes<HTMLDivElement>
  > {
  /**
   * @see 🏷️ {@link LinkCardTitleProps}
   */
  Title: typeof LinkCardTitle;
  /**
   * @see 🏷️ {@link LinkCardAnchorProps}
   */
  Anchor: typeof LinkCardAnchor;
  /**
   * @see 🏷️ {@link LinkCardDescriptionProps}
   */
  Description: typeof LinkCardDescription;
  /**
   * @see 🏷️ {@link LinkCardFooterProps}
   */
  Footer: typeof LinkCardFooter;
  /**
   * @see 🏷️ {@link LinkCardIconProps}
   */
  Icon: typeof LinkCardIcon;
  /**
   * @see 🏷️ {@link LinkCardImageProps}
   */
  Image: typeof LinkCardImage;
}

/**
 * Accessible clickable card as a link.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/linkcard)
 * @see 🏷️ {@link LinkCardProps}
 *
 *
 * @example
 * ```tsx
 * <LinkCard>
 *   <LinkCard.Icon>
 *     <IconOrPictogram />
 *   </LinkCard.Icon>
 *   <LinkCard.Title>
 *     <LinkCard.Anchor href="/href">
 *       LinkCard title
 *     </LinkCard.Anchor>
 *   </LinkCard.Title>
 *   <LinkCard.Description>
 *     This is a description of the link card.
 *   </LinkCard.Description>
 *   <LinkCard.Footer>Footer content</LinkCard.Footer>
 * </LinkCard>
 * ```
 */
export const LinkCard = forwardRef<HTMLDivElement, LinkCardProps>(
  (
    {
      children,
      className,
      arrow = true,
      size = "medium",
      ...restProps
    }: LinkCardProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    return (
      <LinkCardContextProvider size={size} arrow={arrow}>
        <LinkAnchorOverlay asChild>
          <BodyLong
            as="div"
            size={size}
            ref={forwardedRef}
            data-color="neutral"
            {...restProps}
            className={cn(
              "navds-link-card",
              className,
              `navds-link-card--${size}`,
            )}
          >
            {children}
          </BodyLong>
        </LinkAnchorOverlay>
      </LinkCardContextProvider>
    );
  },
) as LinkCardComponent;

/* ---------------------------- LinkCard Title ---------------------------- */
type LinkCardTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  children: React.ReactNode;
  /**
   * Heading tag. Use "span" if you want a non header defining card
   * (eg. you have a lot of them all at once, such as in a grid)
   * @default "span"
   */
  as?: "span" | "h2" | "h3" | "h4" | "h5" | "h6";
};

/**
 * @see 🏷️ {@link LinkCardTitleProps}
 */
export const LinkCardTitle = forwardRef<HTMLHeadingElement, LinkCardTitleProps>(
  ({ children, as = "span", className }: LinkCardTitleProps, forwardedRef) => {
    const { cn } = useRenameCSS();

    const context = useLinkCardContext();

    return (
      <Heading
        as={as}
        size={context.size === "medium" ? "small" : "xsmall"}
        ref={forwardedRef}
        className={cn("navds-link-card__title", className)}
      >
        {children}
        {context.arrow && (
          <LinkAnchorArrow
            fontSize={context.size === "medium" ? "1.75rem" : "1.5rem"}
          />
        )}
      </Heading>
    );
  },
);

/* ---------------------------- LinkCard Anchor ---------------------------- */
type LinkCardAnchorProps = LinkAnchorProps;

/**
 * @see 🏷️ {@link LinkCardAnchorProps}
 */
export const LinkCardAnchor = LinkAnchor;

/* ---------------------------- LinkCard Description ---------------------------- */
interface LinkCardDescriptionProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * @see 🏷️ {@link LinkCardDescriptionProps}
 */
export const LinkCardDescription = forwardRef<
  HTMLDivElement,
  LinkCardDescriptionProps
>(({ children }: LinkCardDescriptionProps, forwardedRef) => {
  const { cn } = useRenameCSS();

  return (
    <div ref={forwardedRef} className={cn("navds-link-card__description")}>
      {children}
    </div>
  );
});

/* ---------------------------- LinkCard Footer ---------------------------- */
interface LinkCardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * @see 🏷️ {@link LinkCardFooterProps}
 */
export const LinkCardFooter = forwardRef<HTMLDivElement, LinkCardFooterProps>(
  ({ children }: LinkCardFooterProps, forwardedRef) => {
    const { cn } = useRenameCSS();

    return (
      <div ref={forwardedRef} className={cn("navds-link-card__footer")}>
        {children}
      </div>
    );
  },
);

/* ---------------------------- LinkCard Icon ---------------------------- */
interface LinkCardIconProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * @see 🏷️ {@link LinkCardIconProps}
 */
export const LinkCardIcon = forwardRef<HTMLDivElement, LinkCardIconProps>(
  ({ children, className, ...restProps }: LinkCardIconProps, forwardedRef) => {
    const { cn } = useRenameCSS();

    return (
      <div
        ref={forwardedRef}
        className={cn("navds-link-card__icon", className)}
        aria-hidden
        {...restProps}
      >
        {children}
      </div>
    );
  },
);

/* ---------------------------- LinkCard Image ---------------------------- */
type ImageAspectRatio = "1/1" | "16/9" | "16/10" | "4/3" | (string & {});

interface LinkCardImageProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * The aspect-ratio CSS property allows you to define the desired width-to-height ratio of an element's box.
   * This means that even if the parent container or viewport size changes, the browser will adjust the element's dimensions to maintain the specified width-to-height ratio.
   */
  aspectRatio?: ImageAspectRatio;
}

/**
 * @see 🏷️ {@link LinkCardImageProps}
 */
export const LinkCardImage = forwardRef<HTMLDivElement, LinkCardImageProps>(
  (
    {
      children,
      className,
      aspectRatio,
      style,
      ...restProps
    }: LinkCardImageProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    return (
      <div
        ref={forwardedRef}
        className={cn("navds-link-card__image-container", className)}
        style={{
          ...style,
          aspectRatio,
        }}
        {...restProps}
      >
        {children}
      </div>
    );
  },
);

LinkCard.Title = LinkCardTitle;
LinkCard.Anchor = LinkCardAnchor;
LinkCard.Description = LinkCardDescription;
LinkCard.Footer = LinkCardFooter;
LinkCard.Icon = LinkCardIcon;
LinkCard.Image = LinkCardImage;

export type {
  LinkCardAnchorProps,
  LinkCardDescriptionProps,
  LinkCardFooterProps,
  LinkCardIconProps,
  LinkCardImageProps,
  LinkCardProps,
  LinkCardTitleProps,
};
