import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";

export interface BubbleProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Component content
   */
  children: React.ReactNode;
  /**
   * @ignore
   */
  className?: string;
}

const Bubble = forwardRef<HTMLDivElement, BubbleProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cl(
          "navds-speechbubble__bubble",
          className,
          "navds-body-long"
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export default Bubble;
