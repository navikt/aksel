import { type FocusEvent as ReactFocusEvent, useEffect, useRef } from "react";
import { useEventCallback, useTimeout } from "../../../hooks";
import {
  CUSTOM_EVENTS,
  type CustomFocusEvent,
  dispatchCustomEvent,
} from "./dispatchCustomEvent";

/**
 * Tracks focus moving outside the layer's React subtree (including portals) and anchor.
 */
function useFocusOutside(
  callback: (event: CustomFocusEvent) => void,
  node: Element | null,
  anchor: Element | null | undefined,
  enabled: boolean,
) {
  const handleFocusOutside = useEventCallback(callback);
  const insideFocusEventRef = useRef<Event | null>(null);
  const skipFocusCheckRef = useRef(false);
  const focusCheck = useTimeout();
  const pointerTimeout = useTimeout();

  useEffect(() => {
    if (!enabled || !node) {
      return;
    }

    const roots = new Set<Node>([node.ownerDocument, node.getRootNode()]);
    if (anchor) {
      roots.add(anchor.getRootNode());
    }

    const handleFocusIn = (event: FocusEvent) => {
      // Read now: the browser clears targets in shadow trees after dispatch.
      const target = event.target;
      if (!target || skipFocusCheckRef.current) {
        return;
      }

      /**
       * Defer the check so React's `onFocusCapture` has seen the event. When React
       * is rendered into `document` (e.g. Next.js App Router), its capture listener
       * may run before this one, so match on the event instead of clearing the timeout.
       */
      focusCheck.start(0, () => {
        const activeElement = getDeepActiveElement(node.ownerDocument);
        if (
          insideFocusEventRef.current === event ||
          !node.isConnected ||
          hasFocusWithin(node) ||
          hasFocusWithin(anchor) ||
          /* Focus fell back to body, e.g. the outside target was removed before the check */
          !activeElement ||
          activeElement === node.ownerDocument.body ||
          /* Focus guards redirect focus and are not real destinations */
          activeElement.hasAttribute("data-aksel-focus-guard")
        ) {
          return;
        }

        dispatchCustomEvent(
          CUSTOM_EVENTS.FOCUS_OUTSIDE,
          handleFocusOutside,
          { originalEvent: event },
          target,
        );
      });
    };

    /**
     * Focus moving within a shadow root doesn't reach the document, so also
     * listen on the roots of the layer and anchor. Repeated calls for the same
     * event just restart the check.
     */
    for (const root of roots) {
      root.addEventListener("focusin", handleFocusIn as EventListener, true);
    }
    return () => {
      for (const root of roots) {
        root.removeEventListener(
          "focusin",
          handleFocusIn as EventListener,
          true,
        );
      }
      focusCheck.clear();
    };
  }, [anchor, enabled, focusCheck, handleFocusOutside, node]);

  return {
    onFocusCapture: (event: ReactFocusEvent) => {
      insideFocusEventRef.current = event.nativeEvent;
    },
    ignoreFocusOutAfterPointerDown: () => {
      focusCheck.clear();
      skipFocusCheckRef.current = true;
      pointerTimeout.start(0, () => {
        skipFocusCheckRef.current = false;
      });
    },
  };
}

/**
 * Uses the active element of the element's own root, so focus inside shadow DOM is not retargeted away.
 */
function hasFocusWithin(element: Element | null | undefined) {
  if (!element?.isConnected) {
    return false;
  }
  const root = element.getRootNode() as Document | ShadowRoot;
  return element.contains(root.activeElement);
}

function getDeepActiveElement(ownerDocument: Document) {
  let activeElement = ownerDocument.activeElement;
  while (activeElement?.shadowRoot?.activeElement) {
    activeElement = activeElement.shadowRoot.activeElement;
  }
  return activeElement;
}

export { useFocusOutside };
