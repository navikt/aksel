import React, { useEffect, useMemo, useRef, useState } from "react";
import { Slot } from "../../../util/Slot";
import { useMergeRefs } from "../../../util/hooks";
import { useDismissableDescendant } from "../DismissableLayer.context";
import {
  CustomFocusEvent,
  CustomPointerDownEvent,
  DismissableLayerProps,
} from "../DismissableLayer.types";
import { useEscapeKeydown } from "./hooks/useEscapeKeydown";
import { useFocusOutside } from "./hooks/useFocusOutside";
import { usePointerDownOutside } from "./hooks/usePointerDownOutside";

let originalBodyPointerEvents: string;

const DismissableLayerNode: React.FC<DismissableLayerProps> = ({
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
}: DismissableLayerProps) => {
  const { register, index, descendants } = useDismissableDescendant({
    disableOutsidePointerEvents,
    disabled: !enabled,
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

  const mergedRefs = useMergeRefs((_node) => setNode(_node), register);

  /**
   * In some cases the `node.ownerDocument` can differ from global document.
   * This can happend when portaling elements or using web-components
   */
  const ownerDocument = node?.ownerDocument ?? globalThis?.document;

  const hasInteractedOutsideRef = useRef(false);
  const hasPointerDownOutsideRef = useRef(false);

  const pointerEnabled = useMemo(() => {
    let lastIndex = -1;

    const descendantNodes = descendants.values();
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
      isBodyPointerEventsDisabled: descendantNodes.find(
        (x) => !!x.disableOutsidePointerEvents,
      ),
    };
  }, [descendants, index]);

  /**
   * Handles the case where a DismissableLayer wrapped around a Popover, Tooltip etc.
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
        ![safeZone?.anchor, safeZone?.dismissable].some(
          (element) => element?.contains(target as Node),
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
    if (!pointerEnabled.isPointerEventsEnabled || !enabled) {
      return;
    }

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
  }, ownerDocument);

  const focusOutside = useFocusOutside((event) => {
    if (!enabled) {
      return;
    }

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
  }, ownerDocument);

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

    onEscapeKeyDown?.(event);
    /**
     * `onEscapeKeyDown` is able to preventDefault the event, thus stopping call for `onDismiss`.
     * We want to `preventDefault` the escape-event to avoid sideeffect from other elements on screen
     */
    if (!event.defaultPrevented && onDismiss) {
      event.preventDefault();
      onDismiss();
    }
  }, ownerDocument);

  /**
   * If `disableOutsidePointerEvents` is true,
   * we want to disable pointer events on the body when the first layer is opened.
   */
  useEffect(() => {
    if (!node || !disableOutsidePointerEvents || index !== 0 || !enabled) {
      return;
    }

    originalBodyPointerEvents = ownerDocument.body.style.pointerEvents;
    ownerDocument.body.style.pointerEvents = "none";

    return () => {
      ownerDocument.body.style.pointerEvents = originalBodyPointerEvents;
    };
  }, [node, ownerDocument, disableOutsidePointerEvents, index, enabled]);

  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      ref={mergedRefs}
      {...rest}
      onFocusCapture={focusOutside.onFocusCapture}
      onBlurCapture={focusOutside.onBlurCapture}
      onPointerDownCapture={pointerDownOutside.onPointerDownCapture}
      style={{
        pointerEvents: pointerEnabled.isBodyPointerEventsDisabled
          ? pointerEnabled.isPointerEventsEnabled
            ? "auto"
            : "none"
          : undefined,
        ...rest.style,
      }}
    >
      {children}
    </Comp>
  );
};

export default DismissableLayerNode;
