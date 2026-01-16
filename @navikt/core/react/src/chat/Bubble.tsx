import React, { HTMLAttributes, forwardRef } from "react";
import { Detail, Heading, HeadingProps } from "../typography";
import { cl } from "../util/className";

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
  /**
   * The heading level for the toptext.
   * @default "3"
   */
  toptextHeadingLevel?: Exclude<HeadingProps["level"], "1">;
}

const Bubble = forwardRef<HTMLDivElement, ChatBubbleProps>(
  (
    {
      children,
      className,
      name,
      timestamp,
      toptextPosition,
      toptextHeadingLevel = "3",
      ...rest
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={cl("aksel-chat__bubble", className)} {...rest}>
        {(timestamp || name) && (
          <Heading
            size="xsmall"
            level={toptextHeadingLevel}
            className={cl(
              "aksel-chat__top-text",
              toptextPosition && `aksel-chat__top-text--${toptextPosition}`,
            )}
          >
            {name && <Detail as="span">{name}</Detail>}
            {name && timestamp && (
              <Detail as="span" aria-hidden>
                &bull;
              </Detail>
            )}
            {timestamp && <Detail as="span">{timestamp}</Detail>}
          </Heading>
        )}
        {children}
      </div>
    );
  },
);

export default Bubble;
