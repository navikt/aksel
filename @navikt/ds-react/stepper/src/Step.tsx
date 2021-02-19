import { ClockFilled, SuccessFilled, WarningFilled } from "@navikt/ds-icons";
import cl from "classnames";
import React, { forwardRef } from "react";
import { StepContext } from "./Stepper";

import "@navikt/ds-css/button/index.css";
import "@navikt/ds-css/stepper/index.css";

export interface StepperStepProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  index?: number;
  last?: boolean;
  status?: "none" | "done" | "warning" | "inProgress";
  disabled?: boolean;
}

const StepperStep = forwardRef<HTMLDivElement, StepperStepProps>(
  (
    {
      children,
      className,
      index = 0,
      last = false,
      status = "none",
      disabled,
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
                  : undefined,
                borderRadius: !disabled ? "1rem" : "0px",
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

    const handleClick = (onClick, e) => {
      e.target.value = index;
      onClick(e);
    };

    const newProps = (interactive, onClick, disabled) => {
      return {
        role: interactive ? "button" : undefined,
        tabIndex: !disabled ? (interactive ? 0 : undefined) : undefined,
        onClick: !disabled
          ? interactive
            ? (e) => handleClick(onClick, e)
            : undefined
          : undefined,
      };
    };

    const content = (activeStep, colorful, interactive, dot) => (
      <>
        <span
          className={cl("navds-step__indicator", {
            "navds-step__indicator--active":
              (status === "none" || dot) && activeStep === index,
            "navds-step--no-shadow": status !== "none" && !dot,
          })}
        >
          {!dot && (status === "none" ? index + 1 : getIcon(colorful))}
        </span>
        <div
          className={cl("navds-step__label", {
            "navds-step__label--active": activeStep === index,
            "navds-step__label--interactive": interactive,
          })}
        >
          {children}
        </div>
      </>
    );

    return (
      <StepContext.Consumer>
        {({
          orientation,
          active: activeStep,
          onClick,
          interactive,
          colorful,
          dot,
        }) => (
          <>
            <div
              ref={ref}
              className={cl(`navds-step`, className, {
                "navds-step__dot": dot,
                "navds-step--interactive": interactive,
                "navds-step--disabled": disabled,
              })}
              {...rest}
              {...newProps(interactive, onClick, disabled)}
            >
              {!last && (
                <div
                  aria-hidden
                  className={cl(`navds-step__line`, {
                    "navds-step__line--light": index >= activeStep,
                  })}
                />
              )}

              {orientation === "horizontal" ? (
                <div className="navds-step--horizontal-wrapper">
                  {content(activeStep, colorful, interactive, dot)}
                </div>
              ) : (
                <>{content(activeStep, colorful, interactive, dot)}</>
              )}
            </div>
          </>
        )}
      </StepContext.Consumer>
    );
  }
);

export default StepperStep;
