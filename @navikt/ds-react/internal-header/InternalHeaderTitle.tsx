import PropTypes from "prop-types";
import React, { forwardRef, HTMLAttributes, createElement } from "react";
import cl from "classnames";

export interface InternalHeaderTitleProps extends HTMLAttributes<HTMLElement> {
  /**
   * Component content
   */
  children?: React.ReactNode;
  /**
   * @ignore
   */
  className?: string;
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
      className: cl("navds-header__title", className),
      children: <span>{children}</span>,
    })
);

InternalHeaderTitle.propTypes = {
  /**
   * Component content
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Tag this component will use. Usefull for defining a button/link
   * @default "h1"
   */
  element: PropTypes.oneOf<keyof React.ReactHTML>(
    Array<keyof React.ReactHTML>()
  ),
};

export default InternalHeaderTitle;
