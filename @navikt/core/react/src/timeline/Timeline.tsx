import cl from "clsx";
import React, { forwardRef } from "react";
import InfoStep, { TimelineInfoStepProps, TimelineInfoStepType } from "./Info";

export interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  /**
   * <Timeline.Step /> elements
   */
  children: React.ReactNode;
  /**
   * Current active step.
   * @note Timeline index starts at 1, not 0
   */
  activeStep: number;
}

interface TimelineComponent
  extends React.ForwardRefExoticComponent<
    TimelineProps & React.RefAttributes<HTMLOListElement>
  > {
  Info: TimelineInfoStepType;
}

export const Timeline: TimelineComponent = forwardRef<
  HTMLOListElement,
  TimelineProps
>(({ children, className, activeStep, ...rest }, ref) => {
  return (
    <ol {...rest} ref={ref} className={cl("navds-timeline", className)}>
      {React.Children.map(children, (step, index) => {
        return (
          <li
            className={cl("navds-timeline__item", {
              "navds-timeline__item--present":
                React.isValidElement<TimelineInfoStepProps>(step) &&
                step.props.time === "present",
              "navds-timeline__item--future":
                React.isValidElement<TimelineInfoStepProps>(step) &&
                step.props.time === "future",
              "navds-timeline__item--past":
                React.isValidElement<TimelineInfoStepProps>(step) &&
                step.props.time === "past",
            })}
            key={index + (children?.toString?.() ?? "")}
          >
            <span className="navds-timeline__line navds-timeline__line--1" />
            {React.isValidElement<TimelineInfoStepProps>(step)
              ? React.cloneElement(step, {
                  ...step.props,
                })
              : step}
            <span className="navds-timeline__line navds-timeline__line--2" />
          </li>
        );
      })}
    </ol>
  );
}) as TimelineComponent;

Timeline.Info = InfoStep;

export default Timeline;
