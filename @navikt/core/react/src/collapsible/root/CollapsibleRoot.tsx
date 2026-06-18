import React, { forwardRef, useCallback } from "react";
import { useId } from "../../utils-external";
import { Slot } from "../../utils/components/slot/Slot";
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
   * ### unmount
   * The content will not be rendered until the collapsible is opened.
   *
   * ### hidden
   * The content will be rendered but hidden with the `hidden` attribute (`display: none`).
   *
   * ### hiddenUntilFound
   * Same as `hidden`, except that `hidden="until-found"` will be used if the browser supports it.
   *
   * The content will expand if a `beforematch` event is triggered, which happens when
   * fragment navigation or the browser's "Find in page" feature causes a scroll to the content.
   *
   * **NB:** Since React currently doesn't support setting `hidden="until-found"`, we have to set it
   * manually in a `useEffect`. This means that fragment navigation will not work on the first render.
   * (I.e. `<a href="/different-page#elm-inside-closed-collapsible">` won't work, but
   * `<a href="#elm-inside-closed-collapsible">` should work.)
   *
   * @see [MDN docs about the `hidden` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/hidden#the_hidden_until_found_state)
   *
   * @default "unmount"
   */
  closedBehavior?: "unmount" | "hidden" | "hiddenUntilFound";
  /**
   * When true, will render element as its child. This merges classes, styles and event handlers.
   * @default false
   */
  asChild?: boolean;
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
      closedBehavior = "unmount",
      asChild,
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
    const Comp = asChild ? Slot : "div";

    return (
      <CollapsibleContextProvider
        open={_open}
        onOpenToggle={useCallback(
          () => setOpen((prevOpen) => !prevOpen),
          [setOpen],
        )}
        contentId={`collapsible-content-${internalId}`}
        triggerId={`collapsible-trigger-${internalId}`}
        closedBehavior={closedBehavior}
        state={state}
      >
        <Comp ref={ref} data-state={state} {...rest}>
          {children}
        </Comp>
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
