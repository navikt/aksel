import React, { forwardRef, useRef, useState } from "react";
import { Popover } from "../popover";
import { cl } from "../utils/helpers";
import { useMergeRefs } from "../utils/hooks";

/**
 * TODO:
 * [] Dotted underline on trigger element
 * [] Trigger styling
 * [] Popover styling
 * [] Make word inline with text
 * [] Accessibility
 * [] Popover placement
 * [] Click outside to close
 * [] Breakline on word
 * [] Popover sizing?
 * [] Research hover effect
 * [] Discuss span role button vs button element
 * [] Fix documentation
 */

export interface LookupProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Word to look up
   */
  word: string;
  /**
   * Default orientation of popover
   *
   * Try to keep general usage to "top", "bottom", "left", "right".
   * @default "top"
   */
  placement?:
    | "top"
    | "bottom"
    | "right"
    | "left"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end"
    | "right-start"
    | "right-end"
    | "left-start"
    | "left-end";
  /**
   * Just for testing: hover effect on trigger element
   */
  hoverEffectTEST?: boolean;
  /**
   * Children, content of the popover
   */
  children: React.ReactNode;
}

export const Lookup = forwardRef<HTMLSpanElement, LookupProps>(
  (
    {
      word,
      children,
      className,
      placement = "top",
      hoverEffectTEST = false,
      ...rest
    },
    ref,
  ) => {
    const [openState, setOpenState] = useState(false);
    const anchorRef = useRef<HTMLSpanElement>(null);
    const mergedRef = useMergeRefs(ref, anchorRef);

    return (
      <>
        <button
          ref={mergedRef}
          className={cl("aksel-lookup-trigger", className)}
          {...rest}
          onClick={() => setOpenState(!openState)}
          aria-label={`Explanation of ${word}`} // TODO: Fix
          aria-expanded={openState}
          data-hover-effect={hoverEffectTEST}
        >
          {word}
        </button>
        <Popover
          anchorEl={anchorRef.current}
          open={openState}
          onClose={() => setOpenState(false)}
          placement={placement}
        >
          <Popover.Content>{children}</Popover.Content>
        </Popover>
      </>
    );
  },
);

export default Lookup;
