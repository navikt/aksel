import { useEffect, useRef } from "react";
import { useCallbackRef } from "../../../../util/hooks";
import { CustomPointerDownEvent } from "../../DismissableLayer.types";
import { CUSTOM_EVENTS, dispatchCustomEvent } from "./dispatchCustomEvent";

/**
 * Listens for `pointerdown` outside a react subtree. We use `pointerdown` rather than `pointerup`
 * to mimic layer dismissing behaviour present in OS.
 * Returns props to pass to the node we want to check for outside events.
 */
export function usePointerDownOutside(
  callback?: (event: CustomPointerDownEvent) => void,
  ownerDocument: Document = globalThis?.document,
) {
  const handlePointerDownOutside = useCallbackRef(callback) as EventListener;
  const isPointerInsideReactTreeRef = useRef(false);
  const handleClickRef = useRef<typeof handlePointerDownOutside>(() => {});

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      function dispatchPointerEvent() {
        dispatchCustomEvent(
          CUSTOM_EVENTS.POINTER_DOWN_OUTSIDE,
          handlePointerDownOutside,
          { originalEvent: event },
          { discrete: true },
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
        // See: https://github.com/radix-ui/primitives/issues/2171
        ownerDocument.removeEventListener("click", handleClickRef.current);
      }
      isPointerInsideReactTreeRef.current = false;
    };
    /**
     * if this hook executes in a component that mounts via a `pointerdown` event, the event
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
      ownerDocument.addEventListener("pointerdown", handlePointerDown);
    }, 0);
    return () => {
      window.clearTimeout(timerId);
      ownerDocument.removeEventListener("pointerdown", handlePointerDown);
      ownerDocument.removeEventListener("click", handleClickRef.current);
    };
  }, [ownerDocument, handlePointerDownOutside]);

  return {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => (isPointerInsideReactTreeRef.current = true),
  };
}
