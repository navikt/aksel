import React, { forwardRef, useState } from "react";
import { Slot } from "../../../util/Slot";
import { composeEventHandlers } from "../../../util/composeEventHandlers";
import { useMergeRefs } from "../../../util/hooks";
import { useDescendant } from "../DismissableLayer.context";
import { DismissableLayerProps } from "../DismissableLayer.types";
import { useEscapeKeydown } from "./hooks/useEscapeKeydown";
import { useFocusOutside } from "./hooks/useFocusOutside";
import { usePointerDownOutside } from "./hooks/usePointerDownOutside";

const DismissableLayerNode = forwardRef<HTMLDivElement, DismissableLayerProps>(
  (
    {
      children,
      asChild,
      disableOutsidePointerEvents = false,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      onDismiss,

      ...rest
    }: DismissableLayerProps,
    ref,
  ) => {
    const { register, index, descendants } = useDescendant({
      disableOutsidePointerEvents,
    });

    const [node, setNode] = useState<HTMLDivElement | null>(null);
    const ownerDocument = node?.ownerDocument ?? globalThis?.document;

    const mergedRefs = useMergeRefs(ref, (_node) => setNode(_node), register);

    /* const isPointerEventsEnabled = index >= highestLayerWithOutsidePointerEventsDisabledIndex; */

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
      if (!event.defaultPrevented && onDismiss) {
        onDismiss();
      }
    }, ownerDocument);

    const focusOutside = useFocusOutside((event) => {
      onFocusOutside?.(event);
      onInteractOutside?.(event);
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
        onFocusCapture={composeEventHandlers(
          rest.onFocusCapture,
          focusOutside.onFocusCapture,
        )}
        onBlurCapture={composeEventHandlers(
          rest.onBlurCapture,
          focusOutside.onBlurCapture,
        )}
        onPointerDownCapture={composeEventHandlers(
          rest.onPointerDownCapture,
          pointerDownOutside.onPointerDownCapture,
        )}
      >
        {children}
      </Comp>
    );
  },
);

export default DismissableLayerNode;
