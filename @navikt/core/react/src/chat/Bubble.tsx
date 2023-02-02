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
  /**
   * Overrides hoizontal position of toptext
   */
  toptextPosition?: "left" | "right";
}

export type BubbleType = React.ForwardRefExoticComponent<
  BubbleProps & React.RefAttributes<HTMLDivElement>
>;

const Bubble: BubbleType = forwardRef(
  (
    {
      children,
      className,
      name,
      timestamp,
      backgroundColor,
      toptextPosition,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cl("navds-chat__bubble", className)}
        style={{ backgroundColor: backgroundColor }}
        {...rest}
      >
        {(timestamp || name) && (
          <div
            className={cl(
              `navds-chat__top-text`,
              toptextPosition && `navds-chat__top-text--${toptextPosition}`
            )}
          >
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
