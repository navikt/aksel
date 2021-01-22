import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";
import "@navikt/ds-css/internal-header/index.css";
import "@navikt/ds-css/typography/index.css";

export interface InternalHeaderProps extends HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  classname?: string;
}

const InternalHeader = forwardRef<HTMLElement, InternalHeaderProps>(
  ({ children, classname, ...rest }, ref) => (
    <header ref={ref} className={cl("navds-header", classname)} {...rest}>
      {children}
    </header>
  )
);

export default InternalHeader;
