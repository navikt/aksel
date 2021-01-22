import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";
import "@navikt/ds-css/internal-header/index.css";
import "@navikt/ds-css/typography/index.css";

export interface InternalHeaderTitleProps
  extends HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  classname?: string;
}

const InternalHeaderTitle = forwardRef<
  HTMLHeadingElement,
  InternalHeaderTitleProps
>(({ children, classname, ...rest }, ref) => (
  <h1 ref={ref} className={cl("navds-header__title", classname)} {...rest}>
    <span>{children}</span>
  </h1>
));

export default InternalHeaderTitle;
