import React from "react";
import cl from "classnames";
import { forwardRef } from "react";
import { Fieldset, FieldsetProps } from "..";

export interface CheckboxGroupProps extends FieldsetProps {}

const CheckboxGroup = forwardRef<HTMLFieldSetElement, CheckboxGroupProps>(
  ({ className, children, ...rest }, ref) => (
    <Fieldset
      {...rest}
      ref={ref}
      className={cl(className, "navds-checkbox-group")}
    >
      <div className="navds-checkboxes">{children}</div>
    </Fieldset>
  )
);

export default CheckboxGroup;
