import React, { forwardRef } from "react";
import type { AsChildProps } from "../../util/types";

type CollapsiblePanelProps = React.HTMLAttributes<HTMLDivElement> &
  AsChildProps;

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
