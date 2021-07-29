import React from "react";
import cl from "classnames";

const ErrorMessage = (props) => (
  <div
    {...props}
    className={cl("navds-label", "navds-form--error", {
      "navds-label--s": props.size === "s",
    })}
  />
);

export default ErrorMessage;
