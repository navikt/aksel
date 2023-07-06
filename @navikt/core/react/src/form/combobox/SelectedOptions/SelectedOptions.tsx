import React from "react";
import { Chips } from "../../..";
import { useSelectedOptionsContext } from "./selectedOptionsContext";

interface SelectedOptionsProps {
  selectedOptions?: string[];
  children: React.ReactNode;
}

const Option = ({ option }: { option: string }) => {
  const { isMultiSelect, removeSelectedOption } = useSelectedOptionsContext();

  const onClick = (e) => {
    e.stopPropagation();
    removeSelectedOption(option);
  };

  if (!isMultiSelect) {
    return (
      <div className="navds-combobox__selected-options--no-bg">{option}</div>
    );
  }

  return <Chips.Removable onClick={onClick}>{option}</Chips.Removable>;
};

const SelectedOptions: React.FC<SelectedOptionsProps> = ({
  selectedOptions = [],
  children,
}) => {
  return (
    <Chips className="navds-combobox__selected-options">
      {selectedOptions.length
        ? selectedOptions.map((option, i) => (
            <Option key={option + i} option={option} />
          ))
        : []}
      {children}
    </Chips>
  );
};

export default SelectedOptions;
