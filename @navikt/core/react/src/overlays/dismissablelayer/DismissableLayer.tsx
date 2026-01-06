import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Slot } from "../../slot/Slot";
import { composeEventHandlers } from "../../util/composeEventHandlers";
import { useMergeRefs } from "../../util/hooks";
import { ownerDocument } from "../../util/owner";
import { AsChild } from "../../util/types/AsChild";
import {
  CustomFocusEvent,
  CustomPointerEvent,
} from "./util/dispatchCustomEvent";
import { getSortedLayers } from "./util/sort-layers";
import { useEscapeKeydown } from "./util/useEscapeKeydown";
import { useFocusOutside } from "./util/useFocusOutside";
import { usePointerDownOutside } from "./util/usePointerDownOutside";
import { usePointerUpOutside } from "./util/usePointerUpOutside";

interface DismissableLayerBaseProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * When `true`, hover/focus/click interactions will be disabled on elements outside
   * the `DismissableLayer`. Users will need to click twice on outside elements to
   * interact with them: once to close the `DismissableLayer`, and again to trigger the element.
   */
  disableOutsidePointerEvents?: boolean;
  /**
   * Event handler called when the escape key is down.
   * Can be prevented.
   */
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  /**
   * Event handler called when the a `pointerdown` event happens outside of the `DismissableLayer`.
   * Can be prevented.
   */
  onPointerDownOutside?: (event: CustomPointerEvent) => void;
  /**
   * Event handler called when the a `pointerup` event happens outside of the `DismissableLayer`.
   * Can be prevented.
   */
  onPointerUpOutside?: (event: CustomPointerEvent) => void;
  /**
   * Enables listening for `pointerup` outside the `DismissableLayer`.
   * In most cases `pointerdown` is sufficient, but in some cases (like modal, drawer)
   * we want to mimic native OS behaviour and only close on `pointerup`.
   * @default false
   */
  enablePointerUpOutside?: boolean;
  /**
   * Event handler called when the focus moves outside of the `DismissableLayer`.
   * Can be prevented.
   */
  onFocusOutside?: (event: CustomFocusEvent) => void;
  /**
   * Event handler called when an interaction happens outside the `DismissableLayer`.
   * Specifically, when a `pointerdown` event happens outside or focus moves outside of it.
   * Can be prevented.
   */
  onInteractOutside?: (event: CustomPointerEvent | CustomFocusEvent) => void;
  /**
   * Handler called when the `DismissableLayer` should be dismissed
   */
  onDismiss?: (event: Event) => void;
  /**
   * Stops `onDismiss` from beeing called when interacting with the `safeZone` elements.
   * - anchor: The element that should be considered safe to interact with.
   */
  safeZone?: {
    anchor?: Element | null;
  };
  /**
   * @default true
   */
  enabled?: boolean;
}

type DismissableLayerProps = DismissableLayerBaseProps & AsChild;

type DismissableLayerElement = React.ComponentRef<typeof DismissableLayer>;

const BranchedLayerContext =
  React.createContext<DismissableLayerElement | null>(null);

/* ------------------------ DismissableLayerInternal ------------------------ */
const CONTEXT_UPDATE_EVENT = "dismissableLayer.update";
let originalBodyPointerEvents: string;

const DismissableLayerContext = React.createContext({
  layers: new Set<DismissableLayerElement>(),
  branchedLayers: new Map<
    DismissableLayerElement,
    Set<DismissableLayerElement>
  >(),
  layersWithOutsidePointerEventsDisabled: new Set<DismissableLayerElement>(),
});

