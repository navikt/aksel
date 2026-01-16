import React from "react";
import { Loader } from "../../../loader";
import { useI18n } from "../../../util/i18n/i18n.hooks";
import { useInputContext } from "../Input/Input.context";
import filteredOptionsUtil from "./filtered-options-util";

const LoadingMessage = () => {
  const {
    inputProps: { id },
  } = useInputContext();
  const translate = useI18n("Combobox");

  return (
    <div
      className="aksel-combobox__list-item--loading"
      id={filteredOptionsUtil.getIsLoadingId(id)}
    >
      <Loader title={translate("loading")} />
    </div>
  );
};

export default LoadingMessage;
