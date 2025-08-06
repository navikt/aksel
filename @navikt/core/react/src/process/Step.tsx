import React, { forwardRef } from "react";
import { useRenameCSS } from "../theme/Theme";
import { BodyLong, BodyShort, Label } from "../typography";
import { useProcessContext } from "./context";

export interface ProcessStepProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Title
   */
  title?: string;
  /**
   * Date to display under the title
   */
  date?: string;
  /**
   * Rich content to display under the title (and date and/or
   * description, if provided)
   */
  children?: React.ReactNode;
  /**
   * Icon to display inside the circle.
   *
   * Providing an icon will override the variant set on the parent Process for
   * this step, forcing a large circle with the specified icon for this step
   * only.
   *
   * If no icon is provided and the variant is "icon", a <CheckmarkIcon /> will
   * be used by default.
   *
   * @default <CheckmarkIcon />
   */
  icon?: React.ReactNode;
  /**
   * Set this step as completed.
   *
   * If not set, it will default to true for every step before and including
   * activeStep, and false for every step after activeStep.
   *
   */
  completed?: boolean;
}

export const Step = forwardRef<HTMLDivElement, ProcessStepProps>(
  ({ title, date, children, icon, completed, className, ...rest }, ref) => {
    const { cn } = useRenameCSS();
    const { activeStep, index, variant = "default" } = useProcessContext();
    const resolvedCompleted = completed ?? index <= activeStep;

    if (variant === "icon" && resolvedCompleted && icon === undefined) {
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="0.8125rem"
          height="0.625rem"
          viewBox="0 0 13 10"
          fill="none"
          focusable={false}
          role="img"
          aria-hidden
        >
          <path
            d="M4.03524 6.41478L10.4752 0.404669C11.0792 -0.160351 12.029 -0.130672 12.5955 0.47478C13.162 1.08027 13.1296 2.03007 12.5245 2.59621L5.02111 9.59934C4.74099 9.85904 4.37559 10 4.00025 10C3.60651 10 3.22717 9.84621 2.93914 9.56111L0.439143 7.06111C-0.146381 6.47558 -0.146381 5.52542 0.439143 4.93989C1.02467 4.35437 1.97483 4.35437 2.56036 4.93989L4.03524 6.41478Z"
            fill="currentColor"
          />
        </svg>
      );
    }

    return (
      <div
        {...rest}
        aria-current={index === activeStep}
        ref={ref}
        className={cn("navds-process__step", className)}
      >
        <span
          className={cn("navds-process__circle", {
            "navds-process__circle--small": variant === "default" && !icon,
          })}
          data-completed={resolvedCompleted}
          data-current={index === activeStep}
          aria-hidden={variant !== "default"}
        >
          {icon || (variant === "number" && index + 1)}
        </span>

        <div className={cn("navds-process__content")}>
          {title && (
            <Label as="div" className={cn("navds-process__content-title")}>
              {title}
            </Label>
          )}
          {date && (
            <BodyShort
              size="small"
              spacing
              textColor="subtle"
              className={cn("navds-process__content-date")}
            >
              {date}
            </BodyShort>
          )}
          {children && typeof children === "string" ? (
            <BodyLong size="medium">{children}</BodyLong>
          ) : (
            children
          )}
        </div>
      </div>
    );
  },
);

export default Step;
