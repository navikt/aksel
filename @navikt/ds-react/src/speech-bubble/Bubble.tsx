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
  /**
   * User defined toptext, normally "username + date"
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
