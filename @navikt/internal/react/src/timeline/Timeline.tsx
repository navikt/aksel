import React, { forwardRef } from "react";

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  ({ children, ...rest }, ref) => {
    return (
      <div {...rest} ref={ref} className="navdsi-timeline">
        {children}
      </div>
    );
  }
);

export default Timeline;
