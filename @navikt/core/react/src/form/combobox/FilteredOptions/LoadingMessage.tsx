import React from "react";
import { Loader } from "../../../loader";
import { useInputContext } from "../Input/Input.context";
import filteredOptionsUtil from "./filtered-options-util";

const LoadingMessage = () => {
  const {
    inputProps: { id },
  } = useInputContext();
  return (
    <div
      className="navds-combobox__list-item--loading"
      id={filteredOptionsUtil.getIsLoadingId(id)}
    >
      <Loader title="Søker..." />
    </div>
  );
};

export default LoadingMessage;
