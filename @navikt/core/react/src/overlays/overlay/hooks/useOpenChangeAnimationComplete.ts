"use client";

import React, { useEffect } from "react";
import { useEventCallback } from "../../../util/hooks/useEventCallback";
import { useLatestRef } from "../../../util/hooks/useLatestRef";
import { useAnimationsFinished } from "./useAnimationsFinished";

interface useOpenChangeAnimationCompleteParameters {
  /**
   * Enable / disable the effect. Disabled => no animation tracking / callback.
   * @default true
   */
  enabled?: boolean;
  /**
   * Current open state (e.g. popover open). When this flips we wait for any
   * associated CSS/Web animations on `ref` to finish before firing `onComplete`.
   */
  open?: boolean;
  /**
   * Element whose animations/transition we observe. Should be stable while the
   * open/close animation runs (typically the root animated node).
   */
  ref?: React.RefObject<HTMLElement | null>;
  /**
   * Called exactly once per open-change cycle after animations finish OR
   * immediately if animations are disabled / unsupported.
   */
  onComplete: () => void;
}

/**
 * Waits for the element's current Web Animations / CSS transitions to finish after an
 * `open` state change, then invokes `onComplete`. Guards against race conditions by
 * comparing the `open` value captured at scheduling time with the latest `open` via ref;
 * if they differ (state flipped again mid‑animation) the callback is skipped.
 */
export function useOpenChangeAnimationComplete(
  parameters: useOpenChangeAnimationCompleteParameters,
) {
  const {
    enabled = true,
    open,
    ref = null,
    onComplete: onCompleteParam,
  } = parameters;

  const openRef = useLatestRef(open);
  const onComplete = useEventCallback(onCompleteParam);
  const runOnceAnimationsFinish = useAnimationsFinished(ref, open);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    /*
     * Schedule completion once the *current* set of animations settle. If during
     * that wait `open` toggles again, skip to avoid firing for an outdated cycle.
     */
    runOnceAnimationsFinish(() => {
      if (open === openRef.current) {
        onComplete();
      }
    });
  }, [enabled, open, onComplete, runOnceAnimationsFinish, openRef]);
}
