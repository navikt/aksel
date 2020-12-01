import React, { forwardRef } from "react";
import cl from "classnames";
import "@nav-fronted/tag-styles";

export interface TagProps {
  /**
   * User defined classname
   */
  className?: string;
}

const Tag = forwardRef<HTMLDivElement, TagProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cl("navds-tag", className)}>
        <h2>Hello from react-tag</h2>
        {children}
      </div>
    );
  }
);

export default Tag;
