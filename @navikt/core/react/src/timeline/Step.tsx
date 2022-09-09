import { SuccessFilled } from "@navikt/ds-icons";
import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import { Label } from "..";
import { TimelineContext } from "./Timeline";

export interface TimelineStepProps
  extends React.AnchorHTMLAttributes<HTMLDivElement> {
  /**
   * Text content by indicator
   */
  children: string;
  /**
   * Handled by Timeline, overwriting may break component logic
   * @private
   */
  unsafe_index?: number;
}

export interface TimelineStepType
  extends React.ForwardRefExoticComponent<
    TimelineStepProps & React.RefAttributes<HTMLDivElement>
  > {}

export const StepComponent = forwardRef<HTMLDivElement, TimelineStepProps>(
  ({ className, children, unsafe_index = 0, ...rest }, ref) => {
    const context = useContext(TimelineContext);

    if (context === null) {
      console.error("<Timeline.Step> has to be used within <Timeline>");
      return null;
    }
    const { activeStep } = context;

    return (
      <div
        {...rest}
        aria-current={activeStep === unsafe_index}
        ref={ref}
        className={cl("navds-timeline__step", className, {
          "navds-timeline__step--active": activeStep === unsafe_index,
        })}
      >
        <SuccessFilled
          aria-hidden
          className="navds-timeline__circle navds-timeline__circle--success"
        />
        <Label as="span" className="navds-timeline__content">
          {children}
        </Label>
      </div>
    );
  }
);

const Step = StepComponent as TimelineStepType;

export default Step;
