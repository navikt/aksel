import React, { forwardRef, useEffect, useRef, useState } from "react";
import cl from "classnames";
import "@navikt/ds-css/stepper/index.css";
import { StepContext } from "./Stepper";

export interface StepperStepProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  index?: number;
  last?: boolean;
  status?: "none" | "done" | "warning" | "inProgress";
}

const StepperStep = forwardRef<HTMLDivElement, StepperStepProps>(
  (
    { children, className, index, last = false, status = "none", ...rest },
    ref
  ) => {
    return (
      <StepContext.Consumer>
        {({ orientation, activeStep }) => (
          <>
            <div
              ref={ref}
              className={cl(`navds-stepper__step--${orientation}`, className)}
              {...rest}
            >
              {/* Line */}
              {!last && (
                <div
                  aria-hidden
                  className={`navds-stepper__step--line--${orientation}`}
                />
              )}
              {orientation === "horizontal" ? (
                <div className="navds-stepper__step--horizontal--wrapper">
                  <span className="navds-stepper__stepInner__number">
                    {index}
                  </span>
                  <div className="navds-stepper__stepinner__label">
                    {children}
                  </div>
                </div>
              ) : (
                <>
                  <span className="navds-stepper__stepInner__number">
                    {index}
                  </span>
                  {/* Here goes StepperLabel/StepperContent */}
                  {/* This is the step-wrapper */}
                  {/* Insert Step-circle here with correct number */}
                  <div className="navds-stepper__stepinner__label">
                    {children}
                  </div>
                </>
              )}
            </div>

            {/* {orientation === "vertical" && !last && (
              <div className="navds-stepper__step--line--vertical">
                <span
                  className={`navds-stepper__stepInner--line--${orientation}`}
                />
              </div>
            )} */}
          </>
        )}
      </StepContext.Consumer>
    );
  }
);

export default StepperStep;
