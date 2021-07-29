import React from "react";
import cl from "classnames";

const Label = (props) => (
  <label
    {...props}
    className={cl("navds-form__label", "navds-label", {
      "navds-label--s": props.size === "s",
    })}
  />
);

export default Label;
