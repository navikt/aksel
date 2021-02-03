import React, { forwardRef, useEffect, useRef, useState } from "react";
import cl from "classnames";
import "@navikt/ds-css/stepper/index.css";

export interface StepperProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  ({ children, className, ...rest }, ref) => {
    return <div>stepper</div>;
  }
);

export default Stepper;
