import React, { createContext, forwardRef } from "react";
import cl from "clsx";
import Step, { TimelineStepProps, TimelineStepType } from "./Step";

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
  Step: TimelineStepType;
}

interface TimelineContextProps {
  activeStep: number;
  lastIndex: number;
}

export const TimelineContext = createContext<TimelineContextProps | null>(null);

export const Timeline: TimelineComponent = forwardRef<
  HTMLOListElement,
  TimelineProps
>(({ children, className, activeStep, ...rest }, ref) => {
  return (
    <ol {...rest} ref={ref} className={cl("navds-timeline", className)}>
      <TimelineContext.Provider
        value={{
          activeStep: activeStep - 1,
          lastIndex: React.Children.count(children),
        }}
      >
        {React.Children.map(children, (step, index) => {
          return (
            <li
              className={cl("navds-timeline__item")}
              key={index + (children?.toString?.() ?? "")}
            >
              <span className="navds-timeline__line navds-timeline__line--1" />
              {React.isValidElement<TimelineStepProps>(step)
                ? React.cloneElement(step, {
                    ...step.props,
                    unsafe_index: index,
                  })
                : step}
              <span className="navds-timeline__line navds-timeline__line--2" />
            </li>
          );
        })}
      </TimelineContext.Provider>
    </ol>
  );
}) as TimelineComponent;

Timeline.Step = Step;

export default Timeline;
