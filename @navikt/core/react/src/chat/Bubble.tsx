import React, { forwardRef, HTMLAttributes } from "react";
import cl from "clsx";
import { Detail } from "../typography";

export interface BubbleProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Bubble text
   */
  children: React.ReactNode;
  /**
   * name/sender on bubble
   */
  name?: string;
  /**
   * Timestamp for sent message
   */
  timestamp?: string;
  /**
   * Background color on bubble
   */
  backgroundColor?: string;
}

export type BubbleType = React.ForwardRefExoticComponent<
  BubbleProps & React.RefAttributes<HTMLDivElement>
>;

const Bubble: BubbleType = forwardRef(
  ({ children, className, name, timestamp, backgroundColor, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cl("navds-chat__bubble", className)}
        style={{ backgroundColor: backgroundColor }}
        tabIndex={0}
        {...rest}
      >
        {(timestamp || name) && (
          <div className="navds-chat__top-text">
            {name && <Detail className="navds-chat__name">{name}</Detail>}
            {timestamp && (
              <Detail className="navds-chat__timestamp">{timestamp}</Detail>
            )}
          </div>
        )}
        {children}
      </div>
    );
  }
);

export default Bubble;
