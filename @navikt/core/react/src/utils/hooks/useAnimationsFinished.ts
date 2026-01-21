"use client";

import React, { useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import { resolveRef } from "../helpers";
import { useEventCallback } from "./useEventCallback";

/**
 * Returns a stable function that, when invoked, waits for all current CSS/Web Animations
 * on a target element (and its subtree) to finish before executing a callback.
 *
 * Why:
 *  - Coordinate logic (unmount, focus restore, measuring) after exit / enter animations.
 *  - Avoid `animationend` event bookkeeping across multiple animations / nested elements.
 *  - Batch detection using `requestAnimationFrame` so freshly-applied animations are discoverable.
 *
 * Mechanics:
 *  1. Resolves the concrete `HTMLElement` (direct element or from ref) – early no-op if missing.
 *  2. If `getAnimations` is unsupported or animations are globally disabled (`AKSEL_NO_EXIT_ANIMATIONS`),
 *     runs the callback immediately.
 *  3. Schedules a frame so style/animation changes applied this render are committed.
 *  4. Optionally schedules an additional frame (`waitForNextTick=true`) to catch animations that
 *     start only after layout (e.g. when an `open` class triggers the animation).
 *  5. Captures all current animations, waits on their `.finished` promises (using `Promise.allSettled`
 *     so rejections don't block), then `flushSync` executes the callback (ensures React state updates
 *     inside run before the browser paints the next frame).
 *  6. If an `AbortSignal` aborts while waiting, it silently cancels execution.
 *
 * @param elementOrRef HTMLElement or ref to observe.
 * @param waitForNextTick If true, waits an extra frame to ensure enter animations are detectable.
 * @returns Stable function (identity preserved) accepting (fn, abortSignal?).
 */
export function useAnimationsFinished(
  elementOrRef: React.RefObject<HTMLElement | null> | HTMLElement | null,
  waitForNextTick = false,
) {
  const rootFrameRef = React.useRef<number | null>(null);
  const nestedFrameRef = React.useRef<number | null>(null);

  const cancelScheduled = useCallback(() => {
    for (const ref of [rootFrameRef, nestedFrameRef]) {
      if (ref.current !== null) {
        cancelAnimationFrame(ref.current);
        ref.current = null;
      }
    }
  }, []);

  /* Unmount cleanup */
  useEffect(() => {
    return () => cancelScheduled();
  }, [cancelScheduled]);

  return useEventCallback(
    (
      /**
       * A function to execute once all animations have finished.
       */
      fnToExecute: () => void,
      /**
       * An optional [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that
       * can be used to abort `fnToExecute` before all the animations have finished.
       * @default null
       */
      signal: AbortSignal | null = null,
    ) => {
      // Cancel any in-flight scheduling from a previous invocation (next-frame debounce semantics)
      cancelScheduled();

      const element = resolveRef(elementOrRef);

      if (element == null) {
        return;
      }

      // Fast path: no Web Animations API support OR animations globally disabled.
      if (
        typeof element.getAnimations !== "function" ||
        // Flag hook for test envs.
        (globalThis as any).AKSEL_NO_EXIT_ANIMATIONS
      ) {
        fnToExecute();
        return;
      }

      rootFrameRef.current = requestAnimationFrame(() => {
        function exec() {
          if (!element) {
            return;
          }
          // Collect animations present at this moment; we don't continuously observe
          // if new animations start after these settle, caller should invoke again.
          Promise.allSettled(
            element.getAnimations().map((anim) => anim.finished),
          ).then(() => {
            if (signal?.aborted) {
              return;
            }
            // Ensure any state updates inside the callback are flushed synchronously,
            // guaranteeing that dependent logic observes the current
            // tree rather than a stale in-progress update.
            ReactDOM.flushSync(fnToExecute);
          });
        }

        // Some animations (e.g. triggered by a class applied this same frame) only
        // become observable after an extra frame; opt-in via flag.
        if (waitForNextTick) {
          nestedFrameRef.current = requestAnimationFrame(exec);
        } else {
          exec();
        }
      });
    },
  );
}
