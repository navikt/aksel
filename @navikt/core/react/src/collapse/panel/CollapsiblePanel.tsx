import React, { forwardRef } from "react";

type CollapsiblePanelProps = {
  children: React.ReactNode;
};

const CollapsiblePanel = forwardRef<HTMLDivElement, CollapsiblePanelProps>(
  ({ children, ...rest }: CollapsiblePanelProps, forwardedRef) => {
    return (
      <div ref={forwardedRef} {...rest}>
        {children}
      </div>
    );
  },
);

export { CollapsiblePanel };
export type { CollapsiblePanelProps };
