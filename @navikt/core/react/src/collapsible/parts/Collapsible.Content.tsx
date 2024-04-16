import React, { forwardRef } from "react";
import { Slot } from "../../util/Slot";
import { useClientLayoutEffect, useMergeRefs } from "../../util/hooks";
import { useCollapsibleContext } from "../Collapsible.context";

interface CollapsibleContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * When true, will render element as its child. This merges classes, styles and event handlers.
   * @default false
   */
  asChild?: boolean;
}

export const CollapsibleContent = forwardRef<
  HTMLDivElement,
  CollapsibleContentProps
>(({ children, asChild, ...props }, ref) => {
  const ctx = useCollapsibleContext();

  const Comp = asChild ? Slot : "div";

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const composedRefs = useMergeRefs(ref, wrapperRef);
  const heightRef = React.useRef<number | undefined>(0);
  const height = heightRef.current;
  const widthRef = React.useRef<number | undefined>(0);
  const width = widthRef.current;
  // when opening we want it to immediately open to retrieve dimensions
  // when closing we delay `present` to retrieve dimensions before closing
  const isOpen = ctx.open;
  const isMountAnimationPreventedRef = React.useRef(isOpen);
  const originalStylesRef = React.useRef<Record<string, string>>();

  React.useEffect(() => {
    const rAF = requestAnimationFrame(
      () => (isMountAnimationPreventedRef.current = false),
    );
    return () => cancelAnimationFrame(rAF);
  }, []);

  useClientLayoutEffect(() => {
    const node = wrapperRef.current;
    if (node) {
      originalStylesRef.current = originalStylesRef.current || {
        transitionDuration: node.style.transitionDuration,
        animationName: node.style.animationName,
      };
      // block any animations/transitions so the element renders at its full dimensions
      node.style.transitionDuration = "0s";
      node.style.animationName = "none";

      // get width and height from full dimensions
      const rect = node.getBoundingClientRect();
      heightRef.current = rect.height;
      widthRef.current = rect.width;

      // kick off any animations/transitions that were originally set up if it isn't the initial mount
      if (!isMountAnimationPreventedRef.current) {
        node.style.transitionDuration =
          originalStylesRef.current.transitionDuration;
        node.style.animationName = originalStylesRef.current.animationName;
      }
    }
    /**
     * depends on `context.open` because it will change to `false`
     * when a close is triggered but `present` will be `false` on
     * animation end (so when close finishes). This allows us to
     * retrieve the dimensions *before* closing.
     */
  }, [ctx.open]);

  const Style: React.CSSProperties = {
    "--ac-collapsible-content-height": height ? `${height}px` : undefined,
    "--ac-collapsible-content-width": width ? `${width}px` : undefined,
    ...props.style,
  };

  return (
    <Comp
      ref={composedRefs}
      data-state={ctx.open ? "open" : "closed"}
      hidden={ctx.open}
      {...props}
      style={Style}
    >
      {ctx.open && children}
    </Comp>
  );
});

export default CollapsibleContent;
