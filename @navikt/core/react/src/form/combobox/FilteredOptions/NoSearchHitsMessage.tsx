import React from "react";
import { useRenameCSS } from "../../../theme/Theme";
import { useI18n } from "../../../util/i18n/i18n.hooks";
import { useInputContext } from "../Input/Input.context";
import filteredOptionsUtil from "./filtered-options-util";

const NoSearchHitsMessage = () => {
  const { cn } = useRenameCSS();

  const translate = useI18n("Combobox");

  const {
    inputProps: { id },
  } = useInputContext();

  return (
    <div
      className={cn("navds-combobox__list-item--no-options")}
      id={filteredOptionsUtil.getNoHitsId(id)}
    >
      {translate("noOptions")}
    </div>
  );
};

export default NoSearchHitsMessage;
