import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";
import "@navikt/ds-css/content-container/index.css";

export type ContentContainerProps = HTMLAttributes<HTMLDivElement>;
const ContentContainer = forwardRef<HTMLDivElement, ContentContainerProps>(
  ({ children, className, ...rest }, ref) => (
    <div
      ref={ref}
      className={cl("navds-content__container", className)}
      {...rest}
    >
      {children}
    </div>
  )
);

export default ContentContainer;
