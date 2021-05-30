import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";

const wrapperCls = (
  className: string | undefined,
  position: string,
  variant: string
) =>
  cl(
    "navds-guide",
    className,
    `navds-guide--${position}`,
    `navds-guide--${variant}`
  );

const illustrationCls = (
  center: boolean,
  transparent: boolean,
  noMask: boolean,
  size: string,
  theme: string
) =>
  cl(
    "navds-guide__illustration",
    `navds-guide__illustration--${size}`,
    `navds-guide__illustration--${theme}`,
    {
      "navds-guide__illustration--center": center,
      "navds-guide__illustration--transparent": transparent,
      "navds-guide__illustration--nomask": noMask,
    }
  );

const arrowCls = (position: string, whiteSpeechBubble: boolean) =>
  cl("navds-guide__arrow", `navds-guide__arrow--${position}`, {
    "navds-guide__arrow--white": whiteSpeechBubble,
  });

const speechBubbleCls = (position: string, whiteSpeechBubble: boolean) =>
  cl("navds-guide__speech-bubble", `navds-guide__speech-bubble--${position}`, {
    "navds-guide__speech-bubble--white": whiteSpeechBubble,
  });

export interface GuideProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Component content
   */
  children?: React.ReactNode;
  /**
   * @ignore
   */
  className?: string;
  illustration: React.ReactNode;
  transparent?: boolean;
  noMask?: boolean;
  center?: boolean;
  variant?: "default" | "success" | "warning" | "error";
  theme?: "default" | "info" | "success" | "warning" | "error";
  size?: "s" | "m" | "l" | "xl";
  position?: "floating" | "top" | "right" | "bottom" | "left";
  whiteSpeechBubble?: boolean;
}

const Guide = forwardRef<HTMLDivElement, GuideProps>(
  (
    {
      children,
      className,
      center = false,
      noMask = false,
      transparent = false,
      illustration,
      variant = "default",
      theme = "default",
      size = "m",
      position = "floating",
      whiteSpeechBubble = false,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={wrapperCls(className, position, variant)}
        {...rest}
      >
        <div
          className={illustrationCls(center, transparent, noMask, size, theme)}
        >
          {illustration}
        </div>
        {children && <span className={arrowCls(position, whiteSpeechBubble)} />}
        {children && (
          <div className={speechBubbleCls(position, whiteSpeechBubble)}>
            {children}
          </div>
        )}
      </div>
    );
  }
);

export default Guide;
