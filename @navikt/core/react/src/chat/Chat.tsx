import cl from "clsx";
import React, { HTMLAttributes, forwardRef } from "react";
import { BodyLong } from "../typography";
import Bubble from "./Bubble";

export const VARIANTS = ["subtle", "info", "neutral"] as const;
export const POSITIONS = ["left", "right"] as const;
export const SIZES = ["medium", "small"] as const;

export interface ChatProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Children of type `<Chat.Bubble />`.
   */
  children: React.ReactNode;
  /**
   * Name/sender on first bubble.
   */
  name?: string;
  /**
   * Timestamp on first bubble.
   */
  timestamp?: string;
  /**
   * We recommend using an SVG or plain text initials as avatar.
   *
   * **Hidden for screen readers.**
   */
  avatar?: React.ReactNode;
  /**
   * Changes background color on avatar and bubbles.
   * Avoid using the same background as the surface behind Chat.
   * @default "neutral"
   */
  variant?: (typeof VARIANTS)[number];
  /**
   * Positions avatar and bubbles.
   * @default "left"
   */
  position?: (typeof POSITIONS)[number];
  /**
   * Horizontal position of toptext.
   * @default Same as position
   */
  toptextPosition?: (typeof POSITIONS)[number];
  /**
   * Affects padding and font size in bubbles.
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
 * A component for communicating a dialog between two or more parties.
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
      toptextPosition,
      size = "medium",
      ...rest
    }: ChatProps,
    ref,
  ) => (
    <div
      ref={ref}
      className={cl(
        "navds-chat",
        className,
        `navds-chat--${position}`,
        `navds-chat--top-text-${toptextPosition ?? position}`,
        `navds-chat--${size}`,
        `navds-chat--${variant}`,
      )}
      {...rest}
    >
      {avatar && (
        <div className="navds-chat__avatar" aria-hidden>
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
                  ...child.props,
                })}
              </BodyLong>
            );
          }
        })}
      </ol>
    </div>
  ),
) as ChatComponent;

Chat.Bubble = Bubble;

export default Chat;
