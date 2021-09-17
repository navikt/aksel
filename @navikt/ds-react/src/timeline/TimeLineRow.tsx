import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";

export interface TimelineRowProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Timeline
   */
  children: React.ReactNode;
  /**
   * Changes background-color and border-color
   *
   */
  /* variant: "warning" | "error" | "info" | "success"; */
  /**
   * Changes sizing of Timeline
   * @default "medium"
   */
  size?: "medium" | "small";
}

export type TimelineRowType = React.ForwardRefExoticComponent<
  TimelineRowProps & React.RefAttributes<HTMLDivElement>
>;

const TimelineRow: TimelineRowType = forwardRef(
  ({ className, children, size = "medium", ...rest }, ref) => {
    return (
      <div
        {...rest}
        ref={ref}
        className={cl("navds-timeline", className, `navds-timeline--${size}`)}
      >
        {children}
      </div>
    );
  }
);

export default TimelineRow;
