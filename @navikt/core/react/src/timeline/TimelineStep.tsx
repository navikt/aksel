import { Error, Success, Warning } from "@navikt/ds-icons";
import cl from "clsx";
import React, { forwardRef } from "react";
import { BodyLong, BodyShort, Heading } from "..";

type iconType = "success" | "warning" | "error" | React.ElementType;
export interface TimelineStepProps
  extends React.AnchorHTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode;
  /**
   *  When in the process is this
   */
  time: "present" | "future" | "past";
  /**
   * Short description of date. Example: DU ER HER 23. OKTOBER 2022
   */
  description?: string;
  /**
   * TimelineStep icon, accepts string or icon-element
   */
  icon: iconType;
}
// consider: a "variant" prop thats just an alias of "icon", if people want variant

export interface TimelineStepType
  extends React.ForwardRefExoticComponent<
    TimelineStepProps & React.RefAttributes<HTMLLIElement>
  > {}

const Icon = ({ icon }: { icon: iconType }) => {
  switch (icon) {
    case "success":
      return (
        <Success
          aria-hidden
          title="feil"
          color="var(--navds-global-color-green-600)"
        />
      );
    case "warning":
      return (
        <Warning
          aria-hidden
          title="advarsel"
          color="var(--navds-global-color-orange-600)"
        />
      );
    case "error":
      return (
        <Error
          aria-hidden
          title="suksess"
          color="var(--navds-global-color-red-500)"
        />
      );
    default: {
      const CustomIcon = icon;
      return <CustomIcon aria-hidden />;
    }
  }
};

export const TimelineStep = forwardRef<HTMLLIElement, TimelineStepProps>(
  ({ className, children, time, description, icon, title, ...rest }, ref) => {
    return (
      <li
        {...rest}
        aria-current={time === "present"}
        ref={ref}
        className={cl(
          "navds-timeline__item",
          `navds-timeline__item--${time}`,
          className
        )}
      >
        <div className="navds-timeline__marker">
          <Icon icon={icon} />
        </div>
        <Heading size="small" as="div" className="navds-timeline__title">
          {title}
          {description && (
            <BodyShort size="small" className="navds-timeline__description">
              {description}
            </BodyShort>
          )}
        </Heading>
        <div className="navds-timeline__content">
          {children && (
            <BodyLong className="navds-timeline__content-inner">
              {children}
            </BodyLong>
          )}
        </div>
        <span className="navds-timeline__line navds-timeline__line--1" />
        <span className="navds-timeline__line navds-timeline__line--2" />
      </li>
    );
  }
) as TimelineStepType;

export default TimelineStep;
