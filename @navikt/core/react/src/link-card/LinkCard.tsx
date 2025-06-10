/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  AnchorHTMLAttributes,
  HTMLAttributes,
  ImgHTMLAttributes,
  SVGProps,
  forwardRef,
  useRef,
  useState,
} from "react";
import { ArrowRightIcon } from "@navikt/aksel-icons";
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

type LinkCardContextProps = {
  anchorRef: React.RefObject<HTMLAnchorElement>;
};

const [LinkCardContextProvider, useLinkCardContext] =
  createContext<LinkCardContextProps>({
    name: "LinkCardContext",
    errorMessage:
      "useLinkCardContext must be used within an LinkCardContextProvider",
  });

export type LinkCardStrucutredProps = {
  title: string;
  description?: string;
  footer?: string;
  href?: string;
};

interface LinkCardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
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
}

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

    const anchorRef = useRef<HTMLAnchorElement>(null);
    const [isContextMenuOpen, setIsContextMenuOpen] = useState<boolean>(false);

    function isTextSelected() {
      return !!window.getSelection()?.toString();
    }

    return (
      <LinkCardContextProvider anchorRef={anchorRef}>
        <div
          ref={forwardedRef}
          data-color="neutral"
          {...restProps}
          className={cn("navds-link-card", className)}
          data-arrow={hasArrow}
          data-auto-layout={autoLayout}
          style={{ padding: "1rem", border: "1px solid black" }}
          onPointerDown={(e) => {
            /**
             * When user intends to invoke context menu, we want to make sure
             * they can interact with the element as if it was a native link.
             */
            if (e.button == 2 || (e.button == 0 && e.ctrlKey)) {
              setIsContextMenuOpen(true);
            }
          }}
          onPointerUp={() => setIsContextMenuOpen(false)}
          onPointerLeave={() => setIsContextMenuOpen(false)}
          onPointerMove={() => {
            if (!isContextMenuOpen) {
              return;
            }
            setIsContextMenuOpen(false);
          }}
          data-context={isContextMenuOpen}
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
        </div>
      </LinkCardContextProvider>
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
interface LinkCardAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  as?: any;
  asChild?: any;
}

/**
 * TODO:
 * - Support OverridableComponent?
 * - Implement it so that clicking on container triggers this link with a click or similar.
 */
const LinkCardAnchor = forwardRef<HTMLAnchorElement, LinkCardAnchorProps>(
  (
    { children, className, ...restProps }: LinkCardAnchorProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    const { anchorRef } = useLinkCardContext();
    const mergedRefs = useMergeRefs(forwardedRef, anchorRef);

    return (
      <a
        ref={mergedRefs}
        {...restProps}
        className={cn("navds-link-card__anchor", className)}
        onClick={(e) => {
          console.info("LinkCardAnchor clicked", e);
          /* e.preventDefault(); */
        }}
      >
        {children}
      </a>
    );
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
  LinkCardTitle,
  LinkCardAnchor,
  LinkCardDescription,
  LinkCardFooter,
  LinkCardIcon,
  LinkCardArrow,
  LinkCardImage,
};

export type {
  LinkCardProps,
  LinkCardTitleProps,
  LinkCardAnchorProps,
  LinkCardDescriptionProps,
  LinkCardFooterProps,
  LinkCardIconProps,
  LinkCardArrowProps,
  LinkCardImageProps,
};
