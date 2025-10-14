import React, { forwardRef } from "react";

type CollapsibleTriggerProps = {
  children: React.ReactNode;
};

const CollapsibleTrigger = forwardRef<HTMLDivElement, CollapsibleTriggerProps>(
  ({ children, ...rest }: CollapsibleTriggerProps, forwardedRef) => {
    return (
      <div ref={forwardedRef} {...rest}>
        {children}
      </div>
    );
  },
);

export { CollapsibleTrigger };
export type { CollapsibleTriggerProps };
