import React, { forwardRef, useEffect, useRef, useState } from "react";
import cl from "classnames";
import "@navikt/ds-css/stepper/index.css";
import { StepContext } from "./Stepper";

export interface StepperStepProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  index?: number;
}

const StepperStep = forwardRef<HTMLDivElement, StepperStepProps>(
  ({ children, className, index, ...rest }, ref) => {
    return (
      <StepContext.Consumer>
        {({ orientation, activeStep }) => (
          <div
            ref={ref}
            className={cl(`navds-stepper__step--${orientation}`, className)}
            {...rest}
          >
            <span className={`navds-stepper__stepInner--${orientation}`}>
              <span className="navds-stepper__stepInner__number">{index}</span>
              {/* Here goes StepperLabel/StepperContent */}
              {/* This is the step-wrapper */}
              {/* Insert Step-circle here with correct number */}
              {children}
            </span>
          </div>
        )}
      </StepContext.Consumer>
    );
  }
);

export default StepperStep;
