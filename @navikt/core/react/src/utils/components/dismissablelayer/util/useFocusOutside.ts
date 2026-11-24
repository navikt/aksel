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

    // Focus moving between siblings in a shadow root may only reach that root.
    const roots = new Set<Node>([node.ownerDocument]);
    for (const element of [node, anchor]) {
      const view = element?.ownerDocument.defaultView;
      let root = element?.getRootNode();
      while (root && !roots.has(root)) {
        roots.add(root);
        root =
          view && root instanceof view.ShadowRoot
            ? root.host.getRootNode()
            : undefined;
      }
    }

    const handleFocusIn = (event: FocusEvent) => {
      // Read now: the browser clears targets in shadow trees after dispatch.
      const target = event.target;
      const currentRoot =
        (event.currentTarget as Document | ShadowRoot | null) ??
        node.ownerDocument;
      if (!target || skipFocusCheckRef.current) {
        return;
      }

      /*
       * Defer so React's onFocusCapture has also run (native vs. React listener order varies).
       * Comparing event identity confirms this focusin came from inside the React subtree (e.g. a portal).
       */
      focusCheck.start(0, () => {
        const activeElement = getDeepActiveElement(currentRoot);
        if (
          insideFocusEventRef.current === event ||
          !node.isConnected ||
          hasFocusWithin(node) ||
          hasFocusWithin(anchor) ||
          /* Ignore fallback to body (e.g. removed target) */
          !activeElement ||
          activeElement === node.ownerDocument.body ||
          /* Focus guards redirect focus */
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
    /** Ignores focusin events triggered by an outside pointerdown until the next tick, since pointer handling already owns dismissal. */
    ignoreFocusOutsideAfterPointerDown: () => {
      focusCheck.clear();
      skipFocusCheckRef.current = true;
      pointerTimeout.start(0, () => {
        skipFocusCheckRef.current = false;
      });
    },
  };
}

/** Uses the element's own root because document.activeElement points to the shadow host instead of the focused element inside a shadow root. */
function hasFocusWithin(element: Element | null | undefined) {
  if (!element?.isConnected) {
    return false;
  }
  const root = element.getRootNode() as Document | ShadowRoot;
  return element.contains(root.activeElement);
}

function getDeepActiveElement(root: Document | ShadowRoot) {
  let activeElement = root.activeElement;
  while (activeElement?.shadowRoot?.activeElement) {
    activeElement = activeElement.shadowRoot.activeElement;
  }
  return activeElement;
}

export { useFocusOutside };
