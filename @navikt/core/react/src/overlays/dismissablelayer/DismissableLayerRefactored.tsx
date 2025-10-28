import React, {
  CSSProperties,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Slot } from "../../slot/Slot";
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
type DismissableLayerBranchElement = React.ComponentRef<
  typeof DismissableLayerRefactored
>;

const CONTEXT_UPDATE_EVENT = "dismissableLayer.update";

const DismissableLayerContext = React.createContext({
  layers: new Set<DismissableLayerElement>(),
  layersWithOutsidePointerEventsDisabled: new Set<DismissableLayerElement>(),
  branches: new Set<DismissableLayerBranchElement>(),
});

interface DismissableLayerBaseProps {
  id?: string;
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

/**
 * Number of layers with `disableOutsidePointerEvents` set to `true` currently enabled.
 */
let bodyLockCount = 0;
let originalBodyPointerEvents: string;

const DismissableLayerRefactored = forwardRef<
  HTMLDivElement,
  DismissableLayerProps
>((props: DismissableLayerProps, forwardedRef) => {
  const {
    children,
    disableOutsidePointerEvents,
    onDismiss,
    onEscapeKeyDown,
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

const DismissableLayerNode = forwardRef<HTMLDivElement, DismissableLayerProps>(
  (
    {
      children,
      asChild,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      onDismiss,
      safeZone,
      disableOutsidePointerEvents = false,
      enabled = true,
      ...rest
    }: DismissableLayerProps,
    ref,
  ) => {
    const [, setForce] = useState({});
    const { register, index, descendants } = useDismissableDescendant({
      disableOutsidePointerEvents,
      disabled: !enabled,
      forceUpdate: () => setForce({}),
    });

    /**
     * `node` will be set to the ref of the component or nested component
     * Ex: If
     * ```
     * <DismissableLayer asChild>
     *   <Popover />
     * </DismissableLayer>
     * ```
     * `node` will in this case be the Popover-element.
     * We use State her and not ref since we want to trigger a rerender when the node changes.
     */
    const [node, setNode] = useState<HTMLDivElement | null>(null);

    const mergedRefs = useMergeRefs(setNode, register, ref);

    const ownerDoc = ownerDocument(node);

    const hasInteractedOutsideRef = useRef(false);
    const hasPointerDownOutsideRef = useRef(false);

    const pointerState = (() => {
      let lastIndex = -1;

      const descendantNodes = descendants.enabledValues();

      descendantNodes.forEach((obj, _index) => {
        if (obj.disableOutsidePointerEvents) {
          lastIndex = _index;
        }
      });

      return {
        /**
         * Makes sure we stop events at the highest layer with pointer events disabled.
         * If not checked, we risk closing every layer when clicking outside the layer.
         */
        isPointerEventsEnabled: index >= lastIndex,
        /**
         * If we find a node with `disableOutsidePointerEvents` we want to disable pointer events on the body.
         */
        isBodyPointerEventsDisabled: bodyLockCount > 0,
        pointerStyle: (index >= lastIndex && bodyLockCount > 0
          ? "auto"
          : undefined) as CSSProperties["pointerEvents"] | undefined,
      };
    })();

    /**
     * We want to prevent the Layer from closing when the trigger, anchor element, or its child elements are interacted with.
     *
     * To achieve this, we check if the event target is the trigger, anchor or a child. If it is, we prevent default event behavior.
     *
     * The `pointerDownOutside` and `focusOutside` handlers already check if the event target is within the DismissableLayer (`node`).
     * However, since we don't add a `tabIndex` to the Popover/Tooltip, the `focusOutside` handler doesn't correctly handle focus events.
     * Therefore, we also need to check that neither the trigger (`anchor`) nor the DismissableLayer (`dismissable`) are the event targets.
     */
    function handleOutsideEvent(
      event: CustomFocusEvent | CustomPointerDownEvent,
    ) {
      if ((!safeZone?.anchor && !safeZone?.dismissable) || !enabled) {
        return;
      }

      if (!event.defaultPrevented) {
        hasInteractedOutsideRef.current = true;
        if (event.detail.originalEvent.type === "pointerdown") {
          hasPointerDownOutsideRef.current = true;
        }
      }

      const target = event.target as HTMLElement;

      /**
       * pointerdown-events works as expected, but focus-events does not.
       * For focus-event we need to also check `safeZone.dismissable` (the Popover/Tooltip itself) since it does not have a tabIndex.
       */
      if (event.detail.originalEvent.type === "pointerdown") {
        const targetIsTrigger =
          safeZone?.anchor?.contains(target) || target === safeZone?.anchor;
        targetIsTrigger && event.preventDefault();
      } else {
        const targetIsNotTrigger =
          target instanceof HTMLElement &&
          ![safeZone?.anchor, safeZone?.dismissable].some((element) =>
            element?.contains(target as Node),
          ) &&
          !target.contains(safeZone?.dismissable ?? null);

        !targetIsNotTrigger && event.preventDefault();
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
        hasPointerDownOutsideRef.current
      ) {
        event.preventDefault();
      }
      hasPointerDownOutsideRef.current = false;
      hasInteractedOutsideRef.current = false;
    }

    const pointerDownOutside = usePointerDownOutside((event) => {
      if (!pointerState.isPointerEventsEnabled || !enabled) {
        return;
      }

      /**
       * We call these before letting `handleOutsideEvent` do its checks to give consumer a chance to preventDefault based certain cases.
       */
      onPointerDownOutside?.(event);
      onInteractOutside?.(event);

      /**
       * Add safeZone to prevent closing when interacting with trigger/anchor or its children.
       */
      safeZone && handleOutsideEvent(event);

      /**
       * Both `onPointerDownOutside` and `onInteractOutside` are able to preventDefault the event, thus stopping call for `onDismiss`.
       */
      if (!event.defaultPrevented && onDismiss) {
        onDismiss();
      }
    }, ownerDoc);

    const focusOutside = useFocusOutside((event) => {
      if (!enabled) {
        return;
      }

      /**
       * We call these before letting `handleOutsideEvent` do its checks to give consumer a chance to preventDefault based certain cases.
       */
      onFocusOutside?.(event);
      onInteractOutside?.(event);

      /**
       * Add safeZone to prevent closing when interacting with trigger/anchor or its children.
       */
      safeZone && handleOutsideEvent(event);

      /**
       * Both `onFocusOutside` and `onInteractOutside` are able to preventDefault the event, thus stopping call for `onDismiss`.
       */
      if (!event.defaultPrevented && onDismiss) {
        onDismiss();
      }
    }, ownerDoc);

    useEscapeKeydown((event) => {
      if (!enabled) {
        return;
      }
      /**
       * The deepest nested element will always be last in the descendants list.
       * This allows us to only close the highest layer when pressing escape.
       *
       * In some cases a layer might still exist, but be disabled. We want to ignore these layers.
       */
      const isHighestLayer = index === descendants.enabledCount() - 1;
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
     * If `disableOutsidePointerEvents` is true,
     * we want to disable pointer events on the body when the first layer is opened.
     */

    // biome-ignore lint/correctness/useExhaustiveDependencies: Every time the descendants change, we want to update the body pointer events since we might have added or removed a layer.
    useEffect(() => {
      if (!node || !enabled || !disableOutsidePointerEvents) return;

      if (bodyLockCount === 0) {
        originalBodyPointerEvents = ownerDoc.body.style.pointerEvents;
        ownerDoc.body.style.pointerEvents = "none";
      }
      bodyLockCount++;
      return () => {
        if (bodyLockCount === 1) {
          ownerDoc.body.style.pointerEvents = originalBodyPointerEvents;
        }
        bodyLockCount--;
      };
    }, [node, ownerDoc, disableOutsidePointerEvents, descendants, enabled]);

    /**
     * To make sure pointerEvents are enabled for all parents and siblings when the layer is removed from the DOM
     */
    // biome-ignore lint/correctness/useExhaustiveDependencies: We explicitly want to run this on unmount, including every time the node updates to make sure we don't lock the application behind pointer-events: none.
    useEffect(() => {
      return () => descendants.values().forEach((x) => x.forceUpdate());
    }, [descendants, node]);

    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={mergedRefs}
        {...rest}
        onFocusCapture={focusOutside.onFocusCapture}
        onBlurCapture={focusOutside.onBlurCapture}
        onPointerDownCapture={pointerDownOutside.onPointerDownCapture}
        style={{
          pointerEvents: pointerState.pointerStyle,
          ...rest.style,
        }}
      >
        {children}
      </Comp>
    );
  },
);

export { DismissableLayerRefactored, type DismissableLayerProps };
