import React from "react";
import { Chips } from "../../../chips";
import { useRenameCSS } from "../../../theme/Theme";
import { useInputContext } from "../Input/Input.context";
import { ComboboxOption } from "../types";
import { useSelectedOptionsContext } from "./selectedOptionsContext";

interface SelectedOptionsProps {
  selectedOptions?: ComboboxOption[];
  size?: "medium" | "small";
  children: React.ReactNode;
}

const Option = ({ option }: { option: ComboboxOption }) => {
  const { cn } = useRenameCSS();

  const { isMultiSelect, removeSelectedOption } = useSelectedOptionsContext();
  const { focusInput, readOnly, inputProps } = useInputContext();

  if (!isMultiSelect) {
    return (
      <div className={cn("navds-combobox__selected-options--no-bg")}>
        {option.label}
      </div>
    );
  }

  if (readOnly || inputProps.disabled) {
    return (
      <Chips.Toggle
        data-color="neutral"
        variant="neutral"
        checkmark={false}
        as="div"
      >
        {option.label}
      </Chips.Toggle>
    );
  }

  return (
    <Chips.Removable
      onClick={(event) => {
        event.stopPropagation();
        removeSelectedOption(option);
        focusInput();
      }}
    >
      {option.label}
    </Chips.Removable>
  );
};

const SelectedOptions: React.FC<SelectedOptionsProps> = ({
  selectedOptions = [],
  size,
  children,
}) => {
  const { cn } = useRenameCSS();
  const { value } = useInputContext();
  const { isMultiSelect } = useSelectedOptionsContext();
  return (
    <Chips
      className={cn("navds-combobox__selected-options")}
      size={size}
      data-type={isMultiSelect ? "multiple" : "single"}
    >
      {value.length === 0 || (isMultiSelect && selectedOptions.length)
        ? selectedOptions.map((option, i) => (
            <Option key={option.label + i} option={option} />
          ))
        : []}
      {children}
    </Chips>
  );
};

export default SelectedOptions;
