import { HTMLAttributes } from "react";
import { WithAsChild } from "../../util/types/WithAsChild";

export type CustomFocusEvent = CustomEvent<{ originalEvent: FocusEvent }>;
export type CustomPointerDownEvent = CustomEvent<{
  originalEvent: PointerEvent;
}>;

interface DismissableLayerBaseProps extends HTMLAttributes<HTMLDivElement> {
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
}

export type DismissableLayerProps = WithAsChild<DismissableLayerBaseProps>;
