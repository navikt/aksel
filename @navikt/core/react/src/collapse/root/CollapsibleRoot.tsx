import React, { forwardRef } from "react";

interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Controls if the collapsible panel is open.
   *
   * To render an uncontrolled collapsible, use the `defaultOpen` prop instead.
   */
  open?: boolean;
  /**
   * Defines if the collapsible panel is open by default.
   *
   * To render a controlled collapsible, use the `open` prop instead.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Event handler called when the panel is opened or closed.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * If `true`, the collapsible will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Allows the browser’s built-in page search to find and expand the panel contents.
   *
   * Overrides the `keepMounted` prop and uses `hidden="until-found"`
   * to hide the element without removing it from the DOM.
   *
   * @default false
   */
  hiddenUntilFound?: boolean;
  /**
   * Keeps element in the DOM while the panel is hidden if `true`.
   *
   * **This prop is ignored when `hiddenUntilFound` is used.**
   * @default false
   */
  keepMounted?: boolean;
}

const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ children, ...rest }: CollapsibleProps, forwardedRef) => {
    return (
      <div ref={forwardedRef} {...rest}>
        {children}
      </div>
    );
  },
);

export { Collapsible };
export type { CollapsibleProps };
