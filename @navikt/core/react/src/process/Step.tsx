import React, { forwardRef } from "react";
import { CheckmarkIcon } from "@navikt/aksel-icons";
import { useRenameCSS } from "../theme/Theme";
import { Label } from "../typography";
import { OverridableComponent } from "../util/types";
import { useProcessContext } from "./context";

export interface ProcessStepProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Title
   */
  title: string;
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
   * Variant of the bullets to use: a small solid bubble,
   * a bubble that fits a number inside, or a bubble that fits an icon inside
   * @default "default"
   */
  variant?: "default" | "number" | "icon";
  /**
   * icon
   * @default CheckmarkIcon
   */
  icon?: React.ReactNode;
  /**
   * numbers
   */
  number?: number;
  /**
   * Hide the line
   * @default false
   */
  hideLine?: boolean;
}

export const Step: OverridableComponent<ProcessStepProps, HTMLDivElement> =
  forwardRef(
    (
      {
        title,
        date,
        description,
        children,
        variant,
        icon,
        number,
        className,
        ...rest
      },
      ref,
    ) => {
      const { cn } = useRenameCSS();
      const context = useProcessContext();

      const { activeStep, index } = context;
      const negotiatedVariant = variant || context.variant || "default";

      if (icon === undefined) {
        if (index <= activeStep) {
          icon = <CheckmarkIcon />;
        } else {
          // TODO (stw): Should default uncompleted with icon show a CheckmarkIcon on no background, no icon at all, or a different icon indicated 'unselected' or 'incomplete'?
          icon = <CheckmarkIcon />;
          // icon = <NotePencilIcon />;
        }
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
            })}
            style={{
              "--__axc-process-circle-size":
                negotiatedVariant !== "default" ? "1.75rem" : "1rem",
              "--navds-process-circle-size":
                negotiatedVariant !== "default" ? "1.75rem" : "1rem",
              marginTop:
                negotiatedVariant === "default" ? "calc(.75rem / 2)" : "",
            }}
            aria-hidden={negotiatedVariant === "number"}
          >
            {negotiatedVariant === "icon" && icon}
            {negotiatedVariant === "number" &&
              (number ? number : context.index + 1)}
          </span>

          {/*** Content ***/}
          <Label as="span" className={cn("navds-process__content")}>
            {title}
          </Label>
          {date && (
            <span style={{ minWidth: "fit-content", gridColumn: "content" }}>
              {date}
            </span>
          )}
          {description && (
            <span style={{ minWidth: "fit-content", gridColumn: "content" }}>
              {description}
            </span>
          )}
          <div style={{ minWidth: "fit-content", gridColumn: "content" }}>
            {children}
          </div>
        </div>
      );
    },
  );

export default Step;
