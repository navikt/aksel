import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";

export interface ChatProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Chat text
   */
  children: React.ReactNode;
  /**
   * User defined toptext, normally "name + date"
   */
  topText?: React.ReactNode;
  /**
   * Background color chat
   */
  backgroundColor?: string;
}

export type ChatType = React.ForwardRefExoticComponent<
  ChatProps & React.RefAttributes<HTMLDivElement>
>;

const Chat: ChatType = forwardRef(
  ({ children, className, topText, backgroundColor, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cl(
          "navds-speech-bubble__chat",
          className,
          "navds-body-long"
        )}
        style={{ backgroundColor: backgroundColor }}
        tabIndex={0}
        {...rest}
      >
        {topText && (
          <span className="navds-speech-bubble__top-text navds-detail">
            {topText}
          </span>
        )}
        {children}
      </div>
    );
  }
);

export default Chat;
