import React, { forwardRef } from "react";
import { Heading } from "../../typography";
import { useClientLayoutEffect, useId } from "../../utils-external";
import { cl } from "../../utils/helpers";
import { useCoachContext } from "../root/Coach.context";

type CoachTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

/**
 * @see 🏷️ {@link CoachTitleProps}
 * @example
 * ```jsx
 *  <Coach.Step>
 *      <Coach.Title>Coach title</Coach.Title>
 *  </Coach.Step>
 * ```
 */
const CoachTitle = forwardRef<HTMLHeadingElement, CoachTitleProps>(
  ({ className, id, children, ...restProps }, forwardedRef) => {
    const { currentStepSize, setTitleId } = useCoachContext();
    const titleId = useId(id);

    useClientLayoutEffect(() => {
      setTitleId(titleId);
      return () => {
        setTitleId(undefined);
      };
    }, [titleId, setTitleId]);

    return (
      <Heading
        {...restProps}
        id={titleId}
        ref={forwardedRef}
        className={cl("aksel-coach__title", className)}
        size={currentStepSize}
        level="1"
      >
        {children}
      </Heading>
    );
  },
);

export { CoachTitle };
export type { CoachTitleProps };
