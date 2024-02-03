import React, { HTMLAttributes, forwardRef, useState } from "react";
import { Slot } from "../../util/Slot";
import { composeEventHandlers } from "../../util/composeEventHandlers";
import { useMergeRefs } from "../../util/hooks";
import { createDescendantContext } from "../../util/hooks/descendants/useDescendant";
import { useEscapeKeydown } from "./useEscapeKeydown";
import { useFocusOutside } from "./useFocusOutside";

interface DismissableLayerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
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
  onPointerDownOutside?: (event: PointerEvent) => void;
  /**
   * Event handler called when the focus moves outside of the `DismissableLayer`.
   * Can be prevented.
   */
  onFocusOutside?: (event: FocusEvent) => void;
  /**
   * Event handler called when an interaction happens outside the `DismissableLayer`.
   * Specifically, when a `pointerdown` event happens outside or focus moves outside of it.
   * Can be prevented.
   */
  onInteractOutside?: (event: PointerEvent | FocusEvent) => void;
  /**
   * Handler called when the `DismissableLayer` should be dismissed
   */
  onDismiss?: () => void;
  /**
   *
   */
  asChild?: boolean;
}

const [
  DescendantsProvider,

  useDescendantsContext,
  useDescendants,
  useDescendant,
] = createDescendantContext<HTMLDivElement, { value?: string }>();

const DismissableLayerImpl = forwardRef<HTMLDivElement, DismissableLayerProps>(
  (
    {
      children,
      asChild,
      /* disableOutsidePointerEvents, */
      onEscapeKeyDown,
      /* onPointerDownOutside, */
      onFocusOutside,
      onInteractOutside,
      onDismiss,

      ...rest
    }: DismissableLayerProps,
    ref,
  ) => {
    const { register, index, descendants } = useDescendant();

    const [node, setNode] = useState<HTMLDivElement | null>(null);
    const ownerDocument = node?.ownerDocument ?? globalThis?.document;

    const mergedRefs = useMergeRefs(ref, (_node) => setNode(_node), register);

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
      if (!isHighestLayer) return;

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
      >
        {children}
      </Comp>
    );
  },
);

const DismissableRoot = ({ children }) => {
  const descendants = useDescendants();

  return (
    <DescendantsProvider value={descendants}>{children}</DescendantsProvider>
  );
};

const DismissableLayer = forwardRef<HTMLDivElement, DismissableLayerProps>(
  (props, ref) => {
    const context = useDescendantsContext();

    return context ? (
      <DismissableLayerImpl ref={ref} {...props} />
    ) : (
      <DismissableRoot>
        <DismissableLayerImpl ref={ref} {...props} />
      </DismissableRoot>
    );
  },
);

export default DismissableLayer;
