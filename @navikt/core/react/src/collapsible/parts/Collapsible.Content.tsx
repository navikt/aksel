import React, { forwardRef } from "react";
import { Slot } from "../../util/Slot";
import { useCollapsibleContext } from "../Collapsible.context";

export interface CollapsibleContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
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

  return (
    <Comp
      ref={ref}
      data-state={ctx.state}
      hidden={!ctx.open}
      id={ctx.contentId}
      {...props}
    >
      {ctx.lazy || ctx.open ? children : null}
    </Comp>
  );
});

export default CollapsibleContent;
