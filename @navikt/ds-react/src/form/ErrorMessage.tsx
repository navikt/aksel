import React from "react";
import cl from "classnames";
import { Label } from "../typography";

const ErrorMessage = (props) => (
  <Label
    {...props}
    component="div"
    className={cl("navds-error-message", props.className, {
      "navds-error-message--s": props.size === "s",
    })}
  />
);

export default ErrorMessage;
