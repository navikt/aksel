import React, { createContext, forwardRef, useContext, useRef } from "react";
import { omit } from "../utils-external";
import { cl } from "../utils/helpers";
import { useControllableState } from "../utils/hooks";
import { AccordionContext } from "./AccordionContext";

export interface AccordionItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Content in Accordion.Item
   * Should include one Accordion.Header and one Accordion.Content
   */
  children: React.ReactNode;
  /**
   * Controlled open-state
   * Using this removes automatic control of open-state
   */
  open?: boolean;
  /**
   * Defaults the accordion to open if not controlled
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Callback for current open-state
   */
  onOpenChange?: (open: boolean) => void;
}

export interface AccordionItemContextProps {
  open: boolean;
  toggleOpen: () => void;
}

export const AccordionItemContext =
  createContext<AccordionItemContextProps | null>(null);

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

    const shouldAnimate = useRef<boolean>(!(Boolean(open) || defaultOpen));

    const handleOpen = () => {
      _setOpen((x) => !x);
      shouldAnimate.current = true;
    };

    if (!context?.mounted) {
      console.error("<Accordion.Item> has to be used within an <Accordion>");
    }

    return (
      <div
        className={cl("aksel-accordion__item", className, {
          "aksel-accordion__item--open": _open,
          "aksel-accordion__item--no-animation": !shouldAnimate.current,
        })}
        data-expanded={_open}
        ref={ref}
        {...omit(rest, ["onClick"])}
      >
        <AccordionItemContext.Provider
          value={{
            open: _open,
            toggleOpen: handleOpen,
          }}
        >
          {children}
        </AccordionItemContext.Provider>
      </div>
    );
  },
);

export default AccordionItem;
