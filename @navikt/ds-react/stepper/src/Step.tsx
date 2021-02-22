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
    status?: "none" | "done" | "warning" | "inProgress";
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
    const getIcon = (colorful) => {
      switch (status) {
        case "done":
          return (
            <SuccessFilled
              style={{
                color: disabled ? "#B7B1A9" : colorful ? "#06893A" : undefined,
                backgroundColor: "white",
              }}
            />
          );
        case "warning":
          return (
            <WarningFilled
              style={{
                color: disabled ? "#B7B1A9" : colorful ? "#FFA733" : undefined,
                background: disabled
                  ? "white"
                  : colorful
                  ? "radial-gradient(circle,var(--navds-color-darkgray) 50%,0,transparent)"
                  : "white",
                borderRadius: "1rem",
              }}
            />
          );
        case "inProgress":
          return (
            <ClockFilled
              style={{
                color: disabled ? "#B7B1A9" : colorful ? "#0C5EA8" : undefined,
                backgroundColor: "white",
              }}
            />
          );
        default:
          return <div />;
      }
    };

    return (
      <StepContext.Consumer>
        {({ colorful, activeStep }) => (
          <Component
            ref={ref}
            className={cl(className, `navds-step`, {
              "navds-step--disabled": disabled,
              "navds-step--active": activeStep === index,
              "navds-step--before-active": index < activeStep,
            })}
            disabled={Component === "button" && disabled}
            {...rest}
          >
            <span
              className={cl("navds-step__indicator", {
                "navds-step--no-shadow": status !== "none",
              })}
            >
              {status === "none" ? index + 1 : getIcon(colorful)}
            </span>
            <div className={cl("navds-step__label")}>{children}</div>
          </Component>
        )}
      </StepContext.Consumer>
    );
  }
);

export default StepperStep;
