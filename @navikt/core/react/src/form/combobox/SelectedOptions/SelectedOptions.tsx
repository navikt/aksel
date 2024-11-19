import cl from "clsx";
import React from "react";
import { Chips } from "../../../chips";
import { useInputContext } from "../Input/Input.context";
import { ComboboxOption } from "../types";
import { useSelectedOptionsContext } from "./selectedOptionsContext";

interface SelectedOptionsProps {
  selectedOptions?: ComboboxOption[];
  size?: "medium" | "small";
  children: React.ReactNode;
}

const Option = ({ option }: { option: ComboboxOption }) => {
  const { isMultiSelect, removeSelectedOption } = useSelectedOptionsContext();
  const { focusInput, readOnly, inputProps } = useInputContext();

  const onClick = (e) => {
    e.stopPropagation();
    removeSelectedOption(option);
    focusInput();
  };

  if (!isMultiSelect) {
    return (
      <div className="navds-combobox__selected-options--no-bg">
        {option.label}
      </div>
    );
  }

  return readOnly || inputProps.disabled ? (
    <Chips.Toggle variant="neutral" checkmark={false} as="div">
      {option.label}
    </Chips.Toggle>
  ) : (
    <Chips.Removable onClick={onClick}>{option.label}</Chips.Removable>
  );
};

const SelectedOptions: React.FC<SelectedOptionsProps> = ({
  selectedOptions = [],
  size,
  children,
}) => {
  const { value } = useInputContext();
  const { isMultiSelect } = useSelectedOptionsContext();
  return (
    <Chips
      className={cl("navds-combobox__selected-options", {
        "navds-combobox__selected-options--single-select": !isMultiSelect,
      })}
      size={size}
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
