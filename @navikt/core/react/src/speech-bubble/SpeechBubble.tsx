import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";
import Chat, { ChatType } from "./Chat";
import { BodyLong, BodyShort } from "..";

export interface SpeechBubbleProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Children of type <SpeechBubble.Bubble />
   */
  children: React.ReactNode;
  /**
   * Chat-message name
   */
  name: string;
  /**
   * Timestamp for sent message
   */
  timestamp?: string;
  /**
   * Avatar for messenger. Regular text for initials works to
   */
  avatar: React.ReactNode;
  /**
   * Background color on bubbles
   */
  backgroundColor?: string;
  /**
   * Background color for avatar
   */
  avatarBgColor?: string;
  /**
   * Positions avatar and Speechbubbles
   * @default "left"
   */
  position?: "left" | "right";
}

interface SpeechBubbleComponent
  extends React.ForwardRefExoticComponent<
    SpeechBubbleProps & React.RefAttributes<HTMLDivElement>
  > {
  Chat: ChatType;
}

export const SpeechBubble = forwardRef<HTMLDivElement, SpeechBubbleProps>(
  (
    {
      children,
      className,
      name,
      timestamp,
      avatar,
      position = "left",
      avatarBgColor,
      backgroundColor,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cl(
          "navds-speech-bubble",
          className,
          `navds-speech-bubble--${position}`
        )}
        {...rest}
      >
        <BodyShort
          as="div"
          className="navds-speech-bubble__avatar"
          style={{ backgroundColor: avatarBgColor }}
        >
          {avatar}
        </BodyShort>
        <ol className="navds-speech-bubble__chat-wrapper">
          {React.Children.map(children, (child, i) => {
            if (React.isValidElement(child)) {
              return (
                <BodyLong as="li">
                  {React.cloneElement(child, {
                    name: name && i === 0 ? name : undefined,
                    timestamp: timestamp && i === 0 ? timestamp : undefined,
                    backgroundColor,
                    ...child.props,
                  })}
                </BodyLong>
              );
            }
          })}
        </ol>
      </div>
    );
  }
) as SpeechBubbleComponent;

SpeechBubble.Chat = Chat;

export default SpeechBubble;
