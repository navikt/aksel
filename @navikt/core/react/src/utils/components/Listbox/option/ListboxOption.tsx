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
  /**
   * Whether the option currently has virtual focus. Based on the value from
   * `setVirtuallyFocusedOptionId`, usually `virtuallyFocusedOptionId === id`.
   */
  hasVirtualFocus: boolean;
  /**
   * Unique ID of the Listbox instance.
   * Used to generate an ID for the option that currently has virtual focus.
   */
  listboxId: string;
  /**
   * Triggered when option is selected.
   */
  onClick: React.MouseEventHandler<HTMLDivElement>;
  /**
   * TODO: There might be cases where we don't want to set this,
   * but then we should probably use a different role.
   */
  "aria-selected": boolean;
  children: React.ReactNode;
}

function ListboxOption({
  id,
  hasVirtualFocus,
  listboxId,
  "aria-selected": ariaSelected,
  children,
  className,
  ...rest
}: ListboxOptionProps) {
  return (
    <div
      {...rest}
      className={cl("aksel-listbox__option", className)}
      role="option"
      aria-selected={ariaSelected} // Added explicitly to satisfy eslint rule
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
