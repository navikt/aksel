import React, { forwardRef } from "react";
import { composeEventHandlers } from "../../../util/composeEventHandlers";
import { MenuItem, MenuItemProps } from "../Menu";

type CheckedState = boolean | "indeterminate";

interface MenuCheckboxProps extends MenuItemProps {
  checked?: CheckedState;
  onCheckedChange?: (checked: boolean) => void;
}

export const MenuCheckbox = forwardRef(
  (
    { checked = false, onSelect, onCheckedChange, ...rest }: MenuCheckboxProps,
    ref,
  ) => {
    return (
      <MenuItem
        role="menuitemcheckbox"
        aria-checked={isIndeterminate(checked) ? "mixed" : checked}
        {...rest}
        ref={ref}
        data-state={getCheckedState(checked)}
        onSelect={composeEventHandlers<any>(
          onSelect,
          () => onCheckedChange?.(isIndeterminate(checked) ? true : !checked),
          { checkForDefaultPrevented: false },
        )}
      />
    );
  },
);

function isIndeterminate(checked?: CheckedState): checked is "indeterminate" {
  return checked === "indeterminate";
}

function getCheckedState(checked: CheckedState) {
  return isIndeterminate(checked)
    ? "indeterminate"
    : checked
      ? "checked"
      : "unchecked";
}
