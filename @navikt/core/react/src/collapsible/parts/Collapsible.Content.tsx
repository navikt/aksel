import React, { forwardRef } from "react";

interface CollapsibleContentProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed: boolean;
}

export const CollapsibleContent = forwardRef<
  HTMLDivElement,
  CollapsibleContentProps
>(({ collapsed, children, ...props }, ref) => {
  return (
    <div ref={ref} {...props} style={{ display: collapsed ? "none" : "block" }}>
      {children}
    </div>
  );
});

export default CollapsibleContent;
