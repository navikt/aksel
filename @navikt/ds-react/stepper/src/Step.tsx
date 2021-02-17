import React, { forwardRef, useEffect, useRef, useState } from "react";
import cl from "classnames";
import "@navikt/ds-css/stepper/index.css";
import "@navikt/ds-css/button/index.css";
import { StepContext } from "./Stepper";
import { SuccessFilled, WarningFilled, ClockFilled } from "@navikt/ds-icons";

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
    const getIcon = () => {
      switch (status) {
        case "done":
          return <SuccessFilled />;
        case "warning":
          return <WarningFilled />;
        case "inProgress":
          return <ClockFilled />;
        default:
          return <div />;
      }
    };

    const content = (orientation, activeStep, index, interactive) => (
      <>
        {!last && (
          <div
            aria-hidden
            className={cl(`navds-stepper__step--line--${orientation}`, {
              "navds-stepper__step--line--light": index >= activeStep,
            })}
          />
        )}

        {orientation === "horizontal" ? (
          <div className="navds-stepper__step--horizontal--wrapper">
            <span className="navds-stepper__stepInner__number">
              {status === "none" ? index : getIcon()}
            </span>
            <div
              className={cl("navds-stepper__stepinner__label", {
                "navds-stepper__step--active": activeStep === index,
                "navds-stepper__step--interactive--text": interactive,
              })}
            >
              {children}
            </div>
          </div>
        ) : (
          <>
            <span className="navds-stepper__stepInner__number">{index}</span>
            {/* Here goes StepperLabel/StepperContent */}
            {/* This is the step-wrapper */}
            {/* Insert Step-circle here with correct number */}
            <div
              className={cl("navds-stepper__stepinner__label", {
                "navds-stepper__step--active": activeStep === index,
              })}
            >
              {children}
            </div>
          </>
        )}
      </>
    );

    const handleClick = (onClick, e) => {
      e.target.value = index;
      onClick(e);
    };

    const newProps = (interactive, onClick) => {
      return {
        role: interactive ? "button" : "Div",
        tabIndex: interactive ? 0 : undefined,
        onClick: interactive ? (e) => handleClick(onClick, e) : undefined,
      };
    };

    return (
      <StepContext.Consumer>
        {({ orientation, active, onClick, interactive }) => (
          <>
            <div
              ref={ref}
              className={cl(`navds-stepper__step--${orientation}`, className, {
                "navds-stepper__step--interactive": interactive,
              })}
              {...rest}
              {...newProps(interactive, onClick)}
            >
              {false ? (
                <button
                  /* className="navds-button navds-button--secondary" */
                  className="navds-stepper__step__button"
                  onClick={(e) => handleClick(onClick, e)}
                >
                  {content(orientation, active, index, interactive)}
                </button>
              ) : (
                content(orientation, active, index, interactive)
              )}
            </div>
          </>
        )}
      </StepContext.Consumer>
    );
  }
);

export default StepperStep;
