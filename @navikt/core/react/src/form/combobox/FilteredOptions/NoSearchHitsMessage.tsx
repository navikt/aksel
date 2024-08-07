import React from "react";
import { useInputContext } from "../Input/Input.context";
import filteredOptionsUtil from "./filtered-options-util";

const NoSearchHitsMessage = () => {
  const {
    inputProps: { id },
  } = useInputContext();
  return (
    <div
      className="navds-combobox__list-item--no-options"
      id={filteredOptionsUtil.getNoHitsId(id)}
    >
      Ingen søketreff
    </div>
  );
};

export default NoSearchHitsMessage;
