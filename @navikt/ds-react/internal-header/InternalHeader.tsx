import PropTypes from "prop-types";
import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";

export interface InternalHeaderProps extends HTMLAttributes<HTMLElement> {
  /**
   * Component content
   */
  children?: React.ReactNode;
  /**
   * @ignore
   */
  className?: string;
}

const InternalHeader = forwardRef<HTMLElement, InternalHeaderProps>(
  ({ children, className, ...rest }, ref) => (
    <header ref={ref} className={cl("navds-header", className)} {...rest}>
      {children}
    </header>
  )
);

InternalHeader.propTypes = {
  /**
   * Component content
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
};

export default InternalHeader;
