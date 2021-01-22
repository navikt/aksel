import React, { forwardRef, HTMLAttributes, createElement } from "react";
import cl from "classnames";
import "@navikt/ds-css/internal-header/index.css";
import "@navikt/ds-css/typography/index.css";

export interface InternalHeaderTitleProps extends HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
  element?: keyof React.ReactHTML;
}

const InternalHeaderTitle = forwardRef<HTMLElement, InternalHeaderTitleProps>(
  ({ element = "h1", children, className, ...rest }, ref) =>
    createElement(element, {
      ...rest,
      ref,
      className: cl("navds-header__title", className),
      children: <span>{children}</span>,
    })
);

export default InternalHeaderTitle;
