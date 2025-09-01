"use client";

import React, { useEffect } from "react";
import { useAnimationsFinished } from "./useAnimationFinished";
import { useEventCallback } from "./useEventCallback";
import { useLatestRef } from "./useLatestRef";

type UseOpenChangeCompleteType = {
  /**
   * Whether the hook is enabled.
   * @default true
   */
  enabled?: boolean;
  /**
   * Whether the element is open.
   */
  open?: boolean;
  /**
   * Ref to the element being closed.
   */
  ref: React.RefObject<HTMLElement | null>;
  /**
   * Function to call when the animation completes (or there is no animation).
   */
  onComplete: () => void;
};

/**
 * Calls the provided function when the CSS open/close animation or transition completes.
 */
export function useOpenChangeComplete(input: UseOpenChangeCompleteType) {
  const { enabled = true, open, ref, onComplete: onCompleteParam } = input;

  const openRef = useLatestRef(open);
  const onComplete = useEventCallback(onCompleteParam);
  const runOnceAnimationsFinish = useAnimationsFinished(ref, open);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    runOnceAnimationsFinish(() => {
      if (open === openRef.current) {
        onComplete();
      }
    });
  }, [enabled, open, onComplete, runOnceAnimationsFinish, openRef]);
}
