import React, { forwardRef, useRef, useState } from "react";
import { Popover } from "../popover";
import { Portal } from "../portal";
import { useId } from "../utils-external";
import { cl, composeEventHandlers } from "../utils/helpers";
import { useMergeRefs } from "../utils/hooks";

/**
 * TODO:
 * [x] Dotted underline on trigger element
 * [x] Trigger styling
 * [x] Popover styling
 * [] Make word inline with text
 * [] Accessibility
 * [x] Popover placement
 * [x] Click outside to close
 * [] Breakline on word
 * [x] Popover sizing?
 * [x] Research hover effect
 * [x] Discuss span role button vs button element
 * [x] Fix documentation
 * [] Open on hover?
 */

export interface LookupProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Children, explanation popover to lookup word
   */
  children: React.ReactNode;
  /**
   * Lookup word
   */
  word: string;
  /**
   * Default orientation of the explanation popover
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
   * Distance from lookup word to explanation popover
   * @default 8
   */
  offset?: number;
  /**
   * Changes what CSS position property to use
   * You want to use "fixed" if reference element is inside a fixed container, but explanation popover is not
   * @default "absolute"
   */
  strategy?: "absolute" | "fixed";
  /**
   * Changes placement of the floating element in order to keep it in view.
   * @default true
   */
  flip?: boolean;
  /**
   * Just for testing: hover effect on trigger element. TODO: Talk to design about hover effect.
   */
  UNSAFEhoverEffect?: boolean;
}

/**
 * A component that displays a popover with an explanation when clicked. Used for looking up words or concepts within a text.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/lookup)
 * @see 🏷️ {@link LookupProps}
 *
 * @example
 * ```jsx
 * <Lookup word="Lookup">
 *   Lookup component
 * </Lookup>
 * ```
 */
export const Lookup = forwardRef<HTMLButtonElement, LookupProps>(
  (
    {
      word,
      children,
      className,
      placement,
      flip,
      offset,
      strategy,
      onClick,
      UNSAFEhoverEffect = false,
      ...rest
    },
    ref,
  ) => {
    const [openState, setOpenState] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const mergedRef = useMergeRefs(ref, anchorRef);
    const popoverId = useId();

    return (
      <>
        <button
          {...rest}
          type="button"
          ref={mergedRef}
          className={cl("aksel-lookup-trigger", className)}
          onClick={composeEventHandlers(onClick, () =>
            setOpenState((old) => !old),
          )}
          aria-expanded={openState}
          aria-controls={popoverId}
          data-hover-effect={UNSAFEhoverEffect}
        >
          {word}
        </button>
        <Portal>
          <Popover
            id={popoverId}
            anchorEl={anchorRef.current}
            open={openState}
            onClose={() => setOpenState(false)}
            placement={placement}
            flip={flip}
            offset={offset}
            strategy={strategy}
          >
            <Popover.Content>{children}</Popover.Content>
          </Popover>
        </Portal>
      </>
    );
  },
);

export default Lookup;
