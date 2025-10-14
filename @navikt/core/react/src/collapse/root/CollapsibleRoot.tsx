import React, { forwardRef } from "react";

type CollapsibleProps = {
  children: React.ReactNode;
};

const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ children, ...rest }: CollapsibleProps, forwardedRef) => {
    return (
      <div ref={forwardedRef} {...rest}>
        {children}
      </div>
    );
  },
);

export { Collapsible };
export type { CollapsibleProps };
