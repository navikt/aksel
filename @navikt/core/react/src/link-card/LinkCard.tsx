/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  AnchorHTMLAttributes,
  HTMLAttributes,
  ImgHTMLAttributes,
  SVGProps,
  forwardRef,
  useCallback,
  useRef,
} from "react";
import { ArrowRightIcon } from "@navikt/aksel-icons";
import { Slot } from "../slot/Slot";
import { useRenameCSS } from "../theme/Theme";
import { BodyLong, Heading } from "../typography";
import { createContext } from "../util/create-context";
import { useMergeRefs } from "../util/hooks";

/**
 * TODO:
 * - Consider the need for `as` with overridablecomponent-API vs Slot, or both.
 * Especially for the `LinkCardAnchor` component where most relevant to use other frameworks for links.
 */

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

/* ------------------------ LinkCard Anchor utilities ----------------------- */
type LinkAnchorOverlayContextProps = {
  anchorRef: React.RefObject<HTMLAnchorElement>;
};

const [LinkOverlayContextProvider, useLinkOverlayContext] =
  createContext<LinkAnchorOverlayContextProps>({
    name: "LinkAnchorOverlayContext",
  });

interface LinkAnchorOverlayProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  asChild?: boolean;
}

const LinkAnchorOverlay = forwardRef<HTMLDivElement, LinkAnchorOverlayProps>(
  (
    { children, asChild, className, ...restProps }: LinkAnchorOverlayProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();
    const anchorRef = useRef<HTMLAnchorElement>(null);

    const isTextSelected = useCallback(() => {
      return !!window.getSelection()?.toString();
    }, []);

    const Component = asChild ? Slot : "div";

    return (
      <LinkOverlayContextProvider anchorRef={anchorRef}>
        <Component
          ref={forwardedRef}
          {...restProps}
          className={cn("navds-link-anchor__overlay", className)}
          onClick={(e) => {
            if (e.target === anchorRef.current || isTextSelected()) {
              return;
            }

            const event = new MouseEvent("click", {
              bubbles: true,
              cancelable: true,
              view: window,
              ctrlKey: e.ctrlKey,
              shiftKey: e.shiftKey,
              altKey: e.altKey,
              metaKey: e.metaKey,
              button: e.button,
              screenX: e.screenX,
              screenY: e.screenY,
              clientX: e.clientX,
              clientY: e.clientY,
            });

            anchorRef.current?.dispatchEvent(event);
          }}
        >
          {children}
        </Component>
      </LinkOverlayContextProvider>
    );
  },
);

interface LinkAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  asChild?: boolean;
}

const LinkAnchor = forwardRef<HTMLAnchorElement, LinkAnchorProps>(
  (
    { children, asChild, className, ...restProps }: LinkAnchorProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    const context = useLinkOverlayContext(false);
    const mergedRefs = useMergeRefs(forwardedRef, context?.anchorRef);

    const Component = asChild ? Slot : "a";

    return (
      <Component
        ref={mergedRefs}
        {...restProps}
        className={cn("navds-link-anchor", className)}
        onClick={(e) => {
          console.info("LinkAnchor clicked", e);
          /* e.preventDefault(); */
        }}
      >
        {children}
      </Component>
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
  LinkAnchor,
  LinkAnchorOverlay,
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
