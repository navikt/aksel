import { useEffect, useRef } from "react";
import { useCallbackRef } from "../../../util/hooks";
import {
  CUSTOM_EVENTS,
  CustomPointerDownEvent,
  dispatchCustomEvent,
} from "./dispatchCustomEvent";

/**
 * Listens for `pointerdown` outside a react subtree. We use `pointerdown` rather than `pointerup`
 * to mimic layer dismissing behaviour present in OS.
 * Returns props to pass to the node we want to check for outside events.
 * By checking `isPointerInsideReactTreeRef` we can determine if the event happened outside the subtree of the node, saving some element-comparisons.
 */
export function usePointerUpOutside(
  callback?: (event: CustomPointerDownEvent) => void,
  ownerDocument: Document = globalThis?.document,
) {
  // Keep callback ref stable
  const handlePointerUpOutside = useCallbackRef(callback) as EventListener;
  // Tracks if the pointer interaction started inside the React subtree.
  const isPointerInsideReactTreeRef = useRef(false);

  useEffect(() => {
    const handlePointerUp = (event: PointerEvent) => {
      /**
       * The `DismisableLayer`-API is based on the ability to stop events from propagating and in the end calling `onDismiss`
       * if `usePointerUpOutside` runs `event.preventDefault()`.
       *
       * Although `pointerup` is already a cancelable event, we still dispatch a custom event (discrete)
       * to keep parity with focus outside handling and ensure ordering.
       *
       * Since pointer events are `discrete` in React we rely on the same custom dispatch strategy.
       */
      if (event.target && !isPointerInsideReactTreeRef.current) {
        dispatchCustomEvent(
          // Reuse constant to avoid wider refactor; consider introducing POINTER_UP_OUTSIDE later.
          CUSTOM_EVENTS.POINTER_UP_OUTSIDE,
          handlePointerUpOutside,
          { originalEvent: event },
          { discrete: true },
        );
      }
      // Reset for next interaction.
      isPointerInsideReactTreeRef.current = false;
    };

    /**
     * If this hook executes in a component that mounts via a `pointerdown` event, the event
     * would bubble up to the document and trigger a `pointerDownOutside` event. We avoid
     * this by delaying the event listener registration on the document.
     * This is not React specific, but rather how the DOM works, ie:
     * ```
     * button.addEventListener('pointerdown', () => {
     *   console.log('I will log');
     *   document.addEventListener('pointerdown', () => {
     *     console.log('I will also log');
     *   })
     * });
     */
    const timerId = window.setTimeout(() => {
      ownerDocument.addEventListener("pointerup", handlePointerUp);
    }, 0);

    return () => {
      window.clearTimeout(timerId);
      ownerDocument.removeEventListener("pointerup", handlePointerUp);
    };
  }, [ownerDocument, handlePointerUpOutside]);

  /**
   * Ensures we check React component tree (not just DOM tree)
   * This makes sure that if you start a pointer interaction inside the React tree (I.E Modal),
   * we don't trigger the outside event on pointer up outside if its move away from Modal.
   */
  return {
    onPointerDownCapture: () => {
      isPointerInsideReactTreeRef.current = true;
    },
    onPointerUpCapture: () => {
      isPointerInsideReactTreeRef.current = true;
    },
  };
}
