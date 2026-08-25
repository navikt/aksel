import React, { useRef, useState } from "react";
import { useId } from "../../../utils-external";
import { Floating } from "../../../utils/components/floating/Floating";
import { createStrictContext } from "../../../utils/helpers";
import type { ComboboxItemProps } from "../option/ComboboxOption";

/** Resolves the item type based on whether the parameter is a group or a single item */
export type ResolveItem<
  T extends ComboboxItemData | ComboboxGroupData<ComboboxItemData>,
> = T extends ComboboxItemData
  ? T
  : T extends ComboboxGroupData<infer U>
    ? U
    : never;

export type ComboboxItemData = {
  label: string;
  value: string;
};

export type ComboboxGroupData<T extends ComboboxItemData> = {
  label: string;
  id: string;
  items: T[];
};

export interface ComboboxRootProps<
  T extends ComboboxItemData | ComboboxGroupData<ComboboxItemData> =
    ComboboxItemData | ComboboxGroupData<ComboboxItemData>,
> {
  children: React.ReactNode;
  /**
   * Can be either an array of items ({@link ComboboxItemData})
   * or an array of groups ({@link ComboboxGroupData}) containing items.
   *
   * NB: It is not recommended to mix single items and groups, but if you do,
   * put the single items first.
   */
  items: T[];
  selectedItems: ResolveItem<T>["value"][];
  onToggleItem: ComboboxItemProps<ResolveItem<T>>["onToggleItem"]; // TODO: Vurder å tilby onChange som returnerer valgte verdier
  defaultOpen?: boolean;
  multiselect?: boolean; // TODO: Vurder annet navn
  triggerId?: string;
  /**
   * @default "medium"
   */
  size?: "small" | "medium";
}

/* Alternativt:
  items: (T | ComboboxGroupData<T>)[];
  selectedItems: T["value"][];
  onToggleItem: ComboboxItemProps<T>["onToggleItem"];
*/

export interface ComboboxRootContextProps {
  open: boolean;
  setOpen: (newOpen: boolean) => void;
  triggerRef: React.RefObject<HTMLDivElement | null>;
  items: (ComboboxItemData | ComboboxGroupData<ComboboxItemData>)[]; // Can't use generics in contexts
  selectedItems: ComboboxItemData["value"][];
  onToggleItem: ComboboxItemProps<ComboboxItemData>["onToggleItem"]; // Can't use generics in contexts
  multiselect: boolean;
  triggerId: string;
  size: "small" | "medium";
}

export const {
  Provider: ComboboxRootContextProvider,
  useContext: useComboboxRootContext,
} = createStrictContext<ComboboxRootContextProps>({
  name: "ComboboxRootContext",
  errorMessage: "The component must be used within <Combobox.Root>",
});

export function ComboboxRoot<
  T extends ComboboxItemData | ComboboxGroupData<ComboboxItemData>,
>({
  children,
  items,
  selectedItems,
  onToggleItem,
  defaultOpen = false,
  multiselect = true,
  triggerId: triggerIdProp,
  size = "medium",
}: ComboboxRootProps<T>) {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(defaultOpen);
  const triggerId = useId(triggerIdProp);

  return (
    <div className="aksel-combobox2" data-size={size}>
      <ComboboxRootContextProvider
        open={open}
        setOpen={setOpen}
        triggerRef={triggerRef}
        items={items}
        selectedItems={selectedItems}
        onToggleItem={onToggleItem as ComboboxRootContextProps["onToggleItem"]}
        multiselect={multiselect}
        triggerId={triggerId}
        size={size}
      >
        <Floating>{children}</Floating>
      </ComboboxRootContextProvider>
    </div>
  );
}
