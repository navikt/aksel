import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";
import {
  TimelineZoomButton,
  type TimelineZoomButtonProps,
} from "../zoom-button/TimelineZoomButton";

interface ZoomProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

const TimelineZoomRoot = forwardRef<HTMLUListElement, ZoomProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <ul ref={ref} className={cl(className, "aksel-timeline__zoom")} {...rest}>
        {children}
      </ul>
    );
  },
);

const TimelineZoom = Object.assign(TimelineZoomRoot, {
  /**
   * @see 🏷️ {@link TimelineZoomButtonProps}
   */
  Button: TimelineZoomButton,
  componentType: "zoom" as const,
});

export { TimelineZoom };
export type { TimelineZoomButtonProps, ZoomProps as TimelineZoomProps };
