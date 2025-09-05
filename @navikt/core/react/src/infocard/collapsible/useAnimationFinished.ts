"use client";

import React from "react";
import ReactDOM from "react-dom";
import { useAnimationFrame } from "./useAnimationFrame";
import { useEventCallback } from "./useEventCallback";

/**
 * Executes a function once all animations have finished on the provided element.
 * @param elementOrRef - The element to watch for animations.
 * @param waitForNextTick - Whether to wait for the next tick before checking for animations.
 */
export function useAnimationsFinished(
  elementOrRef: React.RefObject<HTMLElement | null> | HTMLElement | null,
  waitForNextTick = false,
) {
  const frame = useAnimationFrame();

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
      frame.cancel();

      if (elementOrRef == null) {
        return;
      }

      let element: HTMLElement;
      if ("current" in elementOrRef) {
        if (elementOrRef.current == null) {
          return;
        }

        element = elementOrRef.current;
      } else {
        element = elementOrRef;
      }

      if (
        typeof element.getAnimations !== "function" ||
        globalThis.AKSEL_ANIMATIONS_DISABLED
      ) {
        fnToExecute();
      } else {
        /* console.info(element, element.getAnimations()); */
        frame.request(() => {
          function exec() {
            if (!element) {
              return;
            }

            Promise.allSettled(
              element.getAnimations().map((anim) => anim.finished),
            ).then(() => {
              if (signal?.aborted) {
                return;
              }
              /*
               * Ensures the state change is committed before the browser paints that frame,
               * making timing deterministic.
               */
              ReactDOM.flushSync(fnToExecute);
            });
          }

          /* `open: true` animations need to wait for the next tick to be detected */
          if (waitForNextTick) {
            frame.request(exec);
          } else {
            exec();
          }
        });
      }
    },
  );
}
