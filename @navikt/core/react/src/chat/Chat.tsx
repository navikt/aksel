import React, { forwardRef, HTMLAttributes } from "react";
import cl from "clsx";
import Bubble, { BubbleType } from "./Bubble";
import { BodyLong, BodyShort } from "../typography";

export interface ChatProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Children of type <Chat.Bubble />
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
   * Positions avatar and Bubbles
   * @default "left"
   */
  position?: "left" | "right";
  /**
   * Hoizontal position of toptext
   * @default Same as chat
   */
  toptextPosition?: "left" | "right";
}

interface ChatComponent
  extends React.ForwardRefExoticComponent<
    ChatProps & React.RefAttributes<HTMLDivElement>
  > {
  Bubble: BubbleType;
}

/**
 * A component for displaying chat messages.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/chat)
 * @see 🏷️ {@link ChatProps}
 *
 * @example
 * ```jsx
 * <Chat>
 *   <Chat.Bubble avatar="A" name="Alice">Hello!</Chat.Bubble>
 * </Chat>
 * <Chat>
 *   <Chat.Bubble avatar="B" name="Bob">Hi there!</Chat.Bubble>
 * </Chat>
 * ```
 */
export const Chat = forwardRef<HTMLDivElement, ChatProps>(
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
      toptextPosition,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cl(
          "navds-chat",
          className,
          `navds-chat--${position} navds-chat--top-text-${
            toptextPosition ?? position
          }`
        )}
        {...rest}
      >
        <BodyShort
          as="div"
          className="navds-chat__avatar"
          style={{ backgroundColor: avatarBgColor }}
        >
          {avatar}
        </BodyShort>
        <ol className="navds-chat__bubble-wrapper">
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
) as ChatComponent;

Chat.Bubble = Bubble;

export default Chat;
