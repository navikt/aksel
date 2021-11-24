import React, { forwardRef } from "react";
import cl from "classnames";
import {
  ErrorFilled,
  WarningFilled,
  InformationFilled,
  SuccessFilled,
} from "@navikt/ds-icons";
import { BodyLong } from "..";

const Icon = ({ variant, ...props }) => {
  switch (variant) {
    case "error":
      return <ErrorFilled {...props} />;
    case "warning":
      return <WarningFilled {...props} />;
    case "info":
      return <InformationFilled {...props} />;
    case "success":
      return <SuccessFilled {...props} />;
    default:
      return null;
  }
};

export interface StepIndicatorContextProps {
  size: "medium" | "small";
}

const StepIndicator = forwardRef<HTMLDivElement>(
  (
    {
      children,
      className,
      variant,
      size = "medium",
      fullWidth = false,
      inline = false,
      ...rest
    },
    ref
  ) => (
    <div
      {...rest}
      ref={ref}
      className={cl(
        className,
        "navds-step-indicator",
        `navds-step-indicator--${variant}`,
        `navds-step-indicator--${size}`,
        {
          "navds-step-indicator--full-width": fullWidth,
          "navds-step-indicator--inline": inline,
        }
      )}
    >
      <Icon
        title={`${variant}-ikon`}
        variant={variant}
        className="navds-step-indicator__icon"
      />
      <BodyLong as="div" size={size} className="navds-step-indicator__wrapper">
        {children}
      </BodyLong>
    </div>
  )
);

export default StepIndicator;
