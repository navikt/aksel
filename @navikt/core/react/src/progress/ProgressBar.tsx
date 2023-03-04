import { ErrorColored, SuccessColored } from "@navikt/ds-icons";
import cl from "clsx";
import React, { forwardRef, HTMLAttributes } from "react";
import { BodyShort, Label } from "../typography";

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  min: number | string;
  max: number | string;
  value: number | string | null;
  label: string;
  /**
   * @default false
   */
  hideLabel?: boolean;

  /**
   * @default "active"
   */
  status?: "active" | "finished" | "error";
  /**
   *
   */
  helperText?: string;
  /**
   *
   */
  variant?: "neutral" | "steps";
}

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      className,
      min,
      max,
      value,
      label,
      hideLabel,
      status = "active",
      variant = "neutral",
      helperText,
      ...rest
    },
    ref
  ) => {
    const current = Number(value) / Number(max);
    const isFinished = status === "finished";

    const inlineStyle = !isFinished
      ? { transform: `scaleX(${clamp(current)})` }
      : {};

    return (
      <div className="navds-progressbar">
        <div className="navds-progressbar__status">
          <Label as="span">{label}</Label>
          {status === "finished" && <SuccessColored aria-hidden />}
          {status === "error" && <ErrorColored aria-hidden />}
        </div>
        <div
          {...rest}
          ref={ref}
          className={cl(
            "navds-progressbar__bar",
            className,
            `navds-progressbar__bar--${status}`,
            `navds-progressbar__bar--${variant}`,
            { "navds-progressbar__bar--indeterminate": value === null }
          )}
          aria-valuemin={Number(min)}
          aria-valuemax={Number(max)}
          aria-valuenow={Number(value)}
          aria-busy={status !== "finished"}
          role="progressbar"
          aria-label={label}
        >
          <span
            className="navds-progressbar__bar-indicator"
            style={inlineStyle}
          />
        </div>
        {helperText && (
          <BodyShort as="div" className="navds-progressbar__label">
            {helperText}
          </BodyShort>
        )}
      </div>
    );
  }
);

function clamp(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

export default ProgressBar;
