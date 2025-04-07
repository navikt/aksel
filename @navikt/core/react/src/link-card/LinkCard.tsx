import React, {
  AnchorHTMLAttributes,
  HTMLAttributes,
  ImgHTMLAttributes,
  forwardRef,
} from "react";
import { Tag, TagProps } from "../tag";
import { useRenameCSS } from "../theme/Theme";
import { BodyLong, BodyShort, Detail } from "../typography";
import { OverridableComponent } from "../util";

/* ------------------------------ LinkCard Root ----------------------------- */
export interface LinkCardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  ctaText?: string;
  /**
   * @default false
   */
  isFullWidth?: boolean;
  /**
   * Whether the card should have a border
   * @default true
   */
  hasBorder?: boolean;
}

export const LinkCard = forwardRef<HTMLDivElement, LinkCardProps>(
  (
    {
      children,
      className,
      ctaText,
      isFullWidth = false,
      hasBorder = true,
    }: LinkCardProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    return (
      <div
        ref={forwardedRef}
        className={cn("navds-link-card", className, {
          /* TODO: Use data-attrb? */
          "navds-link-card--full-width": isFullWidth,
          "navds-link-card--border": hasBorder,
        })}
      >
        {children}
        {/* <LinkCardArrow /> */}
        {ctaText && (
          <div className={cn("navds-link-card__action")}>
            <Detail as="span">{ctaText}</Detail>
            <LinkCardArrow />
          </div>
        )}
      </div>
    );
  },
);

/* ---------------------------- LinkCard Heading ---------------------------- */
interface LinkCardHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  /**
   * Heading tag
   * @default "h3"
   */
  as: "h2" | "h3" | "h4" | "h5" | "h6";
}

export const LinkCardHeading = forwardRef<
  HTMLHeadingElement,
  LinkCardHeadingProps
>(({ children, as }: LinkCardHeadingProps, forwardedRef) => {
  const { cn } = useRenameCSS();

  return (
    <BodyShort
      as={as}
      size="large"
      ref={forwardedRef}
      className={cn("navds-link-card__heading")}
    >
      {children}
    </BodyShort>
  );
});

/* ---------------------------- LinkCard Anchor ---------------------------- */
interface LinkCardAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

export const LinkCardAnchor: OverridableComponent<
  LinkCardAnchorProps,
  HTMLAnchorElement
> = forwardRef(
  ({ children, as: Component = "a", ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();

    return (
      <Component
        ref={forwardedRef}
        {...restProps}
        className={cn("navds-link-card__anchor")}
      >
        {children}
      </Component>
    );
  },
);

/* ---------------------------- LinkCard Description ---------------------------- */
interface LinkCardDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const LinkCardDescription = forwardRef<
  HTMLParagraphElement,
  LinkCardDescriptionProps
>(({ children }: LinkCardDescriptionProps, forwardedRef) => {
  const { cn } = useRenameCSS();

  return (
    <BodyLong
      as="p"
      size="medium"
      ref={forwardedRef}
      className={cn("navds-link-card__description")}
    >
      {children}
    </BodyLong>
  );
});

/* ---------------------------- LinkCard Tag ---------------------------- */
type LinkCardTagProps = Omit<TagProps, "size">;

export const LinkCardTag = forwardRef<HTMLSpanElement, LinkCardTagProps>(
  (props: LinkCardTagProps, forwardedRef) => {
    const { cn } = useRenameCSS();

    return (
      <Tag
        ref={forwardedRef}
        {...props}
        size="small"
        className={cn("navds-link-card__tag", props.className)}
      />
    );
  },
);

/* ---------------------------- LinkCard Icon ---------------------------- */
interface LinkCardIconProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Whether the icon should have a background
   * @default true
   */
  hasBackground?: boolean;
}

export const LinkCardIcon = forwardRef<HTMLDivElement, LinkCardIconProps>(
  (
    { children, hasBackground = true, ...restProps }: LinkCardIconProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    return (
      <div
        ref={forwardedRef}
        className={cn("navds-link-card__icon", {
          "navds-link-card__icon--background": hasBackground,
        })}
        aria-hidden
        data-color-role="neutral"
        {...restProps}
      >
        {children}
      </div>
    );
  },
);

/* ---------------------------- LinkCard Arrow ---------------------------- */
export const LinkCardArrow = () => {
  const { cn } = useRenameCSS();

  return (
    <svg
      className={cn("navds-link-card__arrow")}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      focusable={false}
    >
      <path
        fill="currentColor"
        d="M7.28033 3.21967C6.98744 2.92678 6.51256 2.92678 6.21967 3.21967C5.92678 3.51256 5.92678 3.98744 6.21967 4.28033L7.28033 3.21967ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.21967 11.7197C5.92678 12.0126 5.92678 12.4874 6.21967 12.7803C6.51256 13.0732 6.98744 13.0732 7.28033 12.7803L6.21967 11.7197ZM6.21967 4.28033L10.4697 8.53033L11.5303 7.46967L7.28033 3.21967L6.21967 4.28033ZM10.4697 7.46967L6.21967 11.7197L7.28033 12.7803L11.5303 8.53033L10.4697 7.46967Z"
      />
      <path
        className={cn("navds-link-card__arrow-line")}
        stroke="currentColor"
        d="M1.75 8H11"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

/* ---------------------------- LinkCard Image ---------------------------- */
export type ImageAspectRatio = "1:1" | "16:9" | "16:10" | "4:3";

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

export const LinkCardImage = forwardRef<HTMLImageElement, LinkCardImageProps>(
  (
    {
      className,
      alt,
      aspectRatio,
      width = aspectRatio ? "100%" : undefined,
      height = aspectRatio ? "100%" : undefined,
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
          className={cn(className, aspectRatioClassName(aspectRatio))}
          alt={alt}
          width={width}
          height={height}
        />
      </span>
    );
  },
);

function aspectRatioClassName(aspectRatio?: ImageAspectRatio): string {
  if (!aspectRatio) {
    return "";
  }

  const [width, height] = aspectRatio.split(":").map(Number);
  return `navds-link-card__image--aspect-${width}-${height}`;
}

export default { LinkCard };
