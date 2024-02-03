import { useEffect, useRef } from "react";
import { useCallbackRef } from "../../../../util/hooks";

/**
 * Tracks focus outside a React subtree. Returns props for the subtree root.
 */
export function useFocusOutside(
  callback?: (event: FocusEvent) => void,
  ownerDocument: Document = globalThis?.document,
) {
  const handleFocusOutside = useCallbackRef(callback) as EventListener;
  const isFocusInsideReactTreeRef = useRef(false);

  useEffect(() => {
    const handleFocus = (event: FocusEvent) => {
      if (event.target && !isFocusInsideReactTreeRef.current) {
        handleFocusOutside(event);
      }
    };
    ownerDocument.addEventListener("focusin", handleFocus);
    return () => ownerDocument.removeEventListener("focusin", handleFocus);
  }, [ownerDocument, handleFocusOutside]);

  /**
   * By directly setting isFocusInsideReactTreeRef on focus-events at the root of the "dismissable" element,
   * we can eliminate the need for DOM traversal to verify if the focused element is within the react tree.
   */
  return {
    onFocusCapture: () => (isFocusInsideReactTreeRef.current = true),
    onBlurCapture: () => (isFocusInsideReactTreeRef.current = false),
  };
}
