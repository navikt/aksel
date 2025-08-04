import React, { forwardRef } from "react";
import { CheckmarkIcon } from "@navikt/aksel-icons";
import { useRenameCSS } from "../theme/Theme";
import { Label } from "../typography";
import { OverridableComponent } from "../util/types";
import { useProcessContext } from "./context";

export interface ProcessStepProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Title
   */
  title?: string;
  /**
   * Date/timestamp to display under the title
   */
  date?: string;
  /**
   * Descriptive plaintext
   */
  description?: string;
  /**
   * Content to display beside the line under the title (and date and/or
   * description, if provided)
   */
  children?: React.ReactNode;
  /**
   * icon
   * @default <CheckmarkIcon />
   */
  icon?: React.ReactNode;
}

export const Step: OverridableComponent<ProcessStepProps, HTMLDivElement> =
  forwardRef<HTMLDivElement, ProcessStepProps>(
    ({ title, date, description, children, icon, className, ...rest }, ref) => {
      const { cn } = useRenameCSS();
      const context = useProcessContext();

      const { activeStep, index } = context;
      const resolvedVariant = context.variant || "default";

      if (
        resolvedVariant === "icon" &&
        index <= activeStep &&
        icon === undefined
      ) {
        icon = <CheckmarkIcon />;
      }

      return (
        <div
          {...rest}
          aria-current={activeStep === context.index ? "step" : undefined}
          ref={ref}
          className={cn("navds-process__step", className)}
        >
          <span
            className={cn("navds-process__circle", {
              "navds-process__circle--completed": context.index < activeStep,
              "navds-process__circle--current": context.index === activeStep,
              "navds-process__circle--uncompleted": context.index > activeStep,
              "navds-process__circle--small":
                resolvedVariant === "default" && !icon,
              "navds-process__circle--margin":
                resolvedVariant === "default" && !icon,
            })}
            aria-hidden={resolvedVariant === "number"}
          >
            {icon || (resolvedVariant === "number" && context.index + 1)}
          </span>

          {/*** Content ***/}
          {title && (
            <Label
              as="span"
              className={cn(
                "navds-process__content",
                "navds-process__content-title",
              )}
            >
              {title}
            </Label>
          )}
          {date && <span className={cn("navds-process__content")}>{date}</span>}
          {description && (
            <span className={cn("navds-process__content")}>{description}</span>
          )}
          <div className={cn("navds-process__content")}>{children}</div>
        </div>
      );
    },
  );

export default Step;
