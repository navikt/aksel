import React, { forwardRef, HTMLAttributes } from "react";
import cl from "clsx";
import Bubble from "./Bubble";
import { BodyLong } from "../typography";

export const POSITIONS = ["left", "right"] as const;
export const SIZES = ["medium", "small"] as const;

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
   * Avatar for messenger. Regular text for initials works too, but it will be hidden for screen readers.
   */
  avatar?: React.ReactNode;
  /**
   * Changes background color on avatar and bubbles.
   * Avoid using the same background as the surface behind Chat.
   * @default "neutral"
   */
  variant?: "subtle" | "info" | "neutral";
  /**
   * Background color on bubbles
   * @deprecated Use `variant` instead
   */
  backgroundColor?: string;
  /**
   * Background color for avatar
   * @deprecated Use `variant` instead
   */
  avatarBgColor?: string;
  /**
   * Positions avatar and bubbles
   * @default "left"
   */
  position?: (typeof POSITIONS)[number];
  /**
   * Hoizontal position of toptext
   * @default Same as position
   */
  toptextPosition?: (typeof POSITIONS)[number];
  /**
   * Affects padding and font size in bubbles
   * @default "medium"
   */
  size?: (typeof SIZES)[number];
}

interface ChatComponent
  extends React.ForwardRefExoticComponent<
    ChatProps & React.RefAttributes<HTMLDivElement>
  > {
  /**
   * @see 🏷️ {@link BubbleProps}
   */
  Bubble: typeof Bubble;
}

/**
 * A component for communicating dialogs between two parties.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/chat)
 * @see 🏷️ {@link ChatProps}
 *
 * @example
 * ```jsx
 * <Chat avatar="A" name="Alice" timestamp="01.01.21 14:00">
 *   <Chat.Bubble>Hello!</Chat.Bubble>
 *   <Chat.Bubble>How can I help you?</Chat.Bubble>
 * </Chat>
 * <Chat avatar="B" name="Bob" timestamp="01.01.21 14:01" position="right">
 *   <Chat.Bubble>Hi there!</Chat.Bubble>
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
      variant = "neutral",
      avatarBgColor,
      backgroundColor,
      toptextPosition,
      size = "medium",
      ...rest
    }: ChatProps,
    ref
  ) => (
    <div
      ref={ref}
      className={cl(
        "navds-chat",
        className,
        `navds-chat--${position}`,
        `navds-chat--top-text-${toptextPosition ?? position}`,
        `navds-chat--${size}`,
        `navds-chat--${variant}`
      )}
      {...rest}
    >
      {avatar && (
        <div
          className="navds-chat__avatar"
          aria-hidden
          style={{ backgroundColor: avatarBgColor }}
        >
          {avatar}
        </div>
      )}
      <ol className="navds-chat__bubble-wrapper">
        {React.Children.map(children, (child, i) => {
          if (React.isValidElement(child)) {
            return (
              <BodyLong as="li" size={size}>
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
  )
) as ChatComponent;

Chat.Bubble = Bubble;

export default Chat;
