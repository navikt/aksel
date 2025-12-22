import React, { HTMLAttributes, forwardRef, useEffect } from "react";
import { useRenameCSS } from "../theme/Theme";
import { useLatestRef } from "../util/hooks/useLatestRef";
import { useTimeout } from "../util/hooks/useTimeout";
import { useI18n } from "../util/i18n/i18n.hooks";

interface ProgressBarPropsBase
  extends Omit<HTMLAttributes<HTMLDivElement>, "role"> {
  /**
   * Changes height.
   * @default "medium"
   */
  size?: "large" | "medium" | "small";
  /**
   * Current progress. If set, the `simulated` prop overrides `value`.
   */
  value?: number;
  /**
   * Maximum progress.
   * @default 100
   */
  valueMax?: number;
  /**
   * Visually simulates loading.
   * ProgressBar grows with a preset animation for set number of seconds,
   * then shows an indeterminate animation on timeout.
   */
  simulated?: {
    /**
     * Duration in seconds.
     */
    seconds: number;
    /**
     * Callback function when progress is indeterminate.
     */
    onTimeout: () => void;
  };
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
        "aria-hidden": true;
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
 * <ProgressBar simulated={{
 *     seconds: 30,
 *     onTimeout: () => console.log("Oops, this is taking more time than expected!")
 *   }}
 * />
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
      simulated,
      ...rest
    },
    ref,
  ) => {
    const { cn } = useRenameCSS();
    const translateX = 100 - (Math.round(value) / valueMax) * 100;
    const onTimeoutRef = useLatestRef(simulated?.onTimeout);

    const translate = useI18n("ProgressBar");
    const timeout = useTimeout();

    useEffect(() => {
      if (!simulated?.seconds || !onTimeoutRef.current) {
        return;
      }

      timeout.start(simulated.seconds * 1000, onTimeoutRef.current);
      return timeout.clear;
    }, [onTimeoutRef, simulated?.seconds, timeout]);

    return (
      <div
        ref={ref}
        className={cn(
          "navds-progress-bar",
          `navds-progress-bar--${size}`,
          className,
        )}
        aria-valuemax={simulated?.seconds ? 0 : Math.round(valueMax)}
        aria-valuenow={simulated?.seconds ? 0 : Math.round(value)}
        aria-valuetext={
          simulated?.seconds
            ? translate("progressUnknown", {
                seconds: Math.round(simulated?.seconds),
              })
            : translate("progress", {
                current: Math.round(value),
                max: Math.round(valueMax),
              })
        }
        role="progressbar"
        aria-labelledby={ariaLabelledBy}
        aria-label={ariaLabel}
        {...rest}
      >
        <div
          className={cn("navds-progress-bar__foreground", {
            "navds-progress-bar__foreground--indeterminate":
              simulated?.seconds !== undefined,
          })}
          style={{
            "--__ac-progress-bar-simulated":
              simulated?.seconds !== undefined
                ? `${simulated?.seconds}s`
                : undefined,
            "--__ac-progress-bar-translate": `-${translateX}%`,
          }}
        />
      </div>
    );
  },
);

export default ProgressBar;
