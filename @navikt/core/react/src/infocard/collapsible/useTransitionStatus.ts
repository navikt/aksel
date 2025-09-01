"use client";

import { useMemo, useState } from "react";
import ReactDOM from "react-dom";
import { useClientLayoutEffect } from "../../util";
import { AnimationFrame } from "./useAnimationFrame";

type TransitionStatus = "starting" | "ending" | "idle" | undefined;

/**
 * Provides a status string for CSS animations.
 * @param open - a boolean that determines if the element is open.
 * @param enableIdleState - a boolean that enables the `'idle'` state between `'starting'` and `'ending'`
 */
function useTransitionStatus(
  open: boolean,
  enableIdleState: boolean = false,
  deferEndingState: boolean = false,
) {
  const [transitionStatus, setTransitionStatus] = useState<TransitionStatus>(
    open && enableIdleState ? "idle" : undefined,
  );

  const [mounted, setMounted] = useState(open);

  if (open && !mounted) {
    setMounted(true);
    setTransitionStatus("starting");
  }

  if (!open && mounted && transitionStatus !== "ending" && !deferEndingState) {
    setTransitionStatus("ending");
  }

  if (!open && !mounted && transitionStatus === "ending") {
    setTransitionStatus(undefined);
  }

  /**
   * This effect handles the "deferred ending" path.
   * If we're closing (open === false), the content was mounted,
   * we're not already in the "ending" state, and the caller asked to
   * defer, we schedule the transition to "ending" on the next rAF.
   *
   * Why defer?
   * - Ensures the state change happens in the next frame after layout/paint,
   *   letting CSS transitions measure final layout correctly.
   * - Avoids sync state updates during render that could cause layout thrash
   *   or missed transition start conditions.
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

    // No deferred work needed.
    return undefined;
  }, [open, mounted, transitionStatus, deferEndingState]);

  /**
   * This effect clears the temporary "starting" state after opening
   * when the idle state is disabled.
   *
   * What it does:
   * - Schedules clearing `transitionStatus` to `undefined` on the next rAF.
   * - Uses `ReactDOM.flushSync` inside rAF to commit the update synchronously
   *   within that frame.
   *
   * Why schedule to the next frame?
   * - Lets the "starting" state survive one layout/paint so CSS can read initial
   *   values and start transitions reliably.
   * - Avoids synchronous updates during render that could cause layout thrash.
   *
   * Why `flushSync`?
   * - Ensures the state change is committed before the browser paints that frame,
   *   making transition timing deterministic.
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

  /**
   * This effect manages the "idle" state when `enableIdleState` is on.
   *
   * What it does:
   * - If the panel is open and not yet `"idle"`, set `"starting"` immediately.
   * - Schedule switching the status to `"idle"` on the next animation frame.
   *
   * Why defer to the next frame?
   * - Lets the `"starting"` state persist for one layout/paint so CSS can read initial values
   *   and start transitions reliably before settling in the `"idle"` state.
   * - Avoids synchronous updates during render that could cause layout thrash or missed start conditions.
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
