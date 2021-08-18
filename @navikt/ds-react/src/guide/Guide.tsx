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
  size: string
) =>
  cl("navds-guide__illustration", `navds-guide__illustration--${size}`, {
    "navds-guide__illustration--center": center,
    "navds-guide__illustration--transparent": transparent,
    "navds-guide__illustration--nomask": noMask,
  });

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
  /**
   * Custom svg/img element (preferably svg)
   */
  illustration: React.ReactNode;
  /**
   * Turns off background on illustration
   * @default false
   */
  transparent?: boolean;
  /**
   * Turns off cropping of illustration
   * @default false
   */
  noMask?: boolean;
  /**
   * Center aligns illustation and renders it in full height
   * @default false
   */
  center?: boolean;
  /**
   * Changes variant of speech-bubble based on wanted message and tone
   * @default "default"
   */
  variant?: "default" | "success" | "warning" | "error";
  /**
   * Predefined size properties for illustration
   * @default "m"
   */
  size?: "s" | "m" | "l" | "xl";
  /**
   * Position of speech-bubble in refenrece to illustration
   * @default "floating"
   */
  position?: "floating" | "top" | "right" | "bottom" | "left";
  /**
   * Renders the speech-bubble with white backround
   * @default false
   */
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
        <div className={illustrationCls(center, transparent, noMask, size)}>
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
