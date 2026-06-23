import React, { forwardRef, useRef } from "react";
import { XMarkIcon } from "@navikt/aksel-icons";
import { Button } from "../button";
import { Popover, PopoverProps } from "../popover";
import { Portal } from "../portal";
import { BodyShort } from "../typography";
import { useId } from "../utils-external";
import { FocusBoundary } from "../utils/components/focus-boundary/FocusBoundary";
import { FocusGuards } from "../utils/components/focus-guards/FocusGuards";
import { cl, composeEventHandlers } from "../utils/helpers";
import { useControllableState, useMergeRefs } from "../utils/hooks";
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
   * Controlled open-state.
   *
   * Using this removes automatic control of open-state.
   */
  open?: boolean;
  /**
   * The open state when initially rendered. Use when you do not need to control the open state.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Callback for current open-state.
   */
  onOpenChange?: (open: boolean) => void;
}

/**
 * Displays a popup with a word explanation when clicked. Used for looking up words or concepts within text.
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
      strategy,
      onClick,
      id: idProp,
      open,
      defaultOpen = false,
      onOpenChange,
      ...rest
    },
    ref,
  ) => {
    const [_open, _setOpen] = useControllableState({
      defaultValue: defaultOpen,
      value: open,
      onChange: onOpenChange,
    });

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
          onClick={composeEventHandlers(onClick, () => _setOpen((old) => !old))}
          aria-haspopup="dialog"
          aria-expanded={_open}
          aria-controls={_open ? popoverContentId : undefined}
        >
          {word}
        </button>
        {_open && (
          <FocusGuards>
            <FocusBoundary
              loop
              trapped
              initialFocus={contentRef}
              returnFocus={anchorRef}
              modal
            >
              <Portal>
                <Popover
                  anchorEl={anchorRef.current}
                  open={_open}
                  onClose={() => {
                    _setOpen(false);
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
                      {word}
                    </BodyShort>
                    <div>{children}</div>
                    <Button
                      type="button"
                      className="aksel-lookup__close-button"
                      size="xsmall"
                      variant="tertiary"
                      data-color="neutral"
                      icon={<XMarkIcon title={translate("close")} />}
                      onClick={() => _setOpen(false)}
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
