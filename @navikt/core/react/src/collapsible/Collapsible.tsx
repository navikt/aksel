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
   * @see 🏷️ {@link CollapsibleTriggerProps}
   */
  Trigger: typeof CollapsibleTrigger;
  /**
   * @see 🏷️ {@link CollapsibleContentProps}
   */
  Content: typeof CollapsibleContent;
}

export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  (
    {
      children,
      open,
      defaultOpen = false,
      onOpenChange,
      disabled,
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

    const contentId = useId();

    return (
      <CollapsibleContextProvider
        open={_open}
        disabled={disabled}
        onOpenToggle={useCallback(
          () => setOpen((prevOpen) => !prevOpen),
          [setOpen],
        )}
        contentId={contentId}
        lazy={lazy}
      >
        <div ref={ref} data-state={_open ? "open" : "closed"} {...rest}>
          {children}
        </div>
      </CollapsibleContextProvider>
    );
  },
) as CollapsibleComponent;

Collapsible.Trigger = CollapsibleTrigger;
Collapsible.Content = CollapsibleContent;

export default Collapsible;
