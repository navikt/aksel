import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";
import { Detail } from "../typography";

export interface ChatProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Chat text
   */
  children: React.ReactNode;
  /**
   * Chat-message name
   */
  name?: string;
  /**
   * Timestamp for sent message
   */
  timestamp?: string;
  /**
   * Background color chat
   */
  backgroundColor?: string;
}

export type ChatType = React.ForwardRefExoticComponent<
  ChatProps & React.RefAttributes<HTMLDivElement>
>;

const Chat: ChatType = forwardRef(
  ({ children, className, name, timestamp, backgroundColor, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cl("navds-speech-bubble__chat", className)}
        style={{ backgroundColor: backgroundColor }}
        tabIndex={0}
        {...rest}
      >
        {(timestamp || name) && (
          <div className="navds-speech-bubble__top-text">
            {name && (
              <Detail className="navds-speech-bubble__name">{name}</Detail>
            )}
            {timestamp && (
              <Detail className="navds-speech-bubble__timestamp">
                {timestamp}
              </Detail>
            )}
          </div>
        )}
        {children}
      </div>
    );
  }
);

export default Chat;
