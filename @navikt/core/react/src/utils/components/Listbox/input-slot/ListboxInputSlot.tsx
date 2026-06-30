import React from "react";
import { Slot } from "../../slot/Slot";
import { useListboxContext } from "../root/ListboxContext";

interface ListboxInputSlotProps {
  children: React.ReactElement;
}

const ListboxInputSlot = ({ children }: ListboxInputSlotProps) => {
  const { activeId } = useListboxContext();
  return (
    <Slot
      aria-activedescendant={activeId} // TODO: Check if it's a problem that this is set even when no option has virtual focus
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
