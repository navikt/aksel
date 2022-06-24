import React, { forwardRef, HTMLAttributes } from "react";
import cl from "clsx";
import { DefaultIllustration } from "./Illustration";
export interface GuideProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /**
   * Custom svg/img element
   */
  illustration?: React.ReactNode;
  /**
   * Predefined size properties for illustration
   * @default "medium"
   */
  size?: "small" | "medium";
}

const Guide = forwardRef<HTMLDivElement, GuideProps>(
  ({ className, illustration, size = "medium", color, ...rest }, ref) => {
    return (
      <div ref={ref} className={cl("navds-guide", className)} {...rest}>
        <div
          className={cl(
            "navds-guide__illustration",
            `navds-guide__illustration--${size}`
          )}
        >
          {illustration ?? <DefaultIllustration />}
        </div>
      </div>
    );
  }
);

export default Guide;
