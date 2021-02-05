import React, { forwardRef, useEffect, useRef, useState } from "react";
import cl from "classnames";
import "@navikt/ds-css/stepper/index.css";
import { OrientationContext } from "./Stepper";

export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Step = forwardRef<HTMLDivElement, StepProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <OrientationContext.Consumer>
        {(value) => (
          <div
            ref={ref}
            className={cl(`navds-stepper__step--${value}`, className)}
            {...rest}
          >
            <span className={`navds-stepper__stepInner--${value}`}>
              {children}
            </span>
          </div>
        )}
      </OrientationContext.Consumer>
    );
  }
);

export default Step;
