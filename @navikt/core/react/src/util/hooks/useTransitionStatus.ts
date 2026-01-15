"use client";

import { useMemo, useState } from "react";
import ReactDOM from "react-dom";
import { useClientLayoutEffect } from "./useClientLayoutEffect";

type TransitionStatus = "entering" | "exiting" | "idle" | undefined;

/**
 * Transition status state machine for components that animate between an
 * `open` boolean and actual mount/unmount. Keeps the element mounted while
 * exit animations run and introduces an optional stable `idle` phase.
 *
 * Adapted from MUI Base + Floating UI examples:
 *  - Source: https://github.com/mui/base-ui/blob/6fd69008d83561dbe75ff89acf270f0fac3e0049/packages/react/src/utils/useTransitionStatus.ts
 *  - Originally based on https://github.com/floating-ui/floating-ui/blob/7c33a3d0198a9b523d54ae2c37cedb315a309452/packages/react/src/hooks/useTransition.ts
 *
 * States (transitionStatus):
 *  - "entering"  : just entered (initial frame of enter) OR re-entering to reach "idle".
 *  - "idle"      : stable open (only when `enableIdleState === true`).
 *  - "exiting"   : exit animation is running; element still mounted.
 *  - undefined   : closed (unmounted) OR stable open when idle state is disabled.
 *                   When `enableIdleState` is false we clear the label after
 *                   the first frame so styling can rely purely on `mounted`.
 *
 * Distinction:
 *  - `mounted` tells you whether to render DOM.
 *  - `transitionStatus` tells you which phase-specific classes to apply.
 *
 * Frame separation: state changes that must trigger CSS transitions are
 * scheduled with `requestAnimationFrame` so the browser sees distinct style
 * mutations across frames (avoids missed transitions due to batching).
 *
 * @param open              Controls visibility lifecycle.
 * @param enableIdleState   Insert a persistent "idle" phase after entering.
 * @param deferExitingState  Delay entering the exit phase by one frame to allow
 *                          measurement / layout work before applying exit styles.
 */
function useTransitionStatus(
  open: boolean,
  enableIdleState: boolean = false,
  deferExitingState: boolean = false,
) {
  const [mounted, setMounted] = useState(open);
  const [transitionStatus, setTransitionStatus] = useState<TransitionStatus>(
    open && enableIdleState ? "idle" : undefined,
  );

  /* Opening: mount immediately and label as "entering" for the first frame. */
  if (open && !mounted) {
    setMounted(true);
    setTransitionStatus("entering");
  }

  /* Closing (no defer): begin exit animation right away. */
  if (
    !open &&
    mounted &&
    transitionStatus !== "exiting" &&
    !deferExitingState
  ) {
    setTransitionStatus("exiting");
  }

  /* Cleanup: after unmount post-exit ensure status returns to undefined. */
  if (!open && !mounted && transitionStatus === "exiting") {
    setTransitionStatus(undefined);
  }

  /* Deferred closing: provide one frame to measure / flush layout before exit styles. */
  useClientLayoutEffect(() => {
    if (
      !open &&
      mounted &&
      transitionStatus !== "exiting" &&
      deferExitingState
    ) {
      const frame = requestAnimationFrame(() => {
        setTransitionStatus("exiting");
      });

      return () => {
        cancelAnimationFrame(frame);
      };
    }

    return undefined;
  }, [open, mounted, transitionStatus, deferExitingState]);

  /* Enter (no idle): hold "entering" for one frame, then clear label (stable open). */
  useClientLayoutEffect(() => {
    if (!open || enableIdleState) {
      return undefined;
    }

    const frame = requestAnimationFrame(() => {
      ReactDOM.flushSync(() => {
        setTransitionStatus(undefined);
      });
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [enableIdleState, open]);

  useClientLayoutEffect(() => {
    if (!open || !enableIdleState) {
      return undefined;
    }

    /*
     * We can enter this state by re-opening before exiting-state was finished
     * (open → close → open in quick succession).
     */
    if (open && mounted && transitionStatus !== "idle") {
      setTransitionStatus("entering");
    }

    /**
     * Next frame, after "entering", switch to persistent "idle" state.
     * By delaying to the next frame we ensure any "entering" styles are
     * applied and the transition can run.
     */
    const frame = requestAnimationFrame(() => {
      setTransitionStatus("idle");
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [enableIdleState, open, mounted, setTransitionStatus, transitionStatus]);

  return useMemo(
    () => ({
      mounted,
      setMounted,
      transitionStatus,
    }),
    [mounted, transitionStatus],
  );
}

/**
 * Creates a single data attribute with optional suffix
 * (e.g., data-entering-style, data-exiting-style, data-idle-style)
 */
function createTransitionStatusAttribute(value?: string): Record<string, true> {
  if (!value) {
    return {};
  }

  return { [`data-${value}-style`]: true };
}

export { useTransitionStatus, createTransitionStatusAttribute };
export type { TransitionStatus };
