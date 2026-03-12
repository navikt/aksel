import React, {
  AnchorHTMLAttributes,
  type ComponentProps,
  HTMLAttributes,
  forwardRef,
  useRef,
} from "react";
import { ArrowRightIcon } from "@navikt/aksel-icons";
import {
  cl,
  composeEventHandlers,
  createStrictContext,
  ownerWindow,
} from "../../helpers";
import { useMergeRefs } from "../../hooks";
import type { AsChildProps } from "../../types";
import { Slot } from "../slot/Slot";

type LinkAnchorOverlayContextProps = {
  anchorRef: React.RefObject<HTMLAnchorElement | null>;
};

const {
  Provider: LinkAnchorContextProvider,
  useContext: useLinkAnchorContext,
} = createStrictContext<LinkAnchorOverlayContextProps>({
  name: "LinkAnchorOverlayContext",
});

type LinkAnchorOverlayProps = HTMLAttributes<HTMLDivElement> & AsChildProps;

/*
 * NB: Clicks on the overlay are captured with onClick. This does not work with middle-mouse-click.
 * We could capture such click with onAuxClick, but last time we tried that,
 * "forwarding" the click with dispatchEvent didn't work properly.
 * - Chrome: Worked if we dispatched a regular click event.
 * - Firefox: Did not work.
 * - Safari: Opened the link in the same tab (tested in BrowserStack).
 * We could use window.open() instead, but this would not run on(Aux)Click-callbacks on the link.
 * We consider this unacceptable since many rely on this for tracking etc.
 */

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
    const anchorRef = useRef<HTMLAnchorElement>(null);

    const Component = asChild ? Slot : "div";

    return (
      <LinkAnchorContextProvider anchorRef={anchorRef}>
        <Component
          ref={forwardedRef}
          {...restProps}
          className={cl("aksel-link-anchor__overlay", className)}
          onClick={composeEventHandlers(onClick, (e) => {
            if (
              e.target === anchorRef.current ||
              isTextSelected(anchorRef.current)
            ) {
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
    const context = useLinkAnchorContext(false);
    const mergedRefs = useMergeRefs(forwardedRef, context?.anchorRef);

    const Component = asChild ? Slot : "a";

    return (
      <Component
        ref={mergedRefs}
        {...restProps}
        className={cl("aksel-link-anchor", className)}
      >
        {children}
      </Component>
    );
  },
);

/* ---------------------------- LinkAnchor Arrow ---------------------------- */
type LinkAnchorArrowProps = Omit<ComponentProps<typeof ArrowRightIcon>, "ref">;

const LinkAnchorArrow = forwardRef<SVGSVGElement, LinkAnchorArrowProps>(
  ({ className, ...restProps }: LinkAnchorArrowProps, forwardedRef) => {
    return (
      <ArrowRightIcon
        ref={forwardedRef}
        aria-hidden
        className={cl("aksel-link-anchor__arrow", className)}
        {...restProps}
      />
    );
  },
);

/* -------------------------- LinkAnchor Utilities -------------------------- */
function isTextSelected(refElement: HTMLAnchorElement | null): boolean {
  return !!ownerWindow(refElement)?.getSelection()?.toString();
}

export { LinkAnchor, LinkAnchorArrow, LinkAnchorOverlay };
export type { LinkAnchorArrowProps, LinkAnchorOverlayProps, LinkAnchorProps };
