import React from "react";
import { Chips } from "../../..";
import { useSelectedOptionsContext } from "./selectedOptionsContext";

interface SelectedOptionsProps {
  selectedOptions?: string[];
  size?: "medium" | "small";
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
  size,
  children,
}) => {
  return (
    <Chips className="navds-combobox__selected-options" size={size}>
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
