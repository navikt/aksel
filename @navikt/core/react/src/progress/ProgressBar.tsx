import React, { forwardRef, HTMLAttributes } from "react";
import cl from "clsx";

export interface ProgressBarProps extends HTMLAttributes<HTMLProgressElement> {
  min: number | string;
  max: number | string;
  value: number | string;
}

export const ProgressBar = forwardRef<HTMLProgressElement, ProgressBarProps>(
  ({ className, min, max, current, ...rest }, ref) => {
    const widthStyle = {
      "--ac-progressbar-width": `${(Number(current) / Number(max)) * 100}%`,
    } as React.CSSProperties;

    console.log(widthStyle);

    return (
      <progress
        {...rest}
        ref={ref}
        className={cl("navds-progressbar", className)}
        aria-valuemin={Number(min)}
        aria-valuemax={Number(max)}
        aria-valuenow={Number(current)}
        max={max}
      >
        <span className="navds-progressbar__indicator" style={widthStyle} />
      </progress>
    );
  }
);

export default ProgressBar;
