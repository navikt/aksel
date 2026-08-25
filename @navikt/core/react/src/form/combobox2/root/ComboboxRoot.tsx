import React, { useRef, useState } from "react";
import { useId } from "../../../utils-external";
import { Floating } from "../../../utils/components/floating/Floating";
import { createStrictContext } from "../../../utils/helpers";
import type { ComboboxOptionProps } from "../option/ComboboxOption";

/** Resolves the option type based on whether the parameter is a group or a single option */
export type ResolveOption<
  T extends ComboboxOptionData | ComboboxGroupData<ComboboxOptionData>,
> = T extends ComboboxOptionData
  ? T
  : T extends ComboboxGroupData<infer U>
    ? U
    : never;

export type ComboboxOptionData = {
  label: string;
  value: string;
};

export type ComboboxGroupData<T extends ComboboxOptionData> = {
  label: string;
  id: string;
  options: T[];
};

export interface ComboboxRootProps<
  T extends ComboboxOptionData | ComboboxGroupData<ComboboxOptionData> =
    ComboboxOptionData | ComboboxGroupData<ComboboxOptionData>,
> {
  children: React.ReactNode;
  /**
   * Can be either an array of options ({@link ComboboxOptionData})
   * or an array of groups ({@link ComboboxGroupData}) containing options.
   *
   * NB: It is not recommended to mix single options and groups, but if you do,
   * put the single options first.
   */
  options: T[];
  selectedOptions: ResolveOption<T>["value"][];
  onToggleOption: ComboboxOptionProps<ResolveOption<T>>["onToggleOption"]; // TODO: Vurder å tilby onChange som returnerer valgte verdier
  defaultOpen?: boolean;
  multiselect?: boolean; // TODO: Vurder annet navn
  triggerId?: string;
  /**
   * @default "medium"
   */
  size?: "small" | "medium";
}

/* Alternativt:
  options: (T | ComboboxGroupData<T>)[];
  selectedOptions: T["value"][];
  onToggleOption: ComboboxOptionProps<T>["onToggleOption"];
*/

export interface ComboboxRootContextProps {
  open: boolean;
  setOpen: (newOpen: boolean) => void;
  triggerRef: React.RefObject<HTMLDivElement | null>;
  options: (ComboboxOptionData | ComboboxGroupData<ComboboxOptionData>)[]; // Can't use generics in contexts
  selectedOptions: ComboboxOptionData["value"][];
  onToggleOption: ComboboxOptionProps<ComboboxOptionData>["onToggleOption"]; // Can't use generics in contexts
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
  T extends ComboboxOptionData | ComboboxGroupData<ComboboxOptionData>,
>({
  children,
  options,
  selectedOptions,
  onToggleOption,
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
        options={options}
        selectedOptions={selectedOptions}
        onToggleOption={
          onToggleOption as ComboboxRootContextProps["onToggleOption"]
        }
        multiselect={multiselect}
        triggerId={triggerId}
        size={size}
      >
        <Floating>{children}</Floating>
      </ComboboxRootContextProvider>
    </div>
  );
}
