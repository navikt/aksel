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

const Bubble = forwardRef<HTMLDivElement, BubbleProps>(
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
          <h3
            className={cl(
              `navds-chat__top-text`,
              toptextPosition && `navds-chat__top-text--${toptextPosition}`
            )}
          >
            {name && <Detail as="span">{name}</Detail>}
            {name && timestamp && (
              <Detail as="span" aria-hidden>
                &bull;
              </Detail>
            )}
            {timestamp && <Detail as="span">{timestamp}</Detail>}
          </h3>
        )}
        {children}
      </div>
    );
  }
);

export default Bubble;
