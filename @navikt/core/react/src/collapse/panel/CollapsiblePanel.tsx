import React, { forwardRef } from "react";
import { useOpenChangeAnimationComplete } from "../../overlays/overlay/hooks/useOpenChangeAnimationComplete";
import { useClientLayoutEffect } from "../../util";
import type { AsChildProps } from "../../util/types";
import { useCollapsibleRootContext } from "../root/CollapsibleRoot.context";
import { useCollapsiblePanel } from "./useCollapsiblePanel";

type CollapsiblePanelProps = React.HTMLAttributes<HTMLDivElement> &
  AsChildProps;

const CollapsiblePanel = forwardRef<HTMLDivElement, CollapsiblePanelProps>(
  (
    { children, id: idProp, style: styleProp, ...rest }: CollapsiblePanelProps,
    forwardedRef,
  ) => {
    const {
      hiddenUntilFound,
      keepMounted,
      setPanelIdState,
      panelId,
      open,
      triggerId,
      transitionStatus,
      panelRef,
      setDimensions,
      width,
      height,
      mounted,
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

    /* TODO: We need to handle hidden as a special case */
    const { hidden, ref } = useCollapsiblePanel({
      externalRef: forwardedRef,
    });

    useOpenChangeAnimationComplete({
      open: open && transitionStatus === "idle",
      ref: panelRef,
      onComplete() {
        if (!open) {
          return;
        }

        setDimensions({ height: undefined, width: undefined });
      },
    });

    const transitionAttrbutes =
      transitionStatus && transitionStatus !== "idle"
        ? { [`data-${transitionStatus}-style`]: true }
        : {};

    const style: React.CSSProperties = {
      ...styleProp,
      "--__axc-collapsible-panel-height":
        height === undefined ? "auto" : `${height}px`,
      "--__axc-collapsible-panel-width":
        width === undefined ? "auto" : `${width}px`,
    };

    const shouldRender =
      keepMounted || hiddenUntilFound || (!keepMounted && mounted);

    if (!shouldRender) {
      return null;
    }

    return (
      <div
        ref={ref}
        {...rest}
        id={panelId}
        aria-controls={open ? triggerId : undefined}
        style={style}
        hidden={hidden}
        data-state={open ? "open" : "closed"}
        {...transitionAttrbutes}
      >
        {children}
      </div>
    );
  },
);

export { CollapsiblePanel };
export type { CollapsiblePanelProps };
