import React from "react";
import { Listbox } from "../../../utils/components/Listbox/root/ListboxRoot";
import type { ComboboxListProps } from "../list/ComboboxList";
import type { ComboboxGroupData, ComboboxItemData } from "../root/ComboboxRoot";

interface ComboboxGroupProps<
  T extends ComboboxItemData | ComboboxGroupData<ComboboxItemData>,
> {
  group: ComboboxGroupData<ComboboxItemData>;
  childrenProp: ComboboxListProps<T>["children"];
  children: React.ReactNode;
}

function ComboboxGroup<
  T extends ComboboxItemData | ComboboxGroupData<ComboboxItemData>,
>({ group, childrenProp, children }: ComboboxGroupProps<T>) {
  return (
    <Listbox.Group
      label={
        typeof childrenProp === "function"
          ? childrenProp(group as T)
          : group.label
      }
    >
      {children}
    </Listbox.Group>
  );
}

export { ComboboxGroup };
