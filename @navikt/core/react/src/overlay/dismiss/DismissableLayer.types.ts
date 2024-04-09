import { CSSProperties } from "react";
import { WithAsChild } from "../../util/types/WithAsChild";

export type CustomFocusEvent = CustomEvent<{ originalEvent: FocusEvent }>;
export type CustomPointerDownEvent = CustomEvent<{
  originalEvent: PointerEvent;
}>;

interface DismissableLayerBaseProps {
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
   * @note safeZone.dismissable is only needed when its element does not have a `tabIndex`
   * since it will not receive focus-events.
   * TODO: Review if we can add tabIndex back to floating-elements.
   */
  safeZone?: {
    anchor?: Element | null;
    dismissable?: Element | null;
  };

  style?: CSSProperties;
  /**
   * Disables layer from beeing counted in context for nested `DismissableLayer`.
   * @note Besides `onEscapeKeyDown`, onDismiss and other event handlers will still work.
   */
  enabled: boolean;
}

export type DismissableLayerProps = WithAsChild<DismissableLayerBaseProps>;
