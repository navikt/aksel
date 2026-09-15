import React, { forwardRef } from "react";
import { Bleed } from "../../primitives/bleed";
import { cl } from "../../utils/helpers";
import { useCoachmarkContext } from "../context/Coachmark.context";

/* TODO:
    - No padding or bleed?
    - Who controls image? Do we set width or do they have to set it themselves?
*/

type CoachmarkImageProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * @see 🏷️ {@link CoachmarkImageProps}
 * @example
 * ```jsx
 *      <Coachmark.Image>
 *        <img src="image.jpg" alt="Description" />
 *      </Coachmark.Image>
 * ```
 */
const CoachmarkImage = forwardRef<HTMLDivElement, CoachmarkImageProps>(
  ({ className, children, ...restProps }, forwardedRef) => {
    const { currentStep } = useCoachmarkContext();
    const isAnchor = currentStep?.type === "anchor";

    return (
      <Bleed asChild marginInline={isAnchor ? "space-16" : "space-0"}>
        <div
          {...restProps}
          ref={forwardedRef}
          className={cl("aksel-coachmark__image", className)}
        >
          {children}
        </div>
      </Bleed>
    );
  },
);

export { CoachmarkImage };
export type { CoachmarkImageProps };
