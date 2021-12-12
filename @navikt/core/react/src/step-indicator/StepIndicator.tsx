import React, { forwardRef, useRef } from "react";
import cl from "classnames";
import Step, { StepIndicatorStepType } from "./Step";

export interface StepIndicatorProps {
  children: React.ReactNode;
  className?: string;
}

interface StepIndicatorComponent
  extends React.ForwardRefExoticComponent<
    StepIndicatorProps & React.RefAttributes<HTMLDivElement>
  > {
  Step: StepIndicatorStepType;
}

const StepIndicator: StepIndicatorComponent = forwardRef<
  HTMLDivElement,
  StepIndicatorProps
>(({ children, className, ...rest }, ref) => {
  return <div ref={ref} {...rest}></div>;
}) as StepIndicatorComponent;

StepIndicator.Step = Step;

export default StepIndicator;
