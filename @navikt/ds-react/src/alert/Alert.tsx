import React, { createContext, forwardRef } from "react";
import cl from "classnames";
import {
  ErrorFilled,
  WarningFilled,
  InformationFilled,
  SuccessFilled,
} from "@navikt/ds-icons";
import AlertContent, { AlertContentType } from "./AlertContent";
import AlertTitle, { AlertTitleType } from "./AlertTitle";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Alert content
   */
  children: React.ReactNode;
  /**
   * Decides what design the alert will have
   */
  variant: "error" | "warning" | "info" | "success";
  /**
   * Changes padding and font-sizes
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * Toggles full-width Alert
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Removes background from Alert
   */
  inline?: boolean;
}

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

export interface AlertContextProps {
  size: "medium" | "small";
}

export const AlertContext = createContext<AlertContextProps | null>(null);
interface AlertComponent
  extends React.ForwardRefExoticComponent<
    AlertProps & React.RefAttributes<HTMLDivElement>
  > {
  Title: AlertTitleType;
  Content: AlertContentType;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
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
        "navds-alert",
        `navds-alert--${variant}`,
        `navds-alert--${size}`,
        { "navds-alert--full-width": fullWidth, "navds-alert--inline": inline }
      )}
    >
      <Icon
        aria-label={`${variant}-ikon`}
        focusable="false"
        role="img"
        variant={variant}
        alt={`${variant}-ikon`}
        className="navds-alert__icon"
      />
      <AlertContext.Provider value={{ size }}>
        <div className="navds-alert__wrapper">{children}</div>
      </AlertContext.Provider>
    </div>
  )
) as AlertComponent;

Alert.Title = AlertTitle;
Alert.Content = AlertContent;

export default Alert;
