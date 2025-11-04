import React, { forwardRef, useContext, useEffect, useState } from "react";
import { Slot } from "../../slot/Slot";
import { omit } from "../../util";
import { composeEventHandlers } from "../../util/composeEventHandlers";
import { useMergeRefs } from "../../util/hooks";
import { ownerDocument } from "../../util/owner";
import { AsChild } from "../../util/types/AsChild";
import {
  CustomFocusEvent,
  CustomPointerDownEvent,
} from "./util/dispatchCustomEvent";
import { getSortedLayers } from "./util/sort-layers";
import { useEscapeKeydown } from "./util/useEscapeKeydown";
import { useFocusOutside } from "./util/useFocusOutside";
import { usePointerDownOutside } from "./util/usePointerDownOutside";

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
  onPointerDownOutside?: (event: CustomPointerDownEvent) => void;
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
  onInteractOutside?: (
    event: CustomPointerDownEvent | CustomFocusEvent,
  ) => void;
  /**
   * Handler called when the `DismissableLayer` should be dismissed
   */
  onDismiss?: () => void;
  /**
   * Stops `onDismiss` from beeing called when interacting with the `safeZone` elements.
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

const DismissableLayer = forwardRef<HTMLDivElement, DismissableLayerProps>(
  ({ enabled = true, ...restProps }: DismissableLayerProps, forwardedRef) => {
    if (!enabled) {
      const Component = restProps.asChild ? Slot : "div";
      return (
        <Component
          {...omit(restProps, [
            "asChild",
            "disableOutsidePointerEvents",
            "onDismiss",
            "onEscapeKeyDown",
            "onFocusOutside",
            "onInteractOutside",
            "onPointerDownOutside",
            "safeZone",
          ])}
          ref={forwardedRef}
        />
      );
    }

    return <DismissableLayerInternal {...restProps} ref={forwardedRef} />;
  },
);

type DismissableLayerElement = React.ComponentRef<
  typeof DismissableLayerInternal
>;

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

const DismissableLayerInternal = forwardRef<
  HTMLDivElement,
  DismissableLayerProps
>(
  (
    {
      children,
      disableOutsidePointerEvents,
      onDismiss,
      onInteractOutside,
      onEscapeKeyDown,
      onFocusOutside,
      onPointerDownOutside,
      safeZone,
      asChild,
      ...restProps
    }: DismissableLayerProps,
    forwardedRef,
  ) => {
    const context = useContext(DismissableLayerContext);

    const [, forceRerender] = useState({});
    const [node, setNode] = React.useState<DismissableLayerElement | null>(
      null,
    );
    const mergedRefs = useMergeRefs(forwardedRef, setNode);
    const ownerDoc = ownerDocument(node);

    /* Layer handling */
    const layers = getSortedLayers(context.layers, context.branchedLayers);
    const highestLayerWithOutsidePointerEventsDisabledIndex =
      getHighestDisabledLayerIndex(
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
     * We want to prevent the Layer from closing when the trigger, anchor element, or its child elements are interacted with.
     * To achieve this, we check if the event target is the trigger, anchor or a child. If it is, we prevent default event behavior.
     */
    function handleOutsideEvent(
      event: CustomFocusEvent | CustomPointerDownEvent,
    ) {
      if (!safeZone?.anchor) {
        return;
      }

      let hasPointerDownOutside = false;

      if (!event.defaultPrevented) {
        if (event.detail.originalEvent.type === "pointerdown") {
          hasPointerDownOutside = true;
        }
      }

      const target = event.target as HTMLElement;

      const targetIsAnchor =
        safeZone.anchor.contains(target) || target === safeZone.anchor;

      if (targetIsAnchor) {
        event.preventDefault();
      }

      /**
       * In Safari, if the trigger element is inside a container with tabIndex={0}, a click on the trigger
       * will first fire a 'pointerdownoutside' event on the trigger itself. However, it will then fire a
       * 'focusoutside' event on the container.
       *
       * To handle this, we ignore any 'focusoutside' events if a 'pointerdownoutside' event has already occurred.
       * 'pointerdownoutside' event is sufficient to indicate interaction outside the DismissableLayer.
       */
      if (
        event.detail.originalEvent.type === "focusin" &&
        hasPointerDownOutside
      ) {
        event.preventDefault();
      }
    }

    const pointerDownOutside = usePointerDownOutside((event) => {
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
        onDismiss();
      }
    }, ownerDoc);

    const focusOutside = useFocusOutside((event) => {
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
        onDismiss();
      }
    }, ownerDoc);

    useEscapeKeydown((event) => {
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
        event.preventDefault();
        onDismiss();
      }
    }, ownerDoc);

    /**
     * Handles registering `layers` and `layersWithOutsidePointerEventsDisabled`.
     */
    useEffect(() => {
      if (!node) {
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
    }, [node, disableOutsidePointerEvents, context, ownerDoc]);

    /**
     * We purposefully prevent combining this effect with the `disableOutsidePointerEvents` effect
     * because a change to `disableOutsidePointerEvents` would remove this layer from the stack
     * and add it to the end again so the layering order wouldn't be creation order.
     * We only want them to be removed from context stacks when unmounted.
     */
    useEffect(() => {
      return () => {
        if (!node) {
          return;
        }

        context.layers.delete(node);
        context.layersWithOutsidePointerEventsDisabled.delete(node);
        dispatchUpdate();
      };
    }, [node, context]);

    const parentBranchedLayer = useContext(BranchedLayerContext);

    /**
     * Handles registering and unregistering branched layers.
     * When this layer has a parent, we register it as a child of the parent.
     */
    useEffect(() => {
      if (!node || !parentBranchedLayer || node === parentBranchedLayer) {
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
    }, [node, parentBranchedLayer, context]);

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
            pointerDownOutside.onPointerDownCapture,
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
 * Returns the highest index of a disabled layer in the ordered layers array.
 * If no layers are disabled, returns -1.
 */
function getHighestDisabledLayerIndex(
  orderedLayers: DismissableLayerElement[],
  disabledLayers: Set<DismissableLayerElement>,
): number {
  for (let i = orderedLayers.length - 1; i >= 0; i -= 1) {
    if (disabledLayers.has(orderedLayers[i])) {
      return i;
    }
  }

  return -1;
}

export { DismissableLayer, type DismissableLayerProps };
