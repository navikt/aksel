import React, { forwardRef, useContext } from "react";
import cl from "classnames";
import { BodyLong } from "..";
import { AlertContext } from ".";
import { BodyLongProps } from "../typography/BodyLong";

export interface AlertContentProps extends BodyLongProps {
  /**
   * Alert content
   */
  children: React.ReactNode;
}

export type AlertContentType = React.ForwardRefExoticComponent<
  AlertContentProps & React.RefAttributes<HTMLDivElement>
>;

const AlertContent: AlertContentType = forwardRef(
  ({ children, className, ...rest }, ref) => {
    const context = useContext(AlertContext);

    if (context === null) {
      console.warn("AlertContent has to be wrapped in <Alert />");
      return null;
    }

    return (
      <BodyLong
        {...rest}
        as="div"
        className={cl(className, "navds-alert__content")}
        ref={ref}
        size={context.size ?? "medium"}
      >
        {children}
      </BodyLong>
    );
  }
);

export default AlertContent;
