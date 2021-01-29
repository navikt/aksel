import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";
import "@navikt/ds-css/typography/index.css";
import "@navikt/ds-css/grid/index.css";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const ContainerProps = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, ...rest }, ref) => (
    <div ref={ref} className={cl("navds-grid-container", className)} {...rest}>
      {children}
    </div>
  )
);

export default ContainerProps;
