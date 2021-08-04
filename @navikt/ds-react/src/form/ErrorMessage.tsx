import React from "react";
import cl from "classnames";

const ErrorMessage = (props) => (
  <div
    {...props}
    className={cl("navds-label", "navds-error-message", props.className, {
      "navds-label--s": props.size === "s",
      "navds-error-message--s": props.size === "s",
    })}
  />
);

export default ErrorMessage;
