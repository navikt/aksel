import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";

export interface SpeechBubbleProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Children of type <Bubble />
   * TODO: Type this to <Bubble /> comp
   */
  children: React.ReactNode;
  /**
   * @ignore
   */
  className?: string;
  /**
   * Top text for personalia and date
   */
  topText?: React.ReactNode;
  /**
   * Illustration for messenger
   */
  illustration?: React.ReactNode;
  /**
   * Background color bubbles
   */
  backgroundColor?: string;
  /**
   * Background color for illustration
   */
  illustrationBgColor?: string;
  /**
   * Positions illustration and Speechbubbles
   */
  position?: "left" | "right";
}

const SpeechBubble = forwardRef<HTMLDivElement, SpeechBubbleProps>(
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
        {React.Children.map(children, (child, i) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              topText: topText && i === 0 ? topText : undefined,
              backgroundColor,
              ...child.props,
            });
          }
        })}
      </div>
    );
  }
);

export default SpeechBubble;
