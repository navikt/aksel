import React, { createContext, forwardRef, useEffect, useState } from "react";
import cl from "classnames";
import StepperStep from "./Step";
import "@navikt/ds-css/stepper/index.css";

export interface StepperProps extends React.OlHTMLAttributes<HTMLOListElement> {
  children:
    | React.ReactElement<typeof StepperStep>
    | Array<React.ReactElement<typeof StepperStep>>;
  orientation?: "horizontal" | "vertical";
  activeStep?: number;
  onClick?: (event) => void;
  colorful?: boolean;
  dot?: boolean;
}

export const StepContext = createContext({
  orientation: "horizontal",
  active: 0,
  onClick: (event) => null,
  interactive: false,
  colorful: false,
  dot: false,
});

/*
 * TODO: Kode steps i <ol><li>
 */
const Stepper = forwardRef<HTMLUListElement, StepperProps>(
  (
    {
      children,
      className,
      orientation = "horizontal",
      activeStep,
      onClick,
      colorful = false,
      dot = false,
      ...rest
    },
    ref
  ) => {
    const [active, setActive] = useState(0);

    useEffect(() => {
      if (activeStep) {
        setActive(activeStep);
      }
    }, [activeStep]);

    const handleClick = (e) => {
      if (activeStep && onClick) {
        onClick(e);
      } else if (onClick) {
        setActive(e.target.value);
        onClick(e);
      }
      return null;
    };

    const steps = React.Children.toArray(children);
    const stepsWithIndex = steps.map(
      (step: React.ReactElement<typeof StepperStep>, index) => {
        return React.cloneElement(step, {
          ...{ index, last: steps.length === index + 1 },
          ...step.props,
        });
      }
    );

    const context = () => {
      return {
        orientation,
        active,
        onClick: (e) => handleClick(e),
        interactive: onClick ? true : false,
        colorful,
        dot,
      };
    };

    return (
      <ol
        ref={ref}
        className={cl(`navds-stepper--${orientation}`, className)}
        {...rest}
      >
        <StepContext.Provider value={context()}>
          {stepsWithIndex}
        </StepContext.Provider>
      </ol>
    );
  }
);

export default Stepper;
