import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";

export interface BubbleProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Bubble text
   */
  children: React.ReactNode;
  /**
   * User defined toptext, normally "name + date"
   */
  topText?: React.ReactNode;
  /**
   * Background color bubble
   */
  backgroundColor?: string;
}

const Bubble = forwardRef<HTMLDivElement, BubbleProps>(
  ({ children, className, topText, backgroundColor, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cl(
          "navds-speechbubble__bubble",
          className,
          "navds-body-long"
        )}
        style={{ backgroundColor: backgroundColor }}
        tabIndex={0}
        {...rest}
      >
        {topText && (
          <span className="navds-speechbubble__top-text navds-detail">
            {topText}
          </span>
        )}
        {children}
      </div>
    );
  }
);

export default Bubble;
