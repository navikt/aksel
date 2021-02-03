import React, { forwardRef, useEffect, useRef, useState } from "react";
import cl from "classnames";
import "@navikt/ds-css/stepper/index.css";

export interface StepProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Step = forwardRef<HTMLDivElement, StepProps>(
  ({ children, className, ...rest }, ref) => {
    return <div>step</div>;
  }
);

export default Step;
