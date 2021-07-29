import React from "react";
import cl from "classnames";

const Description = (props) => (
  <div
    {...props}
    className={cl("navds-form__description", "navds-body-short", {
      "navds-body--s": props.size === "s",
    })}
  />
);

export default Description;
