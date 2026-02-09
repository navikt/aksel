import { useEffect, useRef } from "react";
import { useEventCallback, useTimeout } from "../../../hooks";
import {
  CUSTOM_EVENTS,
  CustomPointerEvent,
  dispatchCustomEvent,
} from "./dispatchCustomEvent";

/**
 * Listens for `pointerdown` outside a react subtree. We use `pointerdown` rather than `pointerup`
 * to mimic layer dismissing behaviour present in OS.
 * Returns props to pass to the node we want to check for outside events.
 * By checking `isPointerInsideReactTreeRef` we can determine if the event happened outside the subtree of the node, saving some element-comparisons.
 */
export function usePointerDownOutside(
  callback?: (event: CustomPointerEvent) => void,
  ownerDocument: Document = globalThis?.document,
  enabled: boolean = true,
) {
  const handlePointerDownOutside = useEventCallback(callback) as EventListener;
  const isPointerInsideReactTreeRef = useRef(false);
  const handleClickRef = useRef<typeof handlePointerDownOutside>(() => {});
  const timeout = useTimeout();

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      /**
       * The `DismisableLayer`-API is based on the ability to stop events from propagating and in the end calling `onDismiss`
       * if `usePointerDownOutside` runs `event.preventDefault()`.
       *
       * Altrough `pointerdown` is already a cancelable event,
       * to to make sure the batching of events works corretly with `focusIn` in `useFocusOutside`,
       * we still use a custom event like in `useFocusOutside`.
       */
      function dispatchPointerEvent() {
        dispatchCustomEvent(
          CUSTOM_EVENTS.POINTER_DOWN_OUTSIDE,
          handlePointerDownOutside,
          { originalEvent: event },
        );
      }

      if (event.target && !isPointerInsideReactTreeRef.current) {
        /**
         * On touch devices, we delay reactivating pointer-events to account for the browser's delay in executing events after touch ends.
         * This also handles cancellations when no click event is raised due to scrolling or long-pressing.
         * We continuously remove the previous listener as we can't be sure it was raised and cleaned up.
         */
        if (event.pointerType === "touch") {
          ownerDocument.removeEventListener("click", handleClickRef.current);
          handleClickRef.current = dispatchPointerEvent;
          ownerDocument.addEventListener("click", handleClickRef.current, {
            once: true,
          });
        } else {
          dispatchPointerEvent();
        }
      } else {
        // We need to remove the event listener in case the outside click has been canceled.
        ownerDocument.removeEventListener("click", handleClickRef.current);
      }
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
    timeout.start(0, () => {
      ownerDocument.addEventListener("pointerdown", handlePointerDown);
    });

    return () => {
      ownerDocument.removeEventListener("pointerdown", handlePointerDown);
      ownerDocument.removeEventListener("click", handleClickRef.current);
    };
  }, [ownerDocument, handlePointerDownOutside, timeout, enabled]);

  return {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => {
      isPointerInsideReactTreeRef.current = true;
    },
  };
}
