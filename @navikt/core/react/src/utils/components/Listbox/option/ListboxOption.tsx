import React from "react";
import { cl } from "../../../helpers";

export interface ListboxOptionProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "role" | "tabIndex"
> {
  /**
   * Unique ID used for tracking which option has virtual focus.
   */
  id: string;
  hasVirtualFocus: boolean;
  children: React.ReactNode;
  /**
   * Callback when option is selected.
   * To improve performance when you have many options,
   * memoize the prop with e.g. useEventCallback.
   */
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

function ListboxOptionComponent({
  id,
  hasVirtualFocus,
  children,
  className,
  ...rest
}: ListboxOptionProps) {
  //console.log("Rendering option", id);

  // TODO: Slot?

  return (
    <div
      aria-selected={false}
      {...rest}
      className={cl("aksel-listbox__option", className)}
      role="option"
      tabIndex={-1}
      data-virtual-focus={hasVirtualFocus}
      data-id={id}
      id={hasVirtualFocus ? "aksel-listbox__option-active" : undefined}
    >
      {children}
    </div>
  );
}

/**
 * This component is memoized. To improve performance when you have many options,
 * make sure all object props have stable references (i.e. memoize the event handlers with e.g. useEventCallback).
 *
 * NB: Remember to set `aria-selected` on selected options!
 */
export const ListboxOption = React.memo(
  ListboxOptionComponent,
) as typeof ListboxOptionComponent;
