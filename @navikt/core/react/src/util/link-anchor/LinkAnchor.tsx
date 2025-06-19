import React, {
  AnchorHTMLAttributes,
  HTMLAttributes,
  SVGProps,
  forwardRef,
  useRef,
} from "react";
import { ArrowRightIcon } from "@navikt/aksel-icons";
import { Slot } from "../../slot/Slot";
import { useRenameCSS } from "../../theme/Theme";
import { composeEventHandlers } from "../composeEventHandlers";
import { createContext } from "../create-context";
import { useMergeRefs } from "../hooks/useMergeRefs";
import { AsChildProps } from "../types";

type LinkAnchorOverlayContextProps = {
  anchorRef: React.RefObject<HTMLAnchorElement>;
};

const [LinkAnchorContextProvider, useLinkAnchorContext] =
  createContext<LinkAnchorOverlayContextProps>({
    name: "LinkAnchorOverlayContext",
  });

type LinkAnchorOverlayProps = HTMLAttributes<HTMLDivElement> & AsChildProps;

const LinkAnchorOverlay = forwardRef<HTMLDivElement, LinkAnchorOverlayProps>(
  (
    {
      children,
      asChild,
      className,
      onClick,
      ...restProps
    }: LinkAnchorOverlayProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();
    const anchorRef = useRef<HTMLAnchorElement>(null);

    const Component = asChild ? Slot : "div";

    return (
      <LinkAnchorContextProvider anchorRef={anchorRef}>
        <Component
          ref={forwardedRef}
          {...restProps}
          className={cn("navds-link-anchor__overlay", className)}
          onClick={composeEventHandlers(onClick, (e) => {
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
          })}
        >
          {children}
        </Component>
      </LinkAnchorContextProvider>
    );
  },
);

/* ------------------------------- LinkAnchor ------------------------------- */
type LinkAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  (
    | {
        children: React.ReactElement | false | null;
        /**
         * Renders the component and its child as a single element,
         * merging the props of the component with the props of the child.
         */
        asChild: true;
        as?: never;
      }
    | {
        children: React.ReactNode;
        /**
         * Renders the component and its child as a single element,
         * merging the props of the component with the props of the child.
         */
        asChild?: false;
        href: string;
      }
  );

const LinkAnchor = forwardRef<HTMLAnchorElement, LinkAnchorProps>(
  (
    { children, asChild, className, ...restProps }: LinkAnchorProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    const context = useLinkAnchorContext(false);
    const mergedRefs = useMergeRefs(forwardedRef, context?.anchorRef);

    const Component = asChild ? Slot : "a";

    return (
      <Component
        ref={mergedRefs}
        {...restProps}
        className={cn("navds-link-anchor", className)}
      >
        {children}
      </Component>
    );
  },
);

/* ---------------------------- LinkAnchor Arrow ---------------------------- */
type LinkAnchorArrowProps = Omit<SVGProps<SVGSVGElement>, "ref">;

const LinkAnchorArrow = forwardRef<SVGSVGElement, LinkAnchorArrowProps>(
  ({ className, ...restProps }: LinkAnchorArrowProps, forwardedRef) => {
    const { cn } = useRenameCSS();

    return (
      <ArrowRightIcon
        ref={forwardedRef}
        aria-hidden
        className={cn("navds-link-anchor__arrow", className)}
        {...restProps}
      />
    );
  },
);

/* -------------------------- LinkAnchor Utilities -------------------------- */
function isTextSelected(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return !!window.getSelection()?.toString();
}

export { LinkAnchor, LinkAnchorArrow, LinkAnchorOverlay };
export type { LinkAnchorArrowProps, LinkAnchorOverlayProps, LinkAnchorProps };
