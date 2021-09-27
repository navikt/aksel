import React, { forwardRef, HTMLAttributes, createElement } from "react";
import cl from "classnames";

export interface HeaderTitleProps extends HTMLAttributes<HTMLElement> {
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

const HeaderTitle = forwardRef<HTMLElement, HeaderTitleProps>(
  ({ element = "h1", children, className, ...rest }, ref) =>
    createElement(element, {
      ...rest,
      ref,
      className: cl("navdsi-header__title", "navds-label", className),
      children: <span>{children}</span>,
    })
);

export default HeaderTitle;
