import React, { forwardRef, useCallback } from "react";
import { useControllableState, useId } from "../util/hooks";
import { CollapsibleContextProvider } from "./Collapsible.context";
import { CollapsibleBaseProps } from "./Collapsible.types";
import CollapsibleContent from "./parts/Collapsible.Content";
import CollapsibleTrigger from "./parts/Collapsible.Trigger";

export interface CollapsibleProps
  extends CollapsibleBaseProps,
    React.HTMLAttributes<HTMLDivElement> {}

interface CollapsibleComponent
  extends React.ForwardRefExoticComponent<
    CollapsibleProps & React.RefAttributes<HTMLDivElement>
  > {
  /**
   * @see 🏷️ {@link CollapsibleProps}
   */
  Root: React.ForwardRefExoticComponent<
    CollapsibleProps & React.RefAttributes<HTMLDivElement>
  >;
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
 *     <Box padding="4" background="surface-alt-3-subtle">
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

Collapsible.Root = Collapsible;
Collapsible.Trigger = CollapsibleTrigger;
Collapsible.Content = CollapsibleContent;

export default Collapsible;
