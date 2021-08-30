import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";

export interface GuideProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /**
   * Custom svg/img element
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
   * Predefined size properties for illustration
   * @default "m"
   */
  size?: "small" | "medium" | "large" | "xlarge";
  /**
   * Change color of illustration background
   * Is set with inline style, so css-variables can be used
   */
  color?: string;
}

const Guide = forwardRef<HTMLDivElement, GuideProps>(
  (
    {
      className,
      center = false,
      noMask = false,
      transparent = false,
      illustration,
      size = "medium",
      color,
      ...rest
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cl("navds-guide", className)} {...rest}>
        <div
          style={!!color ? { backgroundColor: `${color}` } : {}}
          className={cl(
            "navds-guide__illustration",
            `navds-guide__illustration--${size}`,
            {
              "navds-guide__illustration--center": center,
              "navds-guide__illustration--transparent": transparent,
              "navds-guide__illustration--nomask": noMask,
            }
          )}
        >
          {illustration}
        </div>
      </div>
    );
  }
);

export default Guide;
