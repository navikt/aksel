import { ClockFilled, SuccessFilled, WarningFilled } from "@navikt/ds-icons";
import cl from "classnames";
import React, { forwardRef } from "react";
import { StepContext } from "./Stepper";
import { OverridableComponent } from "../../util/src/index";

import "@navikt/ds-css/button/index.css";
import "@navikt/ds-css/stepper/index.css";

export interface StepperStepProps {
  props: {
    children: React.ReactNode;
    index?: number;
    last?: boolean;
    status?: "none" | "finished" | "warning" | "inProgress";
    disabled?: boolean;
  } & React.HTMLAttributes<HTMLLIElement>;
  defaultComponent: "span";
}

const StepperStep: OverridableComponent<StepperStepProps> = forwardRef(
  (
    {
      children,
      className,
      index = 0,
      last = false,
      status = "none",
      disabled = false,
      component: Component = "span",
      ...rest
    },
    ref
  ) => {
    const getIcon = () => {
      switch (status) {
        case "finished":
          return <SuccessFilled />;
        case "warning":
          return <WarningFilled />;
        case "inProgress":
          return <ClockFilled />;
        default:
          return <div />;
      }
    };

    return (
      <StepContext.Consumer>
        {({ colorful, activeStep }) => (
          <Component
            ref={ref}
            className={cl(className, `navds-step`, `navds-step--${status}`, {
              "navds-step--disabled": disabled,
              "navds-step--active": activeStep === index,
              "navds-step--before-active": index < activeStep,
              "navds-step--colorful": colorful,
            })}
            disabled={Component === "button" && disabled}
            {...rest}
          >
            <span
              className={cl("navds-step__indicator", {
                /* "navds-step--no-shadow": status !== "none", */
              })}
            >
              {status === "none" ? index + 1 : getIcon()}
            </span>
            <div className={cl("navds-step__label")}>{children}</div>
          </Component>
        )}
      </StepContext.Consumer>
    );
  }
);

export default StepperStep;
