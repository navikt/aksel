import React from "react";
import { Chips } from "../../../chips";
import { useFilteredOptionsContext } from "../FilteredOptions/filteredOptionsContext";
import { useInputContext } from "../Input/inputContext";
import { ComboboxOption } from "../types";
import { useSelectedOptionsContext } from "./selectedOptionsContext";

interface SelectedOptionsProps {
  selectedOptions?: ComboboxOption[];
  size?: "medium" | "small";
  children: React.ReactNode;
}

const Option = ({ option }: { option: ComboboxOption }) => {
  const { isMultiSelect, removeSelectedOption } = useSelectedOptionsContext();
  const { focusInput } = useInputContext();

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

  return <Chips.Removable onClick={onClick}>{option.label}</Chips.Removable>;
};

const SelectedOptions: React.FC<SelectedOptionsProps> = ({
  selectedOptions = [],
  size,
  children,
}) => {
  const { toggleIsListOpen } = useFilteredOptionsContext();
  return (
    <Chips
      className="navds-combobox__selected-options"
      onFocus={() => toggleIsListOpen(false)}
      size={size}
    >
      {selectedOptions.length
        ? selectedOptions.map((option, i) => (
            <Option key={option.label + i} option={option} />
          ))
        : []}
      {children}
    </Chips>
  );
};

export default SelectedOptions;
