import React, { HTMLAttributes, forwardRef } from "react";
import type { AkselStatusColorRole } from "@navikt/ds-tokens/types";
import { AkselColor } from "../types";
import { BodyLong, HeadingProps } from "../typography";
import { cl } from "../utils/helpers";
import Bubble, { type ChatBubbleProps } from "./Bubble";

export const VARIANTS = ["subtle", "info", "neutral"] as const;
export const POSITIONS = ["left", "right"] as const;
export const SIZES = ["medium", "small"] as const;

interface ChatProps extends HTMLAttributes<HTMLDivElement> {
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
   * @deprecated Use `data-color` prop instead.
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
  /**
   * The heading level for the toptext.
   * @default "3"
   */
  toptextHeadingLevel?: Exclude<HeadingProps["level"], "1">;
  /**
   * Overrides inherited color.
   *
   * We have disallowed status-colors.
   * @see 🏷️ {@link AkselColor}
   * @see [📝 Documentation](https://aksel.nav.no/grunnleggende/styling/farger-tokens)
   */
  "data-color"?: Exclude<AkselColor, AkselStatusColorRole>;
}

interface ChatComponent extends React.ForwardRefExoticComponent<
  ChatProps & React.RefAttributes<HTMLDivElement>
> {
  /**
   * @see 🏷️ {@link ChatBubbleProps}
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
      toptextHeadingLevel = "3",
      "data-color": color,
      ...rest
    }: ChatProps,
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cl(
          "aksel-chat",
          className,
          `aksel-chat--${position}`,
          `aksel-chat--top-text-${toptextPosition ?? position}`,
          `aksel-chat--${size}`,
          `aksel-chat--${variant}`,
        )}
        data-color={color ?? variantToColor(variant)}
        {...rest}
        data-variant={variant}
      >
        {avatar && (
          <div className="aksel-chat__avatar" aria-hidden>
            {avatar}
          </div>
        )}
        <BodyLong as="div" size={size} className="aksel-chat__bubble-wrapper">
          {React.Children.map(children, (child, i) => {
            if (!React.isValidElement<ChatBubbleProps>(child)) {
              return null;
            }

            return React.cloneElement(child, {
              name: name && i === 0 ? name : undefined,
              timestamp: timestamp && i === 0 ? timestamp : undefined,
              toptextHeadingLevel,
              ...child.props,
            });
          })}
        </BodyLong>
      </div>
    );
  },
) as ChatComponent;

function variantToColor(variant: ChatProps["variant"]): AkselColor {
  switch (variant) {
    case "neutral":
      return "neutral";
    case "subtle":
      return "neutral";
    case "info":
      return "info";
    default:
      return "neutral";
  }
}

Chat.Bubble = Bubble;

export default Chat;
export { Bubble as ChatBubble };
export type { ChatProps, ChatBubbleProps };
