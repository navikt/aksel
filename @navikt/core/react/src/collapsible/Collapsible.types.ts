export interface CollapsibleBaseProps {
  /**
   * The open state of the collapsible when it is initially rendered. Use when you do not need to control its open state.
   */
  defaultOpen?: boolean;
  /**
   * The controlled open state of the collapsible. Must be used in conjunction with onOpenChange.
   */
  open?: boolean;
  /**
   * Event handler called when the open state of the collapsible changes.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Render the collapsible content lazily. This means that the content will not be rendered until the collapsible is open.
   * @default false
   */
  lazy?: boolean;
}
