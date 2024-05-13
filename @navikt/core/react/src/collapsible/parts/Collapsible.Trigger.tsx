import React, { forwardRef } from "react";
import { Slot } from "../../util/Slot";
import { composeEventHandlers } from "../../util/composeEventHandlers";
import { useCollapsibleContext } from "../Collapsible.context";

export interface CollapsibleTriggerProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "id" | "aria-controls" | "aria-expanded"
  > {
  /**
   * When true, will render element as its child. This merges classes, styles and event handlers.
   * @default false
   */
  asChild?: boolean;
  /**
   * You may disable aria-expanded if the accessable name of the trigger is changed when toggled, e.g. "Show"/"Hide".
   */
  disableAriaExpanded?: boolean;
}

export const CollapsibleTrigger = forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(({ children, asChild, disableAriaExpanded, onClick, ...rest }, ref) => {
  const ctx = useCollapsibleContext();

  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      type="button"
      data-state={ctx.state}
      onClick={composeEventHandlers(onClick, ctx.onOpenToggle)}
      {...rest}
      id={ctx.triggerId}
      aria-controls={ctx.open ? ctx.contentId : undefined}
      aria-expanded={disableAriaExpanded ? undefined : ctx.open}
    >
      {children}
    </Comp>
  );
});

export default CollapsibleTrigger;
