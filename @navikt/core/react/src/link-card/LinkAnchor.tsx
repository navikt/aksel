import React, {
  AnchorHTMLAttributes,
  HTMLAttributes,
  forwardRef,
  useCallback,
  useRef,
} from "react";
import { Slot } from "../slot/Slot";
import { useRenameCSS } from "../theme/Theme";
import { createContext } from "../util/create-context";
import { useMergeRefs } from "../util/hooks";

type LinkAnchorOverlayContextProps = {
  anchorRef: React.RefObject<HTMLAnchorElement>;
};

const [LinkAnchorContextProvider, useLinkAnchorContext] =
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
      <LinkAnchorContextProvider anchorRef={anchorRef}>
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
      </LinkAnchorContextProvider>
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

    const context = useLinkAnchorContext(false);
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

export { LinkAnchorOverlay, LinkAnchor };
export type { LinkAnchorOverlayProps, LinkAnchorProps };
