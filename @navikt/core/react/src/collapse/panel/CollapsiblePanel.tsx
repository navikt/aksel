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
      collapsedHeight,
      visible,
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
        ? { [`data-${transitionStatus}-style`]: "" }
        : {};

    const style: React.CSSProperties = {
      ...styleProp,
      ["--panel-height" as any]:
        height === undefined
          ? "auto"
          : `${Math.max(height, collapsedHeight ?? 0)}px`,
      ["--panel-width" as any]: width === undefined ? "auto" : `${width}px`,
      ["--panel-collapsed-height" as any]:
        collapsedHeight === undefined ? undefined : `${collapsedHeight}px`,
      ...(visible
        ? {}
        : { minHeight: collapsedHeight, maxHeight: collapsedHeight }),
      contentVisibility:
        hiddenUntilFound && collapsedHeight
          ? "visible"
          : styleProp?.contentVisibility,

      /* Needed for entry/exit transition */
      height:
        transitionStatus === "exiting" || transitionStatus === "entering"
          ? `${collapsedHeight ?? 0}px`
          : styleProp?.height,
    };

    const shouldRender =
      keepMounted ||
      hiddenUntilFound ||
      (!keepMounted && mounted) ||
      collapsedHeight !== undefined;

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
