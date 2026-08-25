import React, { useCallback } from "react";
import { Listbox } from "../../../utils/components/Listbox/root/ListboxRoot";
import { useDeferredValue, useEventCallback } from "../../../utils/hooks";
import { ComboboxGroup } from "../group/ComboboxGroup";
import { ComboboxItem } from "../option/ComboboxOption";
import { useComboboxPopupContext } from "../popup/ComboboxPopup";
import {
  type ComboboxGroupData,
  type ComboboxItemData,
  type ResolveItem,
  useComboboxRootContext,
} from "../root/ComboboxRoot";

interface ComboboxListProps<
  T extends ComboboxItemData | ComboboxGroupData<ComboboxItemData>,
> {
  children?:
    React.ReactNode | ((itemOrGroup: ResolveItem<T> | T) => React.ReactNode); // TODO: Blir litt rart at children-funksjonen må håndtere både items og grupper. (Usikker på om typen for itemOrGroup er riktig også.)
}

function ComboboxList<
  T extends ComboboxItemData | ComboboxGroupData<ComboboxItemData>,
>({ children }: ComboboxListProps<T>) {
  /*const [isPending, startTransition] = useTransition();
  const [renderItems, setRenderItems] = useState(true); // TODO: Prop for å aktivere "async rendering", ev. basert på antall options.
  useEffect(() => {
    if (renderItems) {
      return;
    }
    startTransition(() => {
      setRenderItems(true);
    });
  }, []);*/

  return (
    <Listbox.Options className="aksel-combobox2__list">
      {/*isPending && (
        <div className="aksel-combobox2__loading" role="status">
          Laster...
        </div>
      )*/}
      <ComboboxListContent<T>>{children}</ComboboxListContent>
    </Listbox.Options>
  );
}

function ComboboxListContent<
  T extends ComboboxItemData | ComboboxGroupData<ComboboxItemData>,
>({ children }: ComboboxListProps<T>) {
  const { virtuallyFocusedItemValue, filterString } = useComboboxPopupContext();
  const {
    setOpen,
    items,
    selectedItems,
    onToggleItem,
    multiselect,
    triggerRef,
  } = useComboboxRootContext();
  const memoizedOnToggleItem = useEventCallback(onToggleItem);
  const deferredFilterString = useDeferredValue(filterString);

  const localOnToggleItem = useCallback(
    (item: ComboboxItemData, isSelected: boolean) => {
      memoizedOnToggleItem(item, isSelected);
      if (!multiselect) {
        setOpen(false);
        triggerRef.current?.focus();
      }
    },
    [memoizedOnToggleItem, multiselect, triggerRef, setOpen],
  );

  if (children && typeof children !== "function") {
    return children;
  }

  const filteredItems = deferredFilterString
    ? filterItems(items, deferredFilterString)
    : items;

  if (filteredItems.length === 0) {
    return (
      <div className="aksel-combobox2__no-results" role="status">
        Ingen treff
      </div>
    );
  }

  return filteredItems.map((itemOrGroup) =>
    "items" in itemOrGroup ? (
      <ComboboxGroup
        key={itemOrGroup.id}
        group={itemOrGroup}
        childrenProp={children}
      >
        {itemOrGroup.items.map((item) => (
          <ComboboxItem
            key={item.value}
            item={item}
            onToggleItem={localOnToggleItem}
            isSelected={selectedItems.includes(item.value)}
            hasVirtualFocus={virtuallyFocusedItemValue === item.value}
            filterString={deferredFilterString}
          >
            {children as ComboboxListProps<typeof item>["children"]}
          </ComboboxItem>
        ))}
      </ComboboxGroup>
    ) : (
      <ComboboxItem
        key={itemOrGroup.value}
        item={itemOrGroup}
        onToggleItem={localOnToggleItem}
        isSelected={selectedItems.includes(itemOrGroup.value)}
        hasVirtualFocus={virtuallyFocusedItemValue === itemOrGroup.value}
        filterString={deferredFilterString} // TODO: Vurder å kunne slå av dette for bedre ytelse
      >
        {children as ComboboxListProps<typeof itemOrGroup>["children"]}
      </ComboboxItem>
    ),
  );
}

function filterItems<T extends ComboboxItemData>(
  items: (T | ComboboxGroupData<T>)[],
  filterString: string,
): (T | ComboboxGroupData<T>)[] {
  const filterStringLowerCase = filterString.toLocaleLowerCase();

  return items
    .map((itemOrGroup) => {
      if ("items" in itemOrGroup) {
        const matchingItems = itemOrGroup.items.filter((item) =>
          item.label.toLocaleLowerCase().includes(filterStringLowerCase),
        );
        if (matchingItems.length > 0) {
          return { ...itemOrGroup, items: matchingItems };
        }
        return null;
      }
      if (
        itemOrGroup.label.toLocaleLowerCase().includes(filterStringLowerCase)
      ) {
        return itemOrGroup;
      }
      return null;
    })
    .filter((item): item is T | ComboboxGroupData<T> => item !== null);
}

export type { ComboboxListProps };
export { ComboboxList };
