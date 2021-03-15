import PropTypes from "prop-types";
import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";

export interface ContentContainerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @ignore
   */
  classNames?: string;
  /**
   * Component content
   */
  children: React.ReactNode;
}

const ContentContainer = forwardRef<HTMLDivElement, ContentContainerProps>(
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

ContentContainer.propTypes = {
  /**
   * Component content
   */
  children: PropTypes.node.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
};

export default ContentContainer;
