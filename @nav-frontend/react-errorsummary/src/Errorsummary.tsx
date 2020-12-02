import React, { forwardRef } from "react";
import cl from "classnames";
import "@nav-frontend/errorsummary-styles";

export interface ErrorsummaryProps {
  /**
   * User defined classname
   */
  className?: string;
}

const Errorsummary = forwardRef<HTMLDivElement, ErrorsummaryProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cl("navds-errorsummary", className)}>
        <h2>Hello from react-errorsummary</h2>
        {children}
      </div>
    );
  }
);

export default Errorsummary;
