import React from "react";
import { useI18n } from "../../../util/i18n/i18n.context";
import { useInputContext } from "../Input/Input.context";
import { useSelectedOptionsContext } from "../SelectedOptions/selectedOptionsContext";
import filteredOptionsUtil from "./filtered-options-util";

const MaxSelectedMessage = () => {
  const {
    inputProps: { id },
  } = useInputContext();
  const { maxSelected, selectedOptions } = useSelectedOptionsContext();
  const translate = useI18n(
    "Combobox",
    maxSelected?.message ? { maxSelected: maxSelected.message } : undefined,
  );

  if (!maxSelected) {
    return null;
  }

  return (
    <div
      className="navds-combobox__list-item--max-selected"
      id={filteredOptionsUtil.getMaxSelectedOptionsId(id)}
    >
      {translate("maxSelected", {
        selected: selectedOptions.length,
        limit: maxSelected.limit,
      })}
    </div>
  );
};

export default MaxSelectedMessage;
