import React from "react";
import { useInputContext } from "../Input/Input.context";
import { useSelectedOptionsContext } from "../SelectedOptions/selectedOptionsContext";
import filteredOptionsUtil from "./filtered-options-util";

const MaxSelectedMessage = () => {
  const {
    inputProps: { id },
  } = useInputContext();
  const { maxSelected, selectedOptions } = useSelectedOptionsContext();

  if (!maxSelected) {
    return null;
  }

  return (
    <div
      className="navds-combobox__list-item--max-selected"
      id={filteredOptionsUtil.getMaxSelectedOptionsId(id)}
    >
      {maxSelected.message ??
        `${selectedOptions.length} av ${maxSelected.limit} er valgt.`}
    </div>
  );
};

export default MaxSelectedMessage;
