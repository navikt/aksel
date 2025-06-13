import React, {
  HTMLAttributes,
  ImgHTMLAttributes,
  SVGProps,
  forwardRef,
} from "react";
import { ArrowRightIcon } from "@navikt/aksel-icons";
import { useRenameCSS } from "../theme/Theme";
import { BodyLong, Heading } from "../typography";
import {
  LinkAnchor,
  LinkAnchorOverlay,
  type LinkAnchorOverlayProps,
  LinkAnchorProps,
} from "./LinkAnchor";

/* ------------------------------ LinkCard Root ----------------------------- */
type LinkCardProps = LinkAnchorOverlayProps & {
  /**
   * @default true
   */
  hasArrow?: boolean;
  /**
   * Automatically applies layout styles when true.
   * If false, you get full control over layout and spacing.
   * This is useful for custom layouts.
   * @default true
   */
  autoLayout?: boolean;
};

const LinkCard = forwardRef<HTMLDivElement, LinkCardProps>(
  (
    {
      children,
      className,
      hasArrow = true,
      autoLayout = true,
      ...restProps
    }: LinkCardProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    return (
      <LinkAnchorOverlay asChild>
        <div
          ref={forwardedRef}
          data-color="neutral"
          {...restProps}
          className={cn("navds-link-card", className)}
          data-arrow={hasArrow}
          data-auto-layout={autoLayout}
          style={{ padding: "1rem", border: "1px solid black" }}
        >
          {children}
        </div>
      </LinkAnchorOverlay>
    );
  },
);

/* ---------------------------- LinkCard Title ---------------------------- */
type LinkCardTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  children: React.ReactNode;
  /**
   * Heading tag, only use "div" if you want a non header defining card
   * (eg. you have a lot of them all at once, such as in a grid)
   * @default "span"
   */
  as: "span" | "h2" | "h3" | "h4" | "h5" | "h6";
};

const LinkCardTitle = forwardRef<HTMLHeadingElement, LinkCardTitleProps>(
  ({ children, as, className }: LinkCardTitleProps, forwardedRef) => {
    const { cn } = useRenameCSS();

    return (
      <Heading
        as={as}
        size="small"
        ref={forwardedRef}
        className={cn("navds-link-card__heading", className)}
      >
        {children}
        {/* TODO: Consider hiding this based on root context */}
        <LinkCardArrow />
      </Heading>
    );
  },
);

/* ---------------------------- LinkCard Anchor ---------------------------- */
type LinkCardAnchorProps = LinkAnchorProps;

const LinkCardAnchor = forwardRef<HTMLAnchorElement, LinkCardAnchorProps>(
  (props: LinkCardAnchorProps, forwardedRef) => {
    return <LinkAnchor ref={forwardedRef} {...props} />;
  },
);

/* ---------------------------- LinkCard Description ---------------------------- */
interface LinkCardDescriptionProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const LinkCardDescription = forwardRef<
  HTMLDivElement,
  LinkCardDescriptionProps
>(({ children }: LinkCardDescriptionProps, forwardedRef) => {
  const { cn } = useRenameCSS();

  return (
    <BodyLong
      as="div"
      size="medium"
      ref={forwardedRef}
      className={cn("navds-link-card__description")}
    >
      {children}
    </BodyLong>
  );
});

/* ---------------------------- LinkCard Footer ---------------------------- */
interface LinkCardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const LinkCardFooter = forwardRef<HTMLDivElement, LinkCardFooterProps>(
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

const LinkCardIcon = forwardRef<HTMLDivElement, LinkCardIconProps>(
  ({ children, className, ...restProps }: LinkCardIconProps, forwardedRef) => {
    const { cn } = useRenameCSS();

    return (
      <div
        ref={forwardedRef}
        className={cn("navds-link-card__icon", className)}
        aria-hidden
        data-color="neutral"
        {...restProps}
      >
        {children}
      </div>
    );
  },
);

/* ---------------------------- LinkCard Arrow ---------------------------- */
type LinkCardArrowProps = Omit<SVGProps<SVGSVGElement>, "ref">;

const LinkCardArrow = forwardRef<SVGSVGElement, LinkCardArrowProps>(
  ({ className, ...restProps }: LinkCardArrowProps, forwardedRef) => {
    const { cn } = useRenameCSS();

    return (
      <ArrowRightIcon
        ref={forwardedRef}
        aria-hidden
        className={cn("navds-link-card__arrow", className)}
        {...restProps}
      />
    );
  },
);

/* ---------------------------- LinkCard Image ---------------------------- */
type ImageAspectRatio = "1:1" | "16:9" | "16:10" | "4:3";

interface LinkCardImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: ImageAspectRatio;
  /**
   * Ignores card padding
   * @default false
   */
  isInset?: boolean;
}

const LinkCardImage = forwardRef<HTMLImageElement, LinkCardImageProps>(
  (
    {
      className,
      alt,
      aspectRatio,
      width = aspectRatio ? "100%" : "",
      height = aspectRatio ? "100%" : "",
      isInset = false,
      ...restProps
    }: LinkCardImageProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    return (
      <span
        className={cn("navds-link-card__image-container", {
          "navds-link-card__image-container--inset": isInset,
        })}
      >
        <img
          ref={forwardedRef}
          {...restProps}
          className={cn(
            "navds-link-card__image",
            className,
            aspectRatioClassName(aspectRatio),
          )}
          alt={alt}
          width={width}
          height={height}
        />
      </span>
    );
  },
);

/* --------------------------- LinkCard utilities --------------------------- */
function aspectRatioClassName(aspectRatio?: ImageAspectRatio): string {
  if (!aspectRatio) {
    return "";
  }

  /* TODO: Dynamic classnames can't be used as is */
  const [width, height] = aspectRatio.split(":").map(Number);
  return `navds-link-card__image--aspect-${width}-${height}`;
}

export {
  LinkCard,
  LinkCardAnchor,
  LinkCardArrow,
  LinkCardDescription,
  LinkCardFooter,
  LinkCardIcon,
  LinkCardImage,
  LinkCardTitle,
};

export type {
  LinkCardAnchorProps,
  LinkCardArrowProps,
  LinkCardDescriptionProps,
  LinkCardFooterProps,
  LinkCardIconProps,
  LinkCardImageProps,
  LinkCardProps,
  LinkCardTitleProps,
};
