import React, { forwardRef } from "react";
import { CheckmarkIcon } from "@navikt/aksel-icons";
import { useRenameCSS } from "../theme/Theme";
import { BodyLong, BodyShort, Label } from "../typography";
import { OverridableComponent } from "../util/types";
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
   * A description of the step
   */
  description?: string;
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
          {date && (
            <BodyShort
              size="small"
              textColor="subtle"
              className={cn("navds-process__content")}
            >
              {date}
            </BodyShort>
          )}
          {description && (
            <BodyLong size="medium" className={cn("navds-process__content")}>
              {description}
            </BodyLong>
          )}
          <div className={cn("navds-process__content")}>{children}</div>
        </div>
      );
    },
  );

export default Step;
