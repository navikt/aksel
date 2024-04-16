import React, { forwardRef } from "react";

interface CollapsibleTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed: boolean;
}

export const CollapsibleTrigger = forwardRef<
  HTMLDivElement,
  CollapsibleTriggerProps
>(({ collapsed, children, ...props }, ref) => {
  return (
    <div ref={ref} {...props} style={{ display: collapsed ? "none" : "block" }}>
      {children}
    </div>
  );
});

export default CollapsibleTrigger;
