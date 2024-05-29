import cl from "clsx";
import React, { HTMLAttributes, forwardRef } from "react";
import { Detail } from "../typography";

export interface ChatBubbleProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Bubble text.
   */
  children: React.ReactNode;
  /**
   * Name/sender on bubble.
   */
  name?: string;
  /**
   * Timestamp for sent message.
   */
  timestamp?: string;
  /**
   * Overrides hoizontal position of toptext.
   */
  toptextPosition?: "left" | "right";
}

const Bubble = forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ children, className, name, timestamp, toptextPosition, ...rest }, ref) => {
    return (
      <div ref={ref} className={cl("navds-chat__bubble", className)} {...rest}>
        {(timestamp || name) && (
          <h3
            className={cl(
              `navds-chat__top-text`,
              toptextPosition && `navds-chat__top-text--${toptextPosition}`,
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
  },
);

export default Bubble;
