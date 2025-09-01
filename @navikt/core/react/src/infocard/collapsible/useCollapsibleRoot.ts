"use client";

import React, { useMemo } from "react";
import { useClientLayoutEffect, useId } from "../../util";
import { useControllableState } from "../../util/hooks/useControllableState";
import { useAnimationsFinished } from "./useAnimationFinished";
import { useEventCallback } from "./useEventCallback";
import { useTransitionStatus } from "./useTransitionStatus";

type AnimationType = "css-transition" | "css-animation" | "none" | null;
/* TODO: https://github.com/mui/base-ui/blob/master/packages/react/src/utils/useOpenChangeComplete.tsx#L10 */
/* TODO: https://github.com/mui/base-ui/blob/3f743cafd37e75526bbc1f2323369d6547f12eaa/packages/react/src/collapsible/panel/useCollapsiblePanel.ts#L30 */

interface Dimensions {
  height: number | undefined;
  width: number | undefined;
}

interface UseCollapsibleRootProps {
  /**
   * Whether the collapsible panel is currently open and controlled.
   */
  open?: boolean;
  /**
   * Whether the collapsible panel is initially open. Assumes uncontrolled behavior.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Event handler called when the panel is opened or closed.
   */
  onOpenChange: (open: boolean) => void;
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled: boolean;
}

function useCollapsibleRoot(input: UseCollapsibleRootProps) {
  const {
    open: openParam,
    defaultOpen = false,
    onOpenChange,
    disabled,
  } = input;

  const isControlled = openParam !== undefined;

  const [open, setOpen] = useControllableState({
    value: openParam,
    defaultValue: defaultOpen,
    /* onChange: onOpenChange, */
  });

  const { mounted, setMounted, transitionStatus } = useTransitionStatus(
    open,
    true,
    true,
  );

  const [visible, setVisible] = React.useState(open);

  const [{ height, width }, setDimensions] = React.useState<Dimensions>({
    height: undefined,
    width: undefined,
  });

  const defaultPanelId = useId();

  const [panelIdState, setPanelIdState] = React.useState<string | undefined>();
  const panelId = panelIdState ?? defaultPanelId;

  const [hiddenUntilFound, setHiddenUntilFound] = React.useState(false);
  const [keepMounted, setKeepMounted] = React.useState(false);

  const abortControllerRef = React.useRef<AbortController | null>(null);
  const animationTypeRef = React.useRef<AnimationType>(null);
  const transitionDimensionRef = React.useRef<"width" | "height" | null>(null);
  const panelRef: React.RefObject<HTMLElement | null> = React.useRef(null);

  const runOnceAnimationsFinish = useAnimationsFinished(panelRef, false);

  const handleTrigger = useEventCallback(() => {
    const nextOpen = !open;

    const panel = panelRef.current;

    if (animationTypeRef.current === "css-animation" && panel != null) {
      panel.style.removeProperty("animation-name");
    }

    if (!hiddenUntilFound && !keepMounted) {
      if (
        animationTypeRef.current != null &&
        animationTypeRef.current !== "css-animation"
      ) {
        if (!mounted && nextOpen) {
          setMounted(true);
        }
      }

      if (animationTypeRef.current === "css-animation") {
        if (!visible && nextOpen) {
          setVisible(true);
        }
        if (!mounted && nextOpen) {
          setMounted(true);
        }
      }
    }

    setOpen(nextOpen);
    onOpenChange(nextOpen);

    if (animationTypeRef.current === "none") {
      if (mounted && !nextOpen) {
        setMounted(false);
      }
    }
  });

  useClientLayoutEffect(() => {
    /**
     * Unmount immediately when closing in controlled mode and keepMounted={false}
     * and no CSS animations or transitions are applied
     */
    if (
      isControlled &&
      animationTypeRef.current === "none" &&
      !keepMounted &&
      !open
    ) {
      setMounted(false);
    }
  }, [isControlled, keepMounted, open, openParam, setMounted]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  return useMemo(
    () => ({
      abortControllerRef,
      animationTypeRef,
      disabled,
      handleTrigger,
      height,
      mounted,
      open,
      panelId,
      panelRef,
      runOnceAnimationsFinish,
      setDimensions,
      setHiddenUntilFound,
      setKeepMounted,
      setMounted,
      setOpen,
      setPanelIdState,
      setVisible,
      transitionDimensionRef,
      transitionStatus,
      visible,
      width,
    }),
    [
      abortControllerRef,
      animationTypeRef,
      disabled,
      handleTrigger,
      height,
      mounted,
      open,
      panelId,
      panelRef,
      runOnceAnimationsFinish,
      setDimensions,
      setHiddenUntilFound,
      setKeepMounted,
      setMounted,
      setOpen,
      setVisible,
      transitionDimensionRef,
      transitionStatus,
      visible,
      width,
    ],
  );
}

export { useCollapsibleRoot };
