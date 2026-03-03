/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/** biome-ignore-all lint/a11y/useKeyWithMouseEvents: We know what we are doing */
import React from "react";
import { cl } from "../../../helpers";
import { useEventCallback } from "../../../hooks";
import { useDeferredValue } from "../../../hooks/useDeferredValue";
import { ListboxGroup } from "../group/ListboxGroup";
import { ListboxItem, type ListboxItemProps } from "../item/ListboxItem";

export type ListboxItemData = {
  label: string;
  value: string;
};

export type ListboxGroupData<T extends ListboxItemData> = {
  label: string;
  id: string;
  items: T[];
};

/** Resolves the item type based on whether the input is a group or a single item */
type ResolveListboxItem<
  T extends ListboxItemData | ListboxGroupData<ListboxItemData>,
> = T extends ListboxItemData
  ? T
  : T extends ListboxGroupData<infer U>
    ? U
    : never;

export interface ListboxListBaseProps<
  T extends ListboxItemData | ListboxGroupData<ListboxItemData>,
> {
  children?:
    | React.ReactNode
    | ((itemOrGroup: ResolveListboxItem<T> | T) => React.ReactNode);
  virtuallyFocusedItemValue: string;
  setVirtuallyFocusedItemValue: (value: string) => void;
  items: T[];
  selectedItems?: ResolveListboxItem<T>["value"][];
  onToggleItem: ListboxItemProps<ResolveListboxItem<T>>["onToggleItem"];
  textToHighlight?: string;
}

export type ListboxListProps<
  T extends ListboxItemData | ListboxGroupData<ListboxItemData>,
> = ListboxListBaseProps<T> &
  Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "role" | "tabIndex" | "onMouseOver" | "children"
  >;

function ListboxList<
  T extends ListboxItemData | ListboxGroupData<ListboxItemData>,
>({
  children,
  virtuallyFocusedItemValue,
  setVirtuallyFocusedItemValue,
  items,
  selectedItems,
  onToggleItem,
  textToHighlight,
  ...rest
}: ListboxListProps<T>) {
  return (
    <div
      {...rest}
      className={cl(rest.className, "aksel-listbox__list")}
      role="listbox"
      tabIndex={-1}
      onMouseOver={(event) => {
        const target = event.target as HTMLElement;
        const itemEl: HTMLElement | null = target.closest('[role="option"]');
        if (itemEl) {
          setVirtuallyFocusedItemValue(itemEl?.dataset.value || "");
        }
      }}
    >
      <ListboxContent
        virtuallyFocusedItemValue={virtuallyFocusedItemValue}
        items={items}
        selectedItems={selectedItems}
        onToggleItem={onToggleItem}
        textToHighlight={textToHighlight}
      >
        {children}
      </ListboxContent>
    </div>
  );
}

export { ListboxList };

type ListboxContentProps<
  T extends ListboxItemData | ListboxGroupData<ListboxItemData>,
> = Omit<ListboxListBaseProps<T>, "setVirtuallyFocusedItemValue">;

function ListboxContent<
  T extends ListboxItemData | ListboxGroupData<ListboxItemData>,
>({
  children,
  items,
  selectedItems = [],
  onToggleItem,
  virtuallyFocusedItemValue,
  textToHighlight,
}: ListboxContentProps<T>) {
  const memoizedOnToggleItem = useEventCallback(
    onToggleItem as ListboxItemProps<ListboxItemData>["onToggleItem"],
  );
  const deferredTextToHighlight = useDeferredValue(textToHighlight ?? "");

  if (children && typeof children !== "function") {
    // TODO: Add support for composition (maybe)
    return children;
  }

  return items.map((itemOrGroup) =>
    "items" in itemOrGroup ? (
      <ListboxGroup
        key={itemOrGroup.id}
        group={itemOrGroup}
        childrenProp={children}
      >
        {itemOrGroup.items.map((item) => (
          <ListboxItem
            key={item.value}
            item={item}
            onToggleItem={memoizedOnToggleItem}
            isSelected={selectedItems.includes(item.value)}
            hasVirtualFocus={virtuallyFocusedItemValue === item.value}
            textToHighlight={deferredTextToHighlight}
          >
            {typeof children === "function" ? children(item as T) : null}
          </ListboxItem>
        ))}
      </ListboxGroup>
    ) : (
      <ListboxItem
        key={itemOrGroup.value}
        item={itemOrGroup}
        onToggleItem={memoizedOnToggleItem}
        isSelected={selectedItems.includes(itemOrGroup.value)}
        hasVirtualFocus={virtuallyFocusedItemValue === itemOrGroup.value}
        textToHighlight={deferredTextToHighlight}
      >
        {typeof children === "function" ? children(itemOrGroup as T) : null}
      </ListboxItem>
    ),
  );
}
