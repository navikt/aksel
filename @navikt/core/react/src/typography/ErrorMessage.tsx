import React from "react";
import cl from "classnames";
import { Label } from "..";

export interface ErrorMessageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * medium: 18px, small: 16px
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * Error text
   */
  children: React.ReactNode;
}

const ErrorMessage = (props) => (
  <Label
    {...props}
    as="div"
    className={cl("navds-error-message", props.className)}
  />
);

export default ErrorMessage;
