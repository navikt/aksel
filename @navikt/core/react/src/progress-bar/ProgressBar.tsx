import cl from "clsx";
import React, { HTMLAttributes, forwardRef } from "react";

interface ProgressBarPropsBase
  extends Omit<HTMLAttributes<HTMLDivElement>, "role"> {
  /**
   * Changes height.
   * @default "medium"
   */
  size?: "large" | "medium" | "small";
  /**
   * Current progress. When duration is set, value is ignored.
   */
  value?: number;
  /**
   * Maximum progress.
   * @default 100
   */
  valueMax?: number;
  /**
   * Expected task duration in seconds.
   * ProgressBar grows with a preset animation for {duration} seconds.
   * After a 4 sec delay, it then shows an indeterminate animation.
   * A duration of 0 will show an indeterminate animation immediately.
   * Temporary removed to avoid conflicts when updating API
   */
  //duration?: number;
  /**
   * String ID of the element that labels the progress bar.
   * Not needed if `aria-label` is used.
   */
  "aria-labelledby"?: string;
  /**
   * String value that labels the progress bar.
   * Not needed if `aria-labelledby` is used.
   */
  "aria-label"?: string;
}

export type ProgressBarProps = ProgressBarPropsBase &
  (
    | {
        "aria-hidden": string;
      }
    | {
        "aria-labelledby": string;
        "aria-label"?: never;
      }
    | {
        "aria-label": string;
        "aria-labelledby"?: never;
      }
  );

/**
 * ProgressBar
 * A component for visualizing progression in a process.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/progress-bar)
 * @see 🏷️ {@link ProgressBarProps}
 *
 * @example
 * // For loading content with an approximate duration in sec.
 * <ProgressBar duration={30} />
 *
 * @example
 * // As a step indicator for forms, questionnaires, etc.
 * <ProgressBar value={2} valueMax={7} />
 */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      size = "medium",
      value = 0,
      valueMax = 100,
      "aria-labelledby": ariaLabelledBy,
      "aria-label": ariaLabel,
      className,
      ...rest
    },
    ref,
  ) => {
    const translate = 100 - (Math.round(value) / valueMax) * 100;
    const duration = undefined;

    return (
      <div
        ref={ref}
        className={cl(
          "navds-progress-bar",
          `navds-progress-bar--${size}`,
          className,
        )}
        aria-valuemax={duration ? 0 : Math.round(valueMax)}
        aria-valuenow={duration ? 0 : Math.round(value)}
        aria-valuetext={
          duration
            ? "Fremdrift kan ikke beregnes"
            : `${Math.round(value)} av ${Math.round(valueMax)}`
        }
        role="progressbar"
        aria-labelledby={ariaLabelledBy}
        aria-label={ariaLabel}
        {...rest}
      >
        <div
          className={cl("navds-progress-bar__foreground", {
            "navds-progress-bar__foreground--indeterminate":
              Number.isInteger(duration),
          })}
          style={{
            "--__ac-progress-bar-duration": Number.isInteger(duration)
              ? `${duration}s`
              : undefined,
            "--__ac-progress-bar-delay": `${duration === 0 ? 0 : 4}s`,
            "--__ac-progress-bar-translate": `-${translate}%`,
          }}
        />
      </div>
    );
  },
);

export default ProgressBar;
