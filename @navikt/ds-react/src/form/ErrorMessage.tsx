import React from "react";
import cl from "classnames";
import { Label } from "../index";

const ErrorMessage = (props) => (
  <Label
    {...props}
    component="div"
    className={cl(
      "navds-error-message",
      props.className,
      `navds-error-message--${props.size ?? "m"}`
    )}
  />
);

export default ErrorMessage;
