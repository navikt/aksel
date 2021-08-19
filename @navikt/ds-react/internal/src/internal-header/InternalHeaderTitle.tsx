import React, { forwardRef, HTMLAttributes, createElement } from "react";
import cl from "classnames";

export interface InternalHeaderTitleProps extends HTMLAttributes<HTMLElement> {
  /**
   * Component content
   */
  children?: React.ReactNode;
  /**
   * Tag this component will use. Usefull for defining a button/link
   * @default "h1"
   */
  element?: keyof React.ReactHTML;
}

const InternalHeaderTitle = forwardRef<HTMLElement, InternalHeaderTitleProps>(
  ({ element = "h1", children, className, ...rest }, ref) =>
    createElement(element, {
      ...rest,
      ref,
      className: cl("navds-interal-header__title", "navds-label", className),
      children: <span>{children}</span>,
    })
);

export default InternalHeaderTitle;
