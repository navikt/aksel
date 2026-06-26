import React from "react";
import { cl } from "../../../helpers";

export interface ListboxOptionProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "role" | "tabIndex" | "onSelect"
> {
  /**
   * Unique ID used for tracking which option has virtual focus.
   */
  id: string;
  /**
   * Whether the option currently has virtual focus. Based on the value from
   * `setVirtuallyFocusedOptionId`, usually `virtuallyFocusedOptionId === id`.
   *
   * (This check has to be done outside the component to avoid unnecessary
   * re-renders each time `virtuallyFocusedOptionId` changes.)
   */
  hasVirtualFocus: boolean;
  /**
   * Unique ID of the Listbox instance.
   * Used to generate an ID for the option that currently has virtual focus.
   */
  listboxId: string;
  /**
   * Callback when option is selected. Use a stable reference for better performance.
   */
  onClick: React.MouseEventHandler<HTMLDivElement>;
  children: React.ReactNode;
}

function ListboxOption({
  id,
  hasVirtualFocus,
  listboxId,
  children,
  className,
  ...rest
}: ListboxOptionProps) {
  //console.log(Date.now(), "Rendering option", id); // eslint-disable-line react-hooks/purity

  return (
    <div
      aria-selected={false}
      {...rest}
      className={cl("aksel-listbox__option", className)}
      role="option"
      tabIndex={-1}
      data-virtual-focus={hasVirtualFocus}
      data-id={id}
      id={hasVirtualFocus ? `aksel-listbox-${listboxId}-active` : undefined}
    >
      {children}
    </div>
  );
}

export { ListboxOption };
