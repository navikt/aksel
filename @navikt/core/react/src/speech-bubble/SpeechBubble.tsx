import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";
import Bubble, { BubbleType } from "./Bubble";

export interface SpeechBubbleProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Children of type <SpeechBubble.Bubble />
   */
  children: React.ReactNode;
  /**
   * Top text for personalia and date
   */
  topText?: React.ReactNode;
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
  Bubble: BubbleType;
}

export const SpeechBubble = forwardRef<HTMLDivElement, SpeechBubbleProps>(
  (
    {
      children,
      className,
      topText,
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
          "navds-speechbubble",
          className,
          `navds-speechbubble--${position}`,
          "navds-body-long"
        )}
        {...rest}
      >
        <div
          className="navds-speechbubble__illustration"
          style={{ backgroundColor: illustrationBgColor }}
        >
          {illustration}
        </div>
        <ol className="navds-speechbubble__bubble-list">
          {React.Children.map(children, (child, i) => {
            if (React.isValidElement(child)) {
              return (
                <li>
                  {React.cloneElement(child, {
                    topText: topText && i === 0 ? topText : undefined,
                    backgroundColor,
                    ...child.props,
                  })}
                </li>
              );
            }
          })}
        </ol>
      </div>
    );
  }
) as SpeechBubbleComponent;

SpeechBubble.Bubble = Bubble;

export default SpeechBubble;
