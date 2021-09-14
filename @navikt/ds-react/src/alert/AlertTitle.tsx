import React, { forwardRef, useContext } from "react";
import cl from "classnames";
import { AlertContext, Heading, Label } from "..";

export interface AlertTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Alert content
   */
  children: React.ReactNode;
}

export type AlertTitleType = React.ForwardRefExoticComponent<
  AlertTitleProps & React.RefAttributes<HTMLDivElement>
>;

const AlertTitle: AlertTitleType = forwardRef(
  ({ children, className, ...rest }, ref) => {
    const context = useContext(AlertContext);

    if (context === null) {
      console.warn("AlertTitle has to be wrapped in <Alert />");
      return null;
    }

    const size = context.size ?? "medium";

    return (
      <>
        {size === "medium" ? (
          <Heading
            {...rest}
            ref={ref}
            className={cl(className, "navds-alert__title")}
            as="div"
            size="small"
          >
            {children}
          </Heading>
        ) : (
          <Label
            {...rest}
            ref={ref}
            className={cl(className, "navds-alert__title")}
            as="div"
            size="medium"
          >
            {children}
          </Label>
        )}
      </>
    );
  }
);

export default AlertTitle;
