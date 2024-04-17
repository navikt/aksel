import cl from "clsx";
import React, { HTMLAttributes, forwardRef } from "react";

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
 * <ProgressBar value={20} valueMin={0} valueMax={100} duration={12}/>
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
      "aria-labelledby": ariaLabelledBy,
      "aria-label": ariaLabel,
      ...props
    },
    ref,
  ) => {
    const [isIndeterminate, setIsIndeterminate] = React.useState(false);

    React.useEffect(() => {
      let timer: NodeJS.Timeout;
      if (props.duration)
        timer = setTimeout(() => {
          setIsIndeterminate(true);
        }, props.duration * 1000);

      return () => {
        if (timer) {
          clearTimeout(timer);
        }
      };
    }, [props.duration]);

    return (
      <div
        ref={ref}
        className={cl(
          "navds-progress-bar",
          `navds-progress-bar--${size}`,
          props.className,
        )}
        aria-valuemin={valueMin}
        aria-valuemax={valueMax}
        aria-valuenow={isIndeterminate ? undefined : value}
        aria-valuetext={
          isIndeterminate ? "Ubestemt fremdrift" : `${value} av ${valueMax}`
        }
        role="progressbar"
        aria-labelledby={ariaLabelledBy}
        aria-label={ariaLabel}
      >
        <div
          className={cl("navds-progress-bar__foreground", {
            "navds-progress-bar__foreground--indeterminate": isIndeterminate,
          })}
          style={{
            transform: !isIndeterminate
              ? `translateX(-${100 - (value / valueMax) * 100}%)`
              : `translateX(-100%)`,
            animationDelay: isIndeterminate ? `1s` : undefined,
          }}
        />
      </div>
    );
  },
);

export default ProgressBar;
