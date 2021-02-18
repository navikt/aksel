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
}

const StepperStep = forwardRef<HTMLDivElement, StepperStepProps>(
  (
    { children, className, index = 0, last = false, status = "none", ...rest },
    ref
  ) => {
    const getIcon = (colorful) => {
      switch (status) {
        case "done":
          return (
            <SuccessFilled
              style={{ color: colorful ? "#06893A" : undefined }}
            />
          );
        case "warning":
          return (
            <WarningFilled
              style={{
                color: colorful ? "#FFA733" : undefined,
              }}
            />
          );
        case "inProgress":
          return (
            <ClockFilled style={{ color: colorful ? "#0C5EA8" : undefined }} />
          );
        default:
          return <div />;
      }
    };

    const handleClick = (onClick, e) => {
      e.target.value = index;
      onClick(e);
    };

    const newProps = (interactive, onClick) => {
      return {
        role: interactive ? "button" : undefined,
        tabIndex: interactive ? 0 : undefined,
        onClick: interactive ? (e) => handleClick(onClick, e) : undefined,
      };
    };

    const content = (activeStep, colorful, interactive) => (
      <>
        <span
          className={cl("navds-step__indicator", {
            "navds-step__indicator--active":
              status === "none" && activeStep === index,
            "navds-step--no-shadow": status !== "none",
          })}
        >
          {status === "none" ? index : getIcon(colorful)}
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
        }) => (
          <>
            <div
              ref={ref}
              className={cl(`navds-step`, className, {
                "navds-step--interactive": interactive,
              })}
              {...rest}
              {...newProps(interactive, onClick)}
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
                  {content(activeStep, colorful, interactive)}
                </div>
              ) : (
                <>{content(activeStep, colorful, interactive)}</>
              )}
            </div>
          </>
        )}
      </StepContext.Consumer>
    );
  }
);

export default StepperStep;
