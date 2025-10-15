import React, { forwardRef } from "react";
import type { AsChildProps } from "../../util/types";
import { useCollapsibleRootContext } from "../root/CollapsibleRoot.context";

type CollapsiblePanelProps = React.HTMLAttributes<HTMLDivElement> &
  AsChildProps;

const CollapsiblePanel = forwardRef<HTMLDivElement, CollapsiblePanelProps>(
  ({ children, ...rest }: CollapsiblePanelProps, forwardedRef) => {
    const { hiddenUntilFound, keepMounted } = useCollapsibleRootContext();

    if (process.env.NODE_ENV !== "production") {
      if (hiddenUntilFound && keepMounted === false) {
        console.warn(
          "The `keepMounted={false}` prop on a Collapsible will be ignored when using `hiddenUntilFound` since it requires the Panel to remain mounted even when closed.",
        );
      }
    }

    return (
      <div ref={forwardedRef} {...rest}>
        {children}
      </div>
    );
  },
);

export { CollapsiblePanel };
export type { CollapsiblePanelProps };
