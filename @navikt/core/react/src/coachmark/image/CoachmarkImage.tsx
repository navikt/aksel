import React, { forwardRef } from "react";
import { Bleed } from "../../primitives/bleed";
import { cl } from "../../utils/helpers";

type ImageAspectRatio = "1/1" | "16/9" | "16/10" | "4/3" | (string & {});

interface CoachmarkImageProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * The aspect-ratio CSS property allows you to define the desired width-to-height ratio of an element's box.
   * This means that even if the parent container or viewport size changes, the browser will adjust the element's dimensions to maintain the specified width-to-height ratio.
   */
  aspectRatio?: ImageAspectRatio;
}

/**
 * @see 🏷️ {@link CoachmarkImageProps}
 * @example
 * ```jsx
 *  <Coachmark.Image>
 *    <img src="image.jpg" alt="Description" />
 *  </Coachmark.Image>
 * ```
 */
const CoachmarkImage = forwardRef<HTMLDivElement, CoachmarkImageProps>(
  ({ className, children, style, aspectRatio, ...restProps }, forwardedRef) => {
    return (
      <Bleed asChild marginInline="space-16">
        <div
          ref={forwardedRef}
          className={cl("aksel-coachmark__image-container", className)}
          style={{ aspectRatio, ...style }}
          {...restProps}
        >
          {children}
        </div>
      </Bleed>
    );
  },
);

export { CoachmarkImage };
export type { CoachmarkImageProps };
