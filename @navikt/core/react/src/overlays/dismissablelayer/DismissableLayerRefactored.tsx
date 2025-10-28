import React, {
  CSSProperties,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from "react";
import { composeEventHandlers } from "../../util/composeEventHandlers";
import { useMergeRefs } from "../../util/hooks";
import { createDescendantContext } from "../../util/hooks/descendants/useDescendant";
import { ownerDocument } from "../../util/owner";
import { AsChild } from "../../util/types/AsChild";
import {
  CustomFocusEvent,
  CustomPointerDownEvent,
} from "./util/dispatchCustomEvent";
import { useEscapeKeydown } from "./util/useEscapeKeydown";
import { useFocusOutside } from "./util/useFocusOutside";
import { usePointerDownOutside } from "./util/usePointerDownOutside";

type DismissableLayerElement = React.ComponentRef<
  typeof DismissableLayerRefactored
>;

const CONTEXT_UPDATE_EVENT = "dismissableLayer.update";

const DismissableLayerContext = React.createContext({
  layers: new Set<DismissableLayerElement>(),
  layersWithOutsidePointerEventsDisabled: new Set<DismissableLayerElement>(),
});

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
   * `safeZone.dismissable` is only needed when its element does not have a `tabIndex` since it will not receive focus-events.
   */
  safeZone?: {
    anchor?: Element | null;
    dismissable?: Element | null;
  };

  style?: CSSProperties;
  /**
   * Disables layer from beeing counted in context for nested `DismissableLayer`.
   */
  enabled?: boolean;
}

type DismissableLayerProps = DismissableLayerBaseProps & AsChild;

export const [
  DismissableDescendantsProvider,
  useDismissableDescendantsContext,
  useDismissableDescendants,
  useDismissableDescendant,
] = createDescendantContext<
  HTMLDivElement,
  { disableOutsidePointerEvents: boolean; forceUpdate: () => void }
>();

let originalBodyPointerEvents: string;

const DismissableLayerRefactored = forwardRef<
  HTMLDivElement,
  DismissableLayerProps
>((props: DismissableLayerProps, forwardedRef) => {
  const {
    children,
    disableOutsidePointerEvents,
    onDismiss,
    onInteractOutside,
    onEscapeKeyDown,
    onFocusOutside,
    onPointerDownOutside,
    enabled = true,
    ...restProps
  } = props;
  const context = useContext(DismissableLayerContext);

  const [, force] = useState({});
  const [node, setNode] = React.useState<DismissableLayerElement | null>(null);
  const mergedRefs = useMergeRefs(forwardedRef, setNode);
  const ownerDoc = ownerDocument(node);

  /* Layer handling */
  const layers = Array.from(context.layers);
  const [highestLayerWithOutsidePointerEventsDisabled] = [...context.layersWithOutsidePointerEventsDisabled].slice(-1); // prettier-ignore
  const highestLayerWithOutsidePointerEventsDisabledIndex = layers.indexOf(highestLayerWithOutsidePointerEventsDisabled!); // prettier-ignore
  const index = node ? layers.indexOf(node) : -1;
  const isBodyPointerEventsDisabled =
    context.layersWithOutsidePointerEventsDisabled.size > 0;
  const isPointerEventsEnabled =
    index >= highestLayerWithOutsidePointerEventsDisabledIndex;

  /* TODO: We are now ignoring "safezone". Is safezone needed? */
  const pointerDownOutside = usePointerDownOutside((event) => {
    if (!isPointerEventsEnabled) {
      return;
    }
    onPointerDownOutside?.(event);
    onInteractOutside?.(event);

    if (!event.defaultPrevented && onDismiss) {
      onDismiss();
    }
  }, ownerDoc);

  /* TODO: We are now ignoring "safezone". Is safezone needed? */
  const focusOutside = useFocusOutside((event) => {
    onFocusOutside?.(event);
    onInteractOutside?.(event);

    if (!event.defaultPrevented && onDismiss) {
      onDismiss();
    }
  }, ownerDoc);

  useEscapeKeydown((event) => {
    if (!enabled) {
      return;
    }

    /**
     * TODO: Currently, parent in nested elements is before child in the set.
     * This causes issues with determining the highest layer.
     * We need to fix the layering order to be creation order, not insertion order??
     *
     *
     * The deepest nested element will always be last in the descendants list.
     * This allows us to only close the highest layer when pressing escape.
     *
     * In some cases a layer might still exist, but be disabled. We want to ignore these layers.
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
  }, [node, disableOutsidePointerEvents, context, ownerDoc, enabled]);

  /**
   * We purposefully prevent combining this effect with the `disableOutsidePointerEvents` effect
   * because a change to `disableOutsidePointerEvents` would remove this layer from the stack
   * and add it to the end again so the layering order wouldn't be creation order.
   * We only want them to be removed from context stacks when unmounted.
   */
  useEffect(() => {
    return () => {
      if (!node || !enabled) {
        return;
      }

      context.layers.delete(node);
      context.layersWithOutsidePointerEventsDisabled.delete(node);
      dispatchUpdate();
    };
  }, [node, context, enabled]);

  /**
   * Force update when context changes to update index and pointer-events state.
   * We use a custom event to avoid unnecessary renders from other state changes in the context.
   */
  useEffect(() => {
    const handleUpdate = () => force({});
    document.addEventListener(CONTEXT_UPDATE_EVENT, handleUpdate);
    return () =>
      document.removeEventListener(CONTEXT_UPDATE_EVENT, handleUpdate);
  }, []);

  return (
    <div
      {...restProps}
      ref={mergedRefs}
      style={{
        pointerEvents: isBodyPointerEventsDisabled
          ? isPointerEventsEnabled
            ? "auto"
            : "none"
          : undefined,
        ...restProps.style,
      }}
      onFocusCapture={composeEventHandlers(
        props.onFocusCapture,
        focusOutside.onFocusCapture,
      )}
      onBlurCapture={composeEventHandlers(
        props.onBlurCapture,
        focusOutside.onBlurCapture,
      )}
      onPointerDownCapture={composeEventHandlers(
        props.onPointerDownCapture,
        pointerDownOutside.onPointerDownCapture,
      )}
    >
      {children}
    </div>
  );
});

/**
 * Dispatches a custom event to inform all `DismissableLayer` components to update.
 */
function dispatchUpdate() {
  const event = new CustomEvent(CONTEXT_UPDATE_EVENT);
  document.dispatchEvent(event);
}

export { DismissableLayerRefactored, type DismissableLayerProps };
