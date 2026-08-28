import React from "react";
import { BodyShort } from "../../../../typography";
import { cl } from "../../../helpers";
import { useListboxContext } from "../root/Listbox.context";

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
  "aria-selected": ariaSelected,
  children,
  className,
  ...rest
}: ListboxOptionProps) {
  const { activeId, size } = useListboxContext();
  return (
    <BodyShort
      as="div"
      size={size}
      {...rest}
      className={cl("aksel-listbox__option", className)}
      role="option"
      aria-selected={ariaSelected} // Added explicitly to satisfy eslint rule
      tabIndex={-1}
      data-virtual-focus={hasVirtualFocus}
      data-id={id}
      id={hasVirtualFocus ? activeId : undefined}
    >
      <div className="aksel-listbox__option-inner">{children}</div>
    </BodyShort>
  );
}

export { ListboxOption };
