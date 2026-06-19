import React, { forwardRef, useRef, useState } from "react";
import { XMarkIcon } from "@navikt/aksel-icons";
import { Button } from "../button";
import { Popover, PopoverProps } from "../popover";
import { Portal } from "../portal";
import { BodyShort } from "../typography";
import { useId } from "../utils-external";
import { FocusBoundary } from "../utils/components/focus-boundary/FocusBoundary";
import { FocusGuards } from "../utils/components/focus-guards/FocusGuards";
import { cl, composeEventHandlers } from "../utils/helpers";
import { useMergeRefs } from "../utils/hooks";
import { useI18n } from "../utils/i18n/i18n.hooks";

export interface LookupProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    Pick<PopoverProps, "placement" | "strategy"> {
  /**
   * Children, explanation popover to lookup word
   */
  children: React.ReactNode;
  /**
   * Lookup word
   */
  word: string;
  /**
   * Title for the lookup element. Usually the same as `word`.
   */
  heading: string;
}

/**
 * A component that displays a popover with an explanation when clicked. Used for looking up words or concepts within a text.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/lookup)
 * @see 🏷️ {@link LookupProps}
 *
 * @example
 * ```jsx
 * <Lookup word="Lookup" heading="«Lookup»">
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
      strategy,
      onClick,
      heading,
      id: idProp,
      ...rest
    },
    ref,
  ) => {
    const [openState, setOpenState] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const mergedRef = useMergeRefs(anchorRef, ref);
    const contentRef = useRef<HTMLDivElement>(null);
    const triggerId = useId(idProp);
    const popoverContentId = `${triggerId}-content`;
    const popoverTitleId = `${triggerId}-title`;
    const translate = useI18n("global");

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
                    aria-modal="true"
                    aria-labelledby={popoverTitleId}
                    aria-keyshortcuts="Escape"
                    tabIndex={-1}
                    className="aksel-lookup__content"
                  >
                    <BodyShort
                      weight="semibold"
                      className="aksel-lookup__title"
                      id={popoverTitleId}
                    >
                      {heading}
                    </BodyShort>
                    {children}
                    <Button
                      type="button"
                      className="aksel-lookup__close-button"
                      size="xsmall"
                      variant="tertiary-neutral"
                      icon={<XMarkIcon title={translate("close")} />}
                      onClick={() => setOpenState(false)}
                    />
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
