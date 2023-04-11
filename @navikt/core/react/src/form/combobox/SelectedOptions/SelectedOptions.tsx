import React from "react";
import { Chips } from "../../..";

interface SelectedOptionsProps {
  selectedOptions: string[];
  handleDeleteSelectedOption: (option: string) => void;
  children: React.ReactNode;
}

const SelectedOptions: React.FC<SelectedOptionsProps> = ({
  selectedOptions,
  handleDeleteSelectedOption,
  children,
}) => {
  return (
    <Chips className="navds-combobox__selected-options">
      {selectedOptions.length
        ? selectedOptions.map((option, i) => (
            <Chips.Removable
              className="navds-combobox__selected-option"
              key={option + i}
              onMouseUp={(e) => {
                handleDeleteSelectedOption(option);
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") handleDeleteSelectedOption(option);
              }}
            >
              {option}
            </Chips.Removable>
          ))
        : []}
      {children}
    </Chips>
  );
};

export default SelectedOptions;
