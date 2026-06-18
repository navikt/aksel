import React, { forwardRef, useEffect, useRef } from "react";
import { Slot } from "../../utils/components/slot/Slot";
import { useMergeRefs } from "../../utils/hooks";
import { useCollapsibleContext } from "../root/CollapsibleRoot.context";

export interface CollapsibleContentProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "hidden" | "aria-controls" | "id"
> {
  /**
   * When true, will render element as its child. This merges classes, styles and event handlers.
   * @default false
   */
  asChild?: boolean;
}

export const CollapsibleContent = forwardRef<
  HTMLDivElement,
  CollapsibleContentProps
>(({ children, asChild, ...rest }, forwardedRef) => {
  const ctx = useCollapsibleContext();
  const { closedBehavior, open, onOpenToggle } = ctx;
  const localRef = useRef<HTMLDivElement>(null);
  const ref = useMergeRefs(forwardedRef, localRef);
  const Comp = asChild ? Slot : "div";

  useEffect(() => {
    if (
      !localRef.current ||
      open ||
      !("onbeforematch" in HTMLElement.prototype)
    ) {
      return;
    }
    const element = localRef.current;

    if (closedBehavior !== "hiddenUntilFound") {
      // Just in case closedBehavior changes from "hiddenUntilFound" to something else while closed
      if (element.hidden === "until-found") {
        element.hidden = true;
      }
      return;
    }

    element.hidden = "until-found";
    element.addEventListener("beforematch", onOpenToggle);
    return () => element.removeEventListener("beforematch", onOpenToggle);
  }, [closedBehavior, open, onOpenToggle]);

  return (
    <Comp
      ref={ref}
      {...rest}
      data-state={ctx.state}
      hidden={!ctx.open}
      aria-controls={ctx.open ? ctx.triggerId : undefined}
      id={ctx.contentId}
    >
      {ctx.closedBehavior === "unmount" && !ctx.open ? null : children}
    </Comp>
  );
});

export default CollapsibleContent;
