import React from "react";
import { Slot } from "../../slot/Slot";

interface ListboxInputSlotProps {
  /**
   * Unique ID of the Listbox instance.
   * Used to generate an ID for the option that currently has virtual focus.
   */
  listboxId: string;
  children: React.ReactElement;
}

const ListboxInputSlot = ({ children, listboxId }: ListboxInputSlotProps) => {
  return (
    <Slot
      aria-activedescendant={`aksel-listbox-${listboxId}-active`}
      // @ts-expect-error - You are meant to use an <input>, but Slot doesn't know that.
      autoComplete="off"
      role="combobox"
    >
      {children}
    </Slot>
  );
};

export { ListboxInputSlot };
export type { ListboxInputSlotProps };
