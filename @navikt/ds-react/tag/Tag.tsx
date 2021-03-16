import PropTypes from "prop-types";
import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Component content
   */
  children: React.ReactNode;
  /**
   * @ignore
   */
  className?: string;
  /**
   * Changes background-color and border-color
   */
  variant: "warning" | "error" | "info" | "success";
}

const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ children, className, variant, ...rest }, ref) => {
    return (
      <span
        ref={ref}
        className={cl("navds-tag", className, `navds-tag--${variant}`)}
        {...rest}
      >
        {children}
      </span>
    );
  }
);

Tag.propTypes = {
  /**
   * Component content
   */
  children: PropTypes.node.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Changes background-color and border-color
   */
  variant: PropTypes.oneOf<"warning" | "error" | "info" | "success">([
    "warning",
    "error",
    "info",
    "success",
  ]).isRequired,
};

export default Tag;
