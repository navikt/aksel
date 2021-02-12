import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";
import "@navikt/ds-css/content-container/index.css";

export interface PageContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const ContentContainer = forwardRef<HTMLDivElement, PageContainerProps>(
  ({ children, className, ...rest }, ref) => (
    <div
      ref={ref}
      className={cl("navds-content-container", className)}
      {...rest}
    >
      {children}
    </div>
  )
);

export default ContentContainer;
