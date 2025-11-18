import { useEffect, useRef } from "react";
import { useCallbackRef } from "../../../util/hooks";
import {
  CUSTOM_EVENTS,
  CustomPointerDownEvent,
  dispatchCustomEvent,
} from "./dispatchCustomEvent";

/**
 * Listens for `pointerup` outside a react subtree.
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
       * if `usePointerUpOutside`-callback does not run `event.preventDefault()`.
       *
       * Although `pointerup` is already a cancelable event, we still dispatch a custom event (discrete)
       * to keep parity with focus outside handling and ensure ordering.
       *
       * Since pointer events are `discrete` in React we rely on the same custom dispatch strategy.
       */
      if (event.target && !isPointerInsideReactTreeRef.current) {
        dispatchCustomEvent(
          CUSTOM_EVENTS.POINTER_UP_OUTSIDE,
          handlePointerUpOutside,
          { originalEvent: event },
          { discrete: true },
        );
      }
      /* Reset for next interaction. */
      isPointerInsideReactTreeRef.current = false;
    };

    /* Mostly relevant if user moved touch after touch-start */
    const handlePointerCancel = () => {
      /* Reset state if interaction is cancelled */
      isPointerInsideReactTreeRef.current = false;
    };

    /**
     * If this hook executes in a component that mounts via a `pointerup` event, the event
     * would bubble up to the document and trigger a `pointerUpOutside` event. We avoid
     * this by delaying the event listener registration on the document.
     * This is not React specific, but rather how the DOM works, ie:
     * ```
     * button.addEventListener('pointerup', () => {
     *   console.log('I will log');
     *   document.addEventListener('pointerup', () => {
     *     console.log('I will also log');
     *   })
     * });
     */
    const timerId = window.setTimeout(() => {
      ownerDocument.addEventListener("pointerup", handlePointerUp);
      ownerDocument.addEventListener("pointercancel", handlePointerCancel);
    }, 0);

    return () => {
      window.clearTimeout(timerId);
      ownerDocument.removeEventListener("pointerup", handlePointerUp);
      ownerDocument.removeEventListener("pointercancel", handlePointerCancel);
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
