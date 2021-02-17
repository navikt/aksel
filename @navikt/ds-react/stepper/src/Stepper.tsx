import React, {
  createContext,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import cl from "classnames";
import StepperStep from "./Step";
import "@navikt/ds-css/stepper/index.css";

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  children:
    | React.ReactElement<typeof StepperStep>
    | Array<React.ReactElement<typeof StepperStep>>;
  orientation?: "horizontal" | "vertical";
  activeStep?: number;
  onClick?: (event) => void;
}

export const StepContext = createContext({
  orientation: "horizontal",
  active: 0,
  onClick: (event) => null,
  interactive: false,
});

const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      children,
      className,
      orientation = "horizontal",
      activeStep,
      onClick,
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

    const context = {
      orientation,
      active,
      onClick: (e) => handleClick(e),
      interactive: onClick ? true : false,
    };

    return (
      <div
        ref={ref}
        className={cl(
          "navds-stepper",
          `navds-stepper--${orientation}`,
          className
        )}
        {...rest}
      >
        <StepContext.Provider value={context}>
          {stepsWithIndex}
        </StepContext.Provider>
      </div>
    );
  }
);

export default Stepper;
