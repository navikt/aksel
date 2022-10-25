import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import { BodyLong, Label } from "..";
import { TimelineContext } from "./Timeline";

export interface TimelineStepProps
  extends React.AnchorHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Handled by Timeline, overwriting breaks component logic
   * @private
   */
  __unsafe_index?: number;
  /**
   *
   */
  icon: React.ElementType;
}

export interface TimelineStepType
  extends React.ForwardRefExoticComponent<
    TimelineStepProps & React.RefAttributes<HTMLDivElement>
  > {}

export const StepComponent = forwardRef<HTMLDivElement, TimelineStepProps>(
  (
    { className, children, __unsafe_index = 0, icon: Icon, title, ...rest },
    ref
  ) => {
    const context = useContext(TimelineContext);

    if (context === null) {
      console.error("<Timeline.Step> has to be used within <Timeline>");
      return null;
    }
    const { activeStep } = context;

    return (
      <div
        {...rest}
        aria-current={activeStep === __unsafe_index}
        ref={ref}
        className={cl("navds-timeline__step", className, {
          "navds-timeline__step--active": activeStep === __unsafe_index,
        })}
      >
        <div className="navds-timeline__icon">
          <Icon aria-hidden />
        </div>
        <div className="navds-timeline__content">
          <Label as="div" className="navds-timeline__content-label">
            {title}
          </Label>
          <BodyLong as="div" className="navds-timeline__content-description">
            {children}
          </BodyLong>
        </div>
      </div>
    );
  }
);

const Step = StepComponent as TimelineStepType;

export default Step;
