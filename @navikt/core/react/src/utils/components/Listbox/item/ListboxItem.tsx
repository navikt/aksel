import React from "react";
import { cl } from "../../../helpers";

export interface ListboxItemProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "role" | "tabIndex"
> {
  /**
   * Unique ID used for tracking which item has virtual focus.
   */
  id: string;
  hasVirtualFocus: boolean;
  children: React.ReactNode;
  /**
   * Callback when item is selected.
   * To improve performance when you have many items,
   * memoize the prop with e.g. useEventCallback.
   */
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

function ListboxItemComponent({
  id,
  hasVirtualFocus,
  children,
  className,
  ...rest
}: ListboxItemProps) {
  //console.log("Rendering item", id);

  // TODO: Slot?

  return (
    <div
      aria-selected={false}
      {...rest}
      className={cl("aksel-listbox__item", className)}
      role="option"
      tabIndex={-1}
      data-virtual-focus={hasVirtualFocus}
      data-id={id}
      id={hasVirtualFocus ? "aksel-listbox__item-active" : undefined}
    >
      {children}
    </div>
  );
}

/**
 * This component is memoized. To improve performance when you have many items,
 * make sure all object props have stable references (i.e. memoize the event handlers with e.g. useEventCallback).
 *
 * NB: Remember to set `aria-selected` on selected items!
 */
export const ListboxItem = React.memo(
  ListboxItemComponent,
) as typeof ListboxItemComponent;
