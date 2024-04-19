import cl from "clsx";
import React, { HTMLAttributes, forwardRef, useEffect, useState } from "react";

interface ProgressBarPropsBase extends HTMLAttributes<HTMLDivElement> {
  /**
   * Changes height of progressbar.
   * @default "medium"
   */
  size?: "large" | "medium" | "small";
  /**
   * Value of progressbar.
   */
  value: number;
  /**
   * Minimum progress.
   * @default 0
   */
  valueMin?: number;
  /**
   * Maximum progress.
   */
  valueMax: number;
  /**
   * Used to approximate a task duration in seconds.
   * ProgressBar shows an indeterminate animation after duration is done.
   */
  duration?: number;
  /**
   * String ID of the element that labels the progress-bar.
   * Not needed if `aria-label` is used.
   */
  "aria-labelledby"?: string;
  /**
   * String value that labels the progress-bar.
   * Not needed if `aria-labelledby` is used.
   */
  "aria-label"?: string;
}

export type ProgressBarProps = ProgressBarPropsBase &
  (
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
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/progress-bar)
 * @see 🏷️ {@link ProgressBarProps}
 *
 * @example
 * // For loading content
 * <ProgressBar value={20} valueMin={0} valueMax={100} duration={12} />
 *
 * @example
 * // As a progress indicator for applications and similar
 * <ProgressBar value={2} valueMin={0} valueMax={7} />
 */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      size = "medium",
      value,
      valueMin = 0,
      valueMax,
      duration,
      "aria-labelledby": ariaLabelledBy,
      "aria-label": ariaLabel,
      className,
      ...rest
    },
    ref,
  ) => {
    const [isIndeterminate, setIsIndeterminate] = useState(false);

    const translate = 100 - (Math.round(value) / valueMax) * 100;

    useEffect(() => {
      let timer: NodeJS.Timeout;
      if (duration)
        timer = setTimeout(() => {
          setIsIndeterminate(true);
        }, duration * 1000);

      return () => {
        if (timer) clearTimeout(timer);
      };
    }, [duration]);

    return (
      <div
        ref={ref}
        className={cl(
          "navds-progress-bar",
          `navds-progress-bar--${size}`,
          className,
        )}
        aria-valuemin={isIndeterminate ? 0 : valueMin}
        aria-valuemax={isIndeterminate ? 0 : valueMax}
        aria-valuenow={isIndeterminate ? 0 : Math.round(value)}
        aria-valuetext={
          isIndeterminate
            ? "Fremdrift kan ikke beregnes"
            : `${Math.round(value)} av ${valueMax}`
        }
        role="progressbar"
        aria-labelledby={ariaLabelledBy}
        aria-label={ariaLabel}
        {...rest}
      >
        <div
          className={cl("navds-progress-bar__foreground", {
            "navds-progress-bar__foreground--indeterminate": isIndeterminate,
          })}
          style={{
            transform: !isIndeterminate
              ? `translateX(-${translate}%)`
              : `translateX(-100%)`,
          }}
        />
      </div>
    );
  },
);

export default ProgressBar;
