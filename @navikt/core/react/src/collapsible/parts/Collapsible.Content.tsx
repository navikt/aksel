import React, { forwardRef } from "react";
import { SlottedElement } from "../../slot/SlottedElement";
import { useCollapsibleContext } from "../Collapsible.context";

export interface CollapsibleContentProps
  extends Omit<
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
>(({ children, asChild, ...rest }, ref) => {
  const ctx = useCollapsibleContext();

  return (
    <SlottedElement
      ref={ref}
      {...rest}
      as="div"
      asChild={asChild}
      data-state={ctx.state}
      hidden={!ctx.open}
      aria-controls={ctx.open ? ctx.triggerId : undefined}
      id={ctx.contentId}
    >
      {ctx.lazy || ctx.open ? children : null}
    </SlottedElement>
  );
});

export default CollapsibleContent;
