import React, { forwardRef, useContext, useMemo } from "react";
import { omit } from "../../utils-external";
import { cl } from "../../utils/helpers";
import { useControllableState } from "../../utils/hooks";
import { AccordionContext } from "../root/AccordionRoot.context";
import { AccordionItemContext } from "./AccordionItem.context";

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Content in Accordion.Item.
   *
   * Should include one Accordion.Header and one Accordion.Content.
   */
  children: React.ReactNode;
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

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  (
    { children, className, open, defaultOpen = false, onOpenChange, ...rest },
    ref,
  ) => {
    const [_open, _setOpen] = useControllableState({
      defaultValue: defaultOpen,
      value: open,
      onChange: onOpenChange,
    });

    const context = useContext(AccordionContext);

    if (!context?.mounted) {
      console.error("<Accordion.Item> has to be used within an <Accordion>");
    }

    const contextValue = useMemo(
      () => ({
        open: _open,
        toggleOpen: () => _setOpen((x) => !x),
      }),
      [_open, _setOpen],
    );

    return (
      <div
        className={cl("aksel-accordion__item", className, {
          "aksel-accordion__item--open": _open,
        })}
        data-expanded={_open}
        ref={ref}
        {...omit(rest, ["onClick"])}
      >
        <AccordionItemContext.Provider value={contextValue}>
          {children}
        </AccordionItemContext.Provider>
      </div>
    );
  },
);

export { AccordionItem };
export type { AccordionItemProps };
