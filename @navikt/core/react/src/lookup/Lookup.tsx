import React, { forwardRef, useRef, useState } from "react";
import { Popover } from "../popover";
import { Portal } from "../portal";
import { useId } from "../utils-external";
import { FocusBoundary } from "../utils/components/focus-boundary/FocusBoundary";
import { FocusGuards } from "../utils/components/focus-guards/FocusGuards";
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
   * Changes what CSS position property to use
   * You want to use "fixed" if reference element is inside a fixed container, but explanation popover is not
   * @default "absolute"
   */
  strategy?: "absolute" | "fixed";
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
    { word, children, className, placement, strategy, onClick, ...rest },
    ref,
  ) => {
    const [openState, setOpenState] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const mergedRef = useMergeRefs(anchorRef, ref);
    const contentRef = useRef<HTMLDivElement>(null);
    const triggerId = useId();
    const popoverContentId = `${triggerId}-content`;

    return (
      <>
        <button
          {...rest}
          type="button"
          id={triggerId}
          ref={mergedRef}
          className={cl("aksel-lookup-trigger", className)}
          onClick={composeEventHandlers(onClick, () =>
            setOpenState((old) => !old),
          )}
          aria-haspopup="dialog"
          aria-expanded={openState}
          aria-controls={popoverContentId}
        >
          {word}
        </button>
        {openState && (
          <FocusGuards>
            <FocusBoundary
              loop
              trapped={openState}
              initialFocus={contentRef}
              returnFocus={anchorRef}
              modal
            >
              <Portal>
                <Popover
                  anchorEl={anchorRef.current}
                  open={openState}
                  onClose={() => {
                    setOpenState(false);
                  }}
                  placement={placement}
                  strategy={strategy}
                >
                  <Popover.Content
                    ref={contentRef}
                    id={popoverContentId}
                    role="dialog"
                    aria-labelledby={triggerId}
                    tabIndex={-1}
                    className="aksel-lookup__popover-content"
                  >
                    {children}
                    <span className="aksel-sr-only">
                      Trykk Escape for å lukke oppslaget
                    </span>
                  </Popover.Content>
                </Popover>
              </Portal>
            </FocusBoundary>
          </FocusGuards>
        )}
      </>
    );
  },
);

export default Lookup;
