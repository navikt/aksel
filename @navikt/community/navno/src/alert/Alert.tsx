import cl from "clsx";
import React, { forwardRef } from "react";
import "./alert.css";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ children, className, ...rest }, ref) => (
    <div {...rest} ref={ref} className={cl(className, "navno-alert")}>
      {children}
    </div>
  )
);

export default Alert;
