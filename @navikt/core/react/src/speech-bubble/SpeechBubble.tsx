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
   * Chat-message sender
   */
  sender: string;
  /**
   * Timestamp for sent message
   */
  timestamp?: string;
  /**
   * Illustration for messenger. Regular text for initials works to
   */
  illustration: React.ReactNode;
  /**
   * Background color on bubbles
   */
  backgroundColor?: string;
  /**
   * Background color for illustration
   */
  illustrationBgColor?: string;
  /**
   * Positions illustration and Speechbubbles
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
      sender,
      timestamp,
      illustration,
      position = "left",
      illustrationBgColor,
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
          className="navds-speech-bubble__illustration"
          style={{ backgroundColor: illustrationBgColor }}
        >
          {illustration}
        </BodyShort>
        <ol className="navds-speech-bubble__chat-wrapper">
          {React.Children.map(children, (child, i) => {
            if (React.isValidElement(child)) {
              return (
                <BodyLong as="li">
                  {React.cloneElement(child, {
                    sender: sender && i === 0 ? sender : undefined,
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
