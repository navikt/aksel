import React from "react";
import { useRenameCSS } from "../../../theme/Theme";
import { useI18n } from "../../../util/i18n/i18n.hooks";
import { useInputContext } from "../Input/Input.context";
import { useSelectedOptionsContext } from "../SelectedOptions/selectedOptionsContext";
import filteredOptionsUtil from "./filtered-options-util";

const MaxSelectedMessage = () => {
  const { cn } = useRenameCSS();
  const {
    inputProps: { id },
  } = useInputContext();
  const { maxSelected, selectedOptions } = useSelectedOptionsContext();
  const translate = useI18n("Combobox");

  return (
    <div
      className={cn("navds-combobox__list-item--max-selected")}
      id={filteredOptionsUtil.getMaxSelectedOptionsId(id)}
    >
      {translate("maxSelected", {
        selected: selectedOptions.length,
        limit: maxSelected.limit || 0,
      })}
    </div>
  );
};

export default MaxSelectedMessage;
