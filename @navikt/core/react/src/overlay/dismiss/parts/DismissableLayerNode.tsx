import React, { useRef, useState } from "react";
import { Slot } from "../../../util/Slot";
import { useMergeRefs } from "../../../util/hooks";
import { useDescendant } from "../DismissableLayer.context";
import { DismissableLayerProps } from "../DismissableLayer.types";
import { useEscapeKeydown } from "./hooks/useEscapeKeydown";
import { useFocusOutside } from "./hooks/useFocusOutside";
import { usePointerDownOutside } from "./hooks/usePointerDownOutside";

const DismissableLayerNode: React.FC<DismissableLayerProps> = ({
  children,
  asChild,
  disableOutsidePointerEvents = false,
  onEscapeKeyDown,
  onPointerDownOutside,
  onFocusOutside,
  onInteractOutside,
  onDismiss,
  safeZone,
  ...rest
}: DismissableLayerProps) => {
  const { register, index, descendants } = useDescendant({
    disableOutsidePointerEvents,
  });

  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const ownerDocument = node?.ownerDocument ?? globalThis?.document;

  const mergedRefs = useMergeRefs((_node) => setNode(_node), register);

  const hasInteractedOutsideRef = useRef(false);
  const hasPointerDownOutsideRef = useRef(false);

  function handleOutsideEvent(event) {
    if (!safeZone?.anchor && !safeZone?.dismissable) {
      return;
    }

    if (!event.defaultPrevented) {
      hasInteractedOutsideRef.current = true;
      if (event.detail.originalEvent.type === "pointerdown") {
        hasPointerDownOutsideRef.current = true;
      }
    }

    const target = event.target as HTMLElement;

    if (event.detail.originalEvent.type === "pointerdown") {
      const targetIsTrigger =
        safeZone?.anchor?.contains(target) || target === safeZone?.anchor;
      if (targetIsTrigger) {
        event.preventDefault();
      }
    } else {
      const targetIsNotTrigger =
        target instanceof HTMLElement &&
        ![safeZone?.anchor, safeZone?.dismissable].some(
          (element) => element?.contains(target as Node),
        ) &&
        !target.contains(safeZone?.dismissable ?? null);

      if (!targetIsNotTrigger) {
        event.preventDefault();
      }
    }

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
    let lastIndex = -1;

    descendants.values().forEach((obj, _index) => {
      if (obj.disableOutsidePointerEvents) {
        lastIndex = _index;
      }
    });

    /**
     * Makes sure we stop event at the highest layer with pointer events disabled.
     * If not checked, we risk closing every layer when clicking outside.
     */
    const isPointerEventsEnabled = index > lastIndex;
    if (!isPointerEventsEnabled) {
      return;
    }

    onPointerDownOutside?.(event);
    onInteractOutside?.(event);

    safeZone && handleOutsideEvent(event);
    if (!event.defaultPrevented && onDismiss) {
      onDismiss();
    }
  }, ownerDocument);

  const focusOutside = useFocusOutside((event) => {
    onFocusOutside?.(event);
    onInteractOutside?.(event);

    safeZone && handleOutsideEvent(event);
    if (!event.defaultPrevented && onDismiss) {
      onDismiss();
    }
  }, ownerDocument);

  useEscapeKeydown((event) => {
    /**
     * Most nested element will always be last in the descendants list.
     */
    const isHighestLayer = index === descendants.count() - 1;
    if (!isHighestLayer) {
      return;
    }

    onEscapeKeyDown?.(event);
    if (!event.defaultPrevented && onDismiss) {
      event.preventDefault();
      onDismiss();
    }
  }, ownerDocument);

  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      ref={mergedRefs}
      {...rest}
      onFocusCapture={focusOutside.onFocusCapture}
      onBlurCapture={focusOutside.onBlurCapture}
      onPointerDownCapture={pointerDownOutside.onPointerDownCapture}
    >
      {children}
    </Comp>
  );
};

export default DismissableLayerNode;
