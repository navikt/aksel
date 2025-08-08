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
   */
  completed?: boolean;
  /**
   * Hide the content section of the step.
   * Useful for overriding the Process-level 'hideCompletedContent'-prop.
   */
  hideContent?: boolean;
}

export const Step = forwardRef<HTMLDivElement, ProcessStepProps>(
  (
    { title, date, children, icon, completed, hideContent, className, ...rest },
    ref,
  ) => {
    const { cn } = useRenameCSS();
    const {
      activeStep,
      index,
      variant = "default",
      hideCompletedContent,
    } = useProcessContext();
    completed = completed ?? index <= activeStep;

    if (variant === "icon" && completed && icon === undefined) {
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          focusable={false}
          role="img"
          aria-hidden
        >
          <path
            d="M10.0352 13.4148L16.4752 7.40467C17.0792 6.83965 18.029 6.86933 18.5955 7.47478C19.162 8.08027 19.1296 9.03007 18.5245 9.59621L11.0211 16.5993C10.741 16.859 10.3756 17 10.0002 17C9.60651 17 9.22717 16.8462 8.93914 16.5611L6.43914 14.0611C5.85362 13.4756 5.85362 12.5254 6.43914 11.9399C7.02467 11.3544 7.97483 11.3544 8.56036 11.9399L10.0352 13.4148Z"
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
        <BodyShort
          as="span"
          size="medium"
          weight="semibold"
          className={cn("navds-process__circle", {
            "navds-process__circle--small": variant === "default" && !icon,
            "navds-process__circle--icon": icon,
          })}
          data-active={index === activeStep}
          data-completed={completed}
          aria-hidden={variant !== "default"}
        >
          {icon || (variant === "number" && index + 1)}
        </BodyShort>

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
          {!(
            hideContent ??
            (hideCompletedContent && completed && index !== activeStep)
          ) &&
            (children && typeof children === "string" ? (
              <BodyLong size="medium">{children}</BodyLong>
            ) : (
              children
            ))}
        </div>
      </div>
    );
  },
);

export default Step;
