import React from "react";
import { useId } from "../../../../utils-external";
import type {
  ListboxGroupData,
  ListboxItemData,
  ListboxListBaseProps,
} from "../list/ListboxList";

interface ListboxGroupProps<
  T extends ListboxItemData | ListboxGroupData<ListboxItemData>,
> {
  group: ListboxGroupData<ListboxItemData>;
  childrenProp: ListboxListBaseProps<T>["children"];
  children: React.ReactNode;
}

function ListboxGroup<
  T extends ListboxItemData | ListboxGroupData<ListboxItemData>,
>({ group, childrenProp, children }: ListboxGroupProps<T>) {
  const labelId = useId();

  return (
    <div
      role="group"
      className="aksel-listbox__group"
      aria-labelledby={labelId}
    >
      <div id={labelId} aria-hidden>
        {typeof childrenProp === "function"
          ? childrenProp(group as T)
          : group.label}
      </div>
      {children}
    </div>
  );
}

export { ListboxGroup };
