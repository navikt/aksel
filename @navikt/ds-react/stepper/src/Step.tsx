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

    const content = (orientation, activeStep, index, interactive, colorful) => (
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
            <span
              className={cl("navds-stepper__stepInner__number", {
                "navds-stepper__stepInner__number--active":
                  status === "none" && activeStep === index,
                "navds-stepper__stepInner__number--no-shadow":
                  status !== "none",
                "navds-stepper__stepInner__number--interactive": interactive,
              })}
            >
              {status === "none" ? index : getIcon(colorful)}
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
            <span
              className={cl("navds-stepper__stepInner__number", {
                "navds-stepper__stepInner__number--active":
                  status === "none" && activeStep === index,
                "navds-stepper__stepInner__number--no-shadow":
                  status !== "none",
              })}
            >
              {status === "none" ? index : getIcon(colorful)}
            </span>
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
        {({ orientation, active, onClick, interactive, colorful }) => (
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
                  {content(orientation, active, index, interactive, colorful)}
                </button>
              ) : (
                content(orientation, active, index, interactive, colorful)
              )}
            </div>
          </>
        )}
      </StepContext.Consumer>
    );
  }
);

export default StepperStep;
