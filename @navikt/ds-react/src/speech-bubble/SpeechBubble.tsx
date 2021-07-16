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
}

const SpeechBubble = forwardRef<HTMLDivElement, SpeechBubbleProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cl("navds-speechbubble", className, "navds-body-long")}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export default SpeechBubble;
