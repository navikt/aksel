import React, { useRef, useState } from "react";
import { Floating } from "../../../utils/components/floating/Floating";
import { cl, createStrictContext } from "../../../utils/helpers";
import type { FormFieldProps } from "../../useFormField";
import type { ComboboxOptionProps } from "../option/ComboboxOption";

type HtmlAttributes = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  | "onChange"
  | "defaultChecked"
  | "autoCapitalize"
  | "contentEditable"
  | "enterKeyHint"
  | "spellCheck"
  | "inputMode"
  | "autoCorrect"
  | "autoSave"
  | "color"
  | "results"
  | "security"
  | "unselectable"
  | "popover"
  | "popoverTargetAction"
  | "popoverTarget"
>;

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
>
  extends Pick<FormFieldProps, "disabled" | "size">, HtmlAttributes {
  children: React.ReactNode;
  /**
   * Can be either an array of options ({@link ComboboxOptionData})
   * or an array of groups ({@link ComboboxGroupData}) containing options.
   *
   * NB: It is not recommended to mix single options and groups, but if you do,
   * put the single options first.
   */
  options: T[];
  /**
   * Value of the selected options.
   */
  value: ResolveOption<T>["value"][];
  /**
   * Called when an option is toggled.
   * @param option The option that was toggled.
   * @param isSelected The new selected state of the option.
   */
  onToggleOption: ComboboxOptionProps<ResolveOption<T>>["onToggleOption"];
  /**
   * Whether the combobox is open by default.
   */
  defaultOpen?: boolean;
  /**
   * Whether multiple options can be selected.
   * @default true
   */
  multiple?: boolean; // TODO: Hva skal være default?
}

export interface ComboboxRootContextProps {
  open: boolean;
  setOpen: (newOpen: boolean) => void;
  triggerRef: React.RefObject<HTMLDivElement | null>;
  options: ComboboxRootProps["options"];
  value: ComboboxRootProps["value"];
  onToggleOption: ComboboxRootProps["onToggleOption"];
  multiple: boolean;
  size: Exclude<ComboboxRootProps["size"], undefined>;
  disabled: ComboboxRootProps["disabled"];
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
  value,
  onToggleOption,
  defaultOpen = false,
  multiple = true,
  size = "medium",
  disabled,
  className,
  ...rest
}: ComboboxRootProps<T>) {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      {...rest}
      className={cl("aksel-combobox2", className)}
      data-size={size}
      data-disabled={disabled}
    >
      <ComboboxRootContextProvider
        open={open}
        setOpen={setOpen}
        triggerRef={triggerRef}
        options={options}
        value={value}
        onToggleOption={
          onToggleOption as ComboboxRootContextProps["onToggleOption"]
        }
        multiple={multiple}
        size={size}
        disabled={disabled}
      >
        <Floating>{children}</Floating>
      </ComboboxRootContextProvider>
    </div>
  );
}
