"use client";

import { useMemo, useState } from "react";
import ReactDOM from "react-dom";
import { useClientLayoutEffect } from "../../../util";
import { AnimationFrame } from "./useAnimationFrame";

type TransitionStatus = "starting" | "ending" | "idle" | undefined;

/**
 * Creates a lifecycle for transition states between open and closed.
 * This is useful for animating mount and unmount sequences, most used
 * in overlays like modals, popovers and tooltips, but also in accordion,
 * tabs and other components that transition between visible states.
 *
 * The goal is to provide a "mounted"-state that can differ from "open" based on the transition state.
 * This allows components to stay mounted while animating out, even if they are not "open".
 *
 * @param open - Determines if the element is open.
 * @param enableIdleState - Enables the `'idle'` state between `'starting'` and `'ending'`
 */
function useTransitionStatus(
  open: boolean,
  enableIdleState: boolean = false,
  deferEndingState: boolean = false,
) {
  const [mounted, setMounted] = useState(open);
  const [transitionStatus, setTransitionStatus] = useState<TransitionStatus>(
    open && enableIdleState ? "idle" : undefined,
  );

  /*
   * Transition: opening -> element not yet mounted. Mount immediately and
   * mark as "starting" so enter animation classes/styles can apply on first paint.
   */
  if (open && !mounted) {
    setMounted(true);
    setTransitionStatus("starting");
  }

  /**
   * Transition: closing (no defer) -> element is still mounted and we haven't
   * started the exit animation. Move directly to "ending" so exit animation can begin.
   */
  if (!open && mounted && transitionStatus !== "ending" && !deferEndingState) {
    setTransitionStatus("ending");
  }

  /**
   * Transition cleanup: after consumer unmounts (mounted === false) following an
   * "ending" phase, reset status to undefined (fully closed / at rest).
   */
  if (!open && !mounted && transitionStatus === "ending") {
    setTransitionStatus(undefined);
  }

  /*
   * Deferred closing: when `open` becomes false but `deferEndingState` is true we wait
   * one animation frame before switching to "ending". This gives consumers a frame to
   * perform measurements or other synchronous work (e.g. reading layout) before exit
   * classes/styles are applied, helping ensure CSS transitions fire reliably and
   * reducing layout thrash.
   *
   * Example usage: Measure accordion-content height before applying "ending" styles
   * that might set height to 0px. This ensures the browser sees a height change
   * and can animate it, where otherwise it might skip the transition if the height
   * was 0px already when "ending" was applied.
   */
  useClientLayoutEffect(() => {
    if (!open && mounted && transitionStatus !== "ending" && deferEndingState) {
      const frame = AnimationFrame.request(() => {
        setTransitionStatus("ending");
      });

      return () => {
        AnimationFrame.cancel(frame);
      };
    }

    return undefined;
  }, [open, mounted, transitionStatus, deferEndingState]);

  /*
   * Enter stabilization (no idle state): when opened without `enableIdleState`, we
   * keep `transitionStatus === "starting"` for exactly one animation frame so CSS
   * enter animations can trigger. On the next frame we synchronously (flushSync)
   * clear the status to `undefined`, signalling the overlay is fully "open" with
   * no transition label. Using `flushSync` inside the rAF ensures React commits the
   * status change promptly so subsequent work in the same frame observes the stable state.
   */
  useClientLayoutEffect(() => {
    if (!open || enableIdleState) {
      return undefined;
    }

    const frame = AnimationFrame.request(() => {
      ReactDOM.flushSync(() => {
        setTransitionStatus(undefined);
      });
    });

    return () => {
      AnimationFrame.cancel(frame);
    };
  }, [enableIdleState, open]);

  /*
   * Idle transition: when `enableIdleState` is true we (re)enter with "starting"
   * then promote to "idle" on the next frame, providing a stable labeled phase
   * distinct from the initial animation. This allows different styling between
   * the animated entrance and the persisted open state.
   *
   * Example: Accordion content might animate in with "starting", then
   * persist with "idle" to allow different styling of the content when open, like "auto" height to allow for resizing.
   */
  useClientLayoutEffect(() => {
    if (!open || !enableIdleState) {
      return undefined;
    }

    if (open && mounted && transitionStatus !== "idle") {
      setTransitionStatus("starting");
    }

    const frame = AnimationFrame.request(() => {
      setTransitionStatus("idle");
    });

    return () => {
      AnimationFrame.cancel(frame);
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

export { useTransitionStatus };
export type { TransitionStatus };
