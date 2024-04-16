import React, { forwardRef } from "react";

interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed: boolean;
}

export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ collapsed, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        style={{ display: collapsed ? "none" : "block" }}
      >
        {children}
      </div>
    );
  },
);

export default Collapsible;
