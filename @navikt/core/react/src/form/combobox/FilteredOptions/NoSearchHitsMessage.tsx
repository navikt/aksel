import React from "react";
import { useRenameCSS } from "../../../theme/Theme";
import { useInputContext } from "../Input/Input.context";
import filteredOptionsUtil from "./filtered-options-util";

const NoSearchHitsMessage = () => {
  const { cn } = useRenameCSS();

  const {
    inputProps: { id },
  } = useInputContext();

  return (
    <div
      className={cn("navds-combobox__list-item--no-options")}
      id={filteredOptionsUtil.getNoHitsId(id)}
    >
      Ingen søketreff
    </div>
  );
};

export default NoSearchHitsMessage;
