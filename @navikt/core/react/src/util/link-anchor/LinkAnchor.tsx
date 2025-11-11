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
import { ownerWindow } from "../owner";
import { AsChildProps } from "../types";

type LinkAnchorOverlayContextProps = {
  anchorRef: React.RefObject<HTMLAnchorElement | null>;
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

    const handleClick = (
      originalEvent: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
      if (
        originalEvent.target === anchorRef.current ||
        isTextSelected(anchorRef.current)
      ) {
        return;
      }

      const mouseEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
        ctrlKey: originalEvent.ctrlKey,
        shiftKey: originalEvent.shiftKey,
        altKey: originalEvent.altKey,
        metaKey: originalEvent.metaKey,
        button: originalEvent.button,
        screenX: originalEvent.screenX,
        screenY: originalEvent.screenY,
        clientX: originalEvent.clientX,
        clientY: originalEvent.clientY,
      });

      anchorRef.current?.dispatchEvent(mouseEvent);
    };

    return (
      <LinkAnchorContextProvider anchorRef={anchorRef}>
        <Component
          ref={forwardedRef}
          {...restProps}
          className={cn("navds-link-anchor__overlay", className)}
          // eslint-disable-next-line react-hooks/refs
          onClick={composeEventHandlers(onClick, handleClick)}
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
function isTextSelected(refElement: HTMLAnchorElement | null): boolean {
  return !!ownerWindow(refElement)?.getSelection()?.toString();
}

export { LinkAnchor, LinkAnchorArrow, LinkAnchorOverlay };
export type { LinkAnchorArrowProps, LinkAnchorOverlayProps, LinkAnchorProps };
