import React from "react";
import cl from "classnames";
import { Label } from "..";

const ErrorMessage = (props) => (
  <Label
    {...props}
    component="div"
    className={cl(
      "navds-error-message",
      props.className,
      `navds-error-message--${props.size ?? "medium"}`
    )}
  />
);

export default ErrorMessage;
