import React, { forwardRef } from "react";
import { useClientLayoutEffect } from "../../util";
import type { AsChildProps } from "../../util/types";
import { useCollapsibleRootContext } from "../root/CollapsibleRoot.context";

type CollapsiblePanelProps = React.HTMLAttributes<HTMLDivElement> &
  AsChildProps;

const CollapsiblePanel = forwardRef<HTMLDivElement, CollapsiblePanelProps>(
  ({ children, id: idProp, ...rest }: CollapsiblePanelProps, forwardedRef) => {
    const {
      hiddenUntilFound,
      keepMounted,
      setPanelIdState,
      panelId,
      open,
      triggerId,
    } = useCollapsibleRootContext();

    if (process.env.NODE_ENV !== "production") {
      if (hiddenUntilFound && keepMounted === false) {
        console.warn(
          "The `keepMounted={false}` prop on a Collapsible will be ignored when using `hiddenUntilFound` since it requires the Panel to remain mounted even when closed.",
        );
      }
    }

    useClientLayoutEffect(() => {
      if (idProp) {
        setPanelIdState(idProp);
        return () => {
          setPanelIdState(undefined);
        };
      }
      return undefined;
    }, [idProp]);

    return (
      <div
        ref={forwardedRef}
        {...rest}
        id={panelId}
        aria-controls={open ? triggerId : undefined}
      >
        {children}
      </div>
    );
  },
);

export { CollapsiblePanel };
export type { CollapsiblePanelProps };
