import React, { forwardRef, useCallback } from "react";
import { useId } from "../../utils-external";
import { useControllableState } from "../../utils/hooks";
import CollapsibleContent, {
  CollapsibleContentProps,
} from "../content/CollapsibleContent";
import CollapsibleTrigger, {
  CollapsibleTriggerProps,
} from "../trigger/CollapsibleTrigger";
import { CollapsibleContextProvider } from "./CollapsibleRoot.context";

interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
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

interface CollapsibleComponent extends React.ForwardRefExoticComponent<
  CollapsibleProps & React.RefAttributes<HTMLDivElement>
> {
  /**
   * @see 🏷️ {@link CollapsibleTriggerProps}
   */
  Trigger: typeof CollapsibleTrigger;
  /**
   * @see 🏷️ {@link CollapsibleContentProps}
   */
  Content: typeof CollapsibleContent;
}

/**
 * Collapsible is a component that allows you to toggle visibility of content.
 *
 * @example
 * ```jsx
 * <Collapsible>
 *   <Collapsible.Trigger>Trigger</Collapsible.Trigger>
 *   <Collapsible.Content>
 *     Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
 *     corporis maxime aliquam, voluptates nobis numquam, non odit optio
 *     architecto iure laborum possimus! Quibusdam sit ullam, consequatur sunt
 *     tempore optio aliquid!
 *   </Collapsible.Content>
 * </Collapsible>
 * ```
 *
 * @example With asChild
 * ```jsx
 * <Collapsible>
 *   <Collapsible.Trigger asChild>
 *     <Button>Button</Button>
 *   </Collapsible.Trigger>
 *   <Collapsible.Content asChild>
 *     <Box padding="space-16" background="info-soft">
 *       <div>lorem ipsum</div>
 *     </Box>
 *   </Collapsible.Content>
 * </Collapsible>
 * ```
 */
export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  (
    {
      children,
      open,
      defaultOpen = false,
      onOpenChange,
      lazy = false,
      ...rest
    },
    ref,
  ) => {
    const [_open, setOpen] = useControllableState({
      value: open,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });

    const internalId = useId();
    const state = _open ? "open" : "closed";

    return (
      <CollapsibleContextProvider
        open={_open}
        onOpenToggle={useCallback(
          () => setOpen((prevOpen) => !prevOpen),
          [setOpen],
        )}
        contentId={`collapsible-content-${internalId}`}
        triggerId={`collapsible-trigger-${internalId}`}
        lazy={lazy}
        state={state}
      >
        <div ref={ref} data-state={state} {...rest}>
          {children}
        </div>
      </CollapsibleContextProvider>
    );
  },
) as CollapsibleComponent;

Collapsible.Trigger = CollapsibleTrigger;
Collapsible.Content = CollapsibleContent;

export default Collapsible;
export { CollapsibleTrigger, CollapsibleContent };
export type {
  CollapsibleProps,
  CollapsibleTriggerProps,
  CollapsibleContentProps,
};