const DismissableLayer = forwardRef<HTMLDivElement, DismissableLayerProps>(
  (
    {
      children,
      disableOutsidePointerEvents,
      onDismiss,
      onInteractOutside,
      onEscapeKeyDown,
      onFocusOutside,
      onPointerDownOutside,
      onPointerUpOutside,
      enablePointerUpOutside = false,
      safeZone,
      asChild,
      enabled = true,
      ...restProps
    }: DismissableLayerProps,
    forwardedRef,
  ) => {
    const context = useContext(DismissableLayerContext);

    const triggerPointerDownRef = useRef<boolean>(false);

    const [, forceRerender] = useState({});
    const [node, setNode] = React.useState<DismissableLayerElement | null>(
      null,
    );
    const mergedRefs = useMergeRefs(forwardedRef, setNode);
    const ownerDoc = ownerDocument(node);

    /* Layer handling */
    const layers = getSortedLayers(context.layers, context.branchedLayers);
    const highestLayerWithOutsidePointerEventsDisabledIndex =
      findHighestLayerIndex(
        layers,
        context.layersWithOutsidePointerEventsDisabled,
      );
    const index = node ? layers.indexOf(node) : -1;
    const isBodyPointerEventsDisabled =
      context.layersWithOutsidePointerEventsDisabled.size > 0;
    const shouldEnablePointerEvents =
      highestLayerWithOutsidePointerEventsDisabledIndex === -1 ||
      index >= highestLayerWithOutsidePointerEventsDisabledIndex;

    /**
     * We want to prevent the Layer from closing when the trigger/anchor element or its child elements are interacted with.
     * To achieve this, we check if the event target is the trigger/anchor or a child. If it is, we prevent default event behavior.
     */
    function handleOutsideEvent(event: CustomFocusEvent | CustomPointerEvent) {
      if (!safeZone?.anchor) {
        return;
      }

      const eventType = event.detail.originalEvent.type as
        | "pointerup"
        | "pointerdown"
        | "focusin";

      /**
       * If anchor is wrapped inside a custom-component,
       * the target will be a generic "custom-component".
       * Therefore, we check if the pointerdown originated from the trigger itself since
       * anchor will never match the target in that case.
       */
      if (
        eventType === "pointerdown" &&
        triggerPointerDownRef.current === true
      ) {
        event.preventDefault();
        return;
      }

      const target = event.target as HTMLElement;

      const targetIsAnchor =
        safeZone.anchor.contains(target) || target === safeZone.anchor;

      if (targetIsAnchor) {
        event.preventDefault();
      }

      triggerPointerDownRef.current = false;
    }

    const pointerDownOutside = usePointerDownOutside(
      (event) => {
        if (!shouldEnablePointerEvents) {
          return;
        }

        /**
         * We call these before letting `handleOutsideEvent` do its checks to give consumer a chance to preventDefault.
         */
        onPointerDownOutside?.(event);
        onInteractOutside?.(event);

        /**
         * Add safeZone to prevent closing when interacting with trigger/anchor or its children.
         */
        safeZone && handleOutsideEvent(event);

        if (!event.defaultPrevented && onDismiss) {
          onDismiss(event);
        }
      },
      ownerDoc,
      enabled,
    );

    const pointerUpOutside = usePointerUpOutside(
      (event) => {
        if (!shouldEnablePointerEvents || !enablePointerUpOutside) {
          return;
        }

        /**
         * We call these before letting `handleOutsideEvent` do its checks to give consumer a chance to preventDefault based certain cases.
         */
        onPointerUpOutside?.(event);
        onInteractOutside?.(event);

        /**
         * Add safeZone to prevent closing when interacting with trigger/anchor or its children.
         */
        safeZone && handleOutsideEvent(event);

        /**
         * Both `onPointerUpOutside`, `onInteractOutside` and `handleOutsideEvent`
         * are able to preventDefault the event, thus stopping call for `onDismiss`.
         */
        if (!event.defaultPrevented && onDismiss) {
          onDismiss(event);
        }
      },
      ownerDoc,
      enabled,
    );

    const focusOutside = useFocusOutside(
      (event) => {
        /**
         * We call these before letting `handleOutsideEvent` do its checks to give consumer a chance to preventDefault.
         */
        onFocusOutside?.(event);
        onInteractOutside?.(event);

        /**
         * Add safeZone to prevent closing when interacting with trigger/anchor or its children.
         */
        safeZone && handleOutsideEvent(event);

        if (!event.defaultPrevented && onDismiss) {
          onDismiss(event);
        }
      },
      ownerDoc,
      enabled,
    );

    useEscapeKeydown(
      (event) => {
        /**
         * The deepest nested element will always be last in the descendants list.
         * This allows us to only close the highest layer when pressing escape.
         */
        const isHighestLayer = index === context.layers.size - 1;
        if (!isHighestLayer) {
          return;
        }

        /**
         * We call this before letting `handleOutsideEvent` do its checks to give consumer a chance to preventDefault based certain cases.
         */
        onEscapeKeyDown?.(event);
        /**
         * `onEscapeKeyDown` is able to preventDefault the event, thus stopping call for `onDismiss`.
         * We want to `preventDefault` the escape-event to avoid sideeffect from other elements on screen
         */
        if (!event.defaultPrevented && onDismiss) {
          onDismiss(event);

          /**
           * Preventing after dismiss allows us to check if user prevents default on the escape event
           * to avoid side effects on other elements after this layer has been dismissed.
           */
          event.preventDefault();
        }
      },
      ownerDoc,
      enabled,
    );

    useEffect(() => {
      if (!safeZone?.anchor) {
        return;
      }

      const handlePointerDown = () => {
        triggerPointerDownRef.current = true;
      };

      const handlePointerEnd = () => {
        triggerPointerDownRef.current = false;
      };

      const anchor = safeZone.anchor;

      anchor.addEventListener("pointerdown", handlePointerDown, {
        capture: true,
      });
      anchor.addEventListener("pointerup", handlePointerEnd);
      anchor.addEventListener("pointerleave", handlePointerEnd);
      anchor.addEventListener("pointercancel", handlePointerEnd);

      return () => {
        anchor.removeEventListener("pointerdown", handlePointerDown, {
          capture: true,
        });
        anchor.removeEventListener("pointerup", handlePointerEnd);
        anchor.removeEventListener("pointerleave", handlePointerEnd);
        anchor.removeEventListener("pointercancel", handlePointerEnd);
      };
    }, [safeZone?.anchor]);

    /* onPointerDownCapture={() => {
            context.triggerPointerDownRef.current = true;
          }}
          onPointerUp={() => {
            context.triggerPointerDownRef.current = false;
          }}
          onPointerLeave={() => {
            context.triggerPointerDownRef.current = false;
          }}
          onPointerCancel={() => {
            context.triggerPointerDownRef.current = false;
          }} */

    /**
     * Handles registering `layers` and `layersWithOutsidePointerEventsDisabled`.
     */
    useEffect(() => {
      if (!node || !enabled) {
        return;
      }

      if (disableOutsidePointerEvents) {
        if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
          originalBodyPointerEvents = ownerDoc.body.style.pointerEvents;
          ownerDoc.body.style.pointerEvents = "none";
        }
        context.layersWithOutsidePointerEventsDisabled.add(node);
      }
      context.layers.add(node);
      dispatchUpdate();

      return () => {
        if (
          disableOutsidePointerEvents &&
          context.layersWithOutsidePointerEventsDisabled.size === 1
        ) {
          ownerDoc.body.style.pointerEvents = originalBodyPointerEvents;
        }
      };
    }, [node, enabled, disableOutsidePointerEvents, context, ownerDoc]);

    /**
     * We purposefully prevent combining this effect with the `disableOutsidePointerEvents` effect
     * because a change to `disableOutsidePointerEvents` would remove this layer from the stack
     * and add it to the end again so the layering order wouldn't be creation order.
     * We only want them to be removed from context stacks when unmounted.
     *
     * We depend on `enabled` to clean up when the layer is disabled.
     */
    // biome-ignore lint/correctness/useExhaustiveDependencies: We need to clean up after enabled changes.
    useEffect(() => {
      return () => {
        if (!node) {
          return;
        }
        if (
          context.layers.has(node) ||
          context.layersWithOutsidePointerEventsDisabled.has(node)
        ) {
          context.layers.delete(node);
          context.layersWithOutsidePointerEventsDisabled.delete(node);
          dispatchUpdate();
        }
      };
    }, [node, context, enabled]);

    const parentBranchedLayer = useContext(BranchedLayerContext);

    /**
     * Handles registering and unregistering branched (nested) layers.
     * When this layer has a parent, we register it as a child of the parent.
     */
    useEffect(() => {
      if (
        !node ||
        !enabled ||
        !parentBranchedLayer ||
        node === parentBranchedLayer
      ) {
        return;
      }

      if (!context.branchedLayers.has(parentBranchedLayer)) {
        context.branchedLayers.set(parentBranchedLayer, new Set());
      }

      const branchedChildren = context.branchedLayers.get(parentBranchedLayer)!;
      branchedChildren.add(node);
      dispatchUpdate();

      return () => {
        // Remove this node from the parent's children
        branchedChildren.delete(node);

        // If the parent has no more children, remove the parent from branchedLayers
        if (branchedChildren.size === 0) {
          context.branchedLayers.delete(parentBranchedLayer);
        }

        dispatchUpdate();
      };
    }, [node, enabled, parentBranchedLayer, context]);

    /**
     * Synchronizes layer state across all mounted `DismissableLayer` instances.
     * All layers re-render on every context change to recalculate their position and pointer-events.
     */
    useEffect(() => {
      const handleUpdate = () => forceRerender({});
      document.addEventListener(CONTEXT_UPDATE_EVENT, handleUpdate);
      return () =>
        document.removeEventListener(CONTEXT_UPDATE_EVENT, handleUpdate);
    }, []);

    const Comp = asChild ? Slot : "div";

    return (
      <BranchedLayerContext.Provider value={node}>
        <Comp
          {...restProps}
          ref={mergedRefs}
          style={{
            pointerEvents: isBodyPointerEventsDisabled
              ? shouldEnablePointerEvents
                ? "auto"
                : "none"
              : undefined,
            ...restProps.style,
          }}
          onFocusCapture={composeEventHandlers(
            restProps.onFocusCapture,
            focusOutside.onFocusCapture,
          )}
          onBlurCapture={composeEventHandlers(
            restProps.onBlurCapture,
            focusOutside.onBlurCapture,
          )}
          onPointerDownCapture={composeEventHandlers(
            restProps.onPointerDownCapture,
            () => {
              pointerDownOutside.onPointerDownCapture();
              pointerUpOutside.onPointerDownCapture();
            },
          )}
          onPointerUpCapture={composeEventHandlers(
            restProps.onPointerUpCapture,
            pointerUpOutside.onPointerUpCapture,
          )}
        >
          {children}
        </Comp>
      </BranchedLayerContext.Provider>
    );
  },
);

/**
 * Dispatches a custom event to inform all `DismissableLayer` components to update.
 */
function dispatchUpdate() {
  const event = new CustomEvent(CONTEXT_UPDATE_EVENT);
  document.dispatchEvent(event);
}

/**
 * Returns the index of the last layer that is found in the given subset.
 * Returns -1 if no layers are found.
 */
function findHighestLayerIndex(
  orderedLayers: DismissableLayerElement[],
  layersWithOutsidePointerEventsDisabled: Set<DismissableLayerElement>,
): number {
  for (let i = orderedLayers.length - 1; i >= 0; i -= 1) {
    if (layersWithOutsidePointerEventsDisabled.has(orderedLayers[i])) {
      return i;
    }
  }

  return -1;
}

export { DismissableLayer, type DismissableLayerProps };
