import React from "react";
import { Slot } from "../../slot/Slot";

interface ListboxInputSlotProps {
  children: React.ReactElement;
}

const ListboxInputSlot = ({ children }: ListboxInputSlotProps) => {
  return (
    <Slot
      aria-activedescendant="aksel-listbox__item-active"
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
