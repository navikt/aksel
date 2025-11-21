import { useEffect, useRef } from "react";
import { useCallbackRef } from "../../../util/hooks";
import {
  CUSTOM_EVENTS,
  CustomFocusEvent,
  dispatchCustomEvent,
} from "./dispatchCustomEvent";

/**
 * Tracks focus outside a React subtree. Returns props for the subtree root.
 */
export function useFocusOutside(
  callback?: (event: CustomFocusEvent) => void,
  ownerDocument: Document = globalThis?.document,
  enabled: boolean = true,
) {
  const handleFocusOutside = useCallbackRef(callback) as EventListener;
  const isFocusInsideReactTreeRef = useRef(false);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleFocus = (event: FocusEvent) => {
      if (event.target && !isFocusInsideReactTreeRef.current) {
        const eventDetail = { originalEvent: event };

        /**
         * The `DismisableLayer`-API is based on the ability to stop events from propagating and in the end calling `onDismiss`
         * if `useFocusOutside`-callback runs `event.preventDefault()`.
         *
         * Because of the `focusin`-event not being cancelable,
         * we need to use a custom event to ensure that the event is cancelable.
         * https://developer.mozilla.org/en-US/docs/Web/API/Element/focusin_event
         * > The focusin event is not cancelable.
         */
        dispatchCustomEvent(
          CUSTOM_EVENTS.FOCUS_OUTSIDE,
          handleFocusOutside,
          eventDetail,
        );
      }
    };
    ownerDocument.addEventListener("focusin", handleFocus);
    return () => {
      ownerDocument.removeEventListener("focusin", handleFocus);
    };
  }, [ownerDocument, handleFocusOutside, enabled]);

  /**
   * By directly setting isFocusInsideReactTreeRef on focus-events at the root of the "dismissable" element,
   * we can eliminate the need for DOM traversal to verify if the focused element is within the react tree.
   */
  return {
    onFocusCapture: () => {
      isFocusInsideReactTreeRef.current = true;
    },
    onBlurCapture: () => {
      isFocusInsideReactTreeRef.current = false;
    },
  };
}
