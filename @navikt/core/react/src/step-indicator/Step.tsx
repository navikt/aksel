import React, { forwardRef } from "react";
import cl from "classnames";

export interface StepIndicatorStepProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export type StepIndicatorStepType = React.ForwardRefExoticComponent<
  StepIndicatorStepProps & React.RefAttributes<HTMLButtonElement>
>;

const Step: StepIndicatorStepType = forwardRef(
  ({ className, ...rest }, ref) => (
    <button
      {...rest}
      ref={ref}
      className={cl("navds-step-indicator__step", className)}
    />
  )
);

export default Step;
