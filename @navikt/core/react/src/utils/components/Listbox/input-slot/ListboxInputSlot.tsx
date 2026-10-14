import React from "react";
import { Slot } from "../../slot/Slot";
import { useListboxContext } from "../root/Listbox.context";

interface ListboxInputSlotProps {
  children: React.ReactElement;
  virtuallyFocusedOptionId: string;
}

const ListboxInputSlot = ({
  children,
  virtuallyFocusedOptionId,
}: ListboxInputSlotProps) => {
  const { optionIdPrefix } = useListboxContext();
  return (
    <Slot
      // NB: Using a static ID and just change which option has the ID does not work in Safari with VoiceOver.
      aria-activedescendant={
        virtuallyFocusedOptionId
          ? `${optionIdPrefix}-${virtuallyFocusedOptionId}`
          : undefined
      }
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
