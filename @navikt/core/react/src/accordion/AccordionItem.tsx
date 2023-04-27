import cl from "clsx";
import React, { createContext, forwardRef, useContext, useState } from "react";
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
}

export type AccordionItemType = React.ForwardRefExoticComponent<
  AccordionItemProps & React.RefAttributes<HTMLDivElement>
>;

export interface AccordionItemContextProps {
  open: boolean;
  toggleOpen: () => void;
}

export const AccordionItemContext =
  createContext<AccordionItemContextProps | null>(null);

const AccordionItem: AccordionItemType = forwardRef(
  (
    { children, className, open, defaultOpen = false, onClick, id, ...rest },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);
    const context = useContext(AccordionContext);

    return (
      <div
        className={cl("navds-accordion__item", className, {
          "navds-accordion__item--open": open ?? internalOpen,
          "navds-accordion__item--neutral": context?.variant === "neutral",
        })}
        ref={ref}
        {...rest}
      >
        <AccordionItemContext.Provider
          value={{
            open: open ?? internalOpen,
            toggleOpen: () => {
              if (open === undefined) {
                setInternalOpen((iOpen) => !iOpen);
              }
            },
          }}
        >
          <div className="navds-accordion__header-outer">{children}</div>
        </AccordionItemContext.Provider>
      </div>
    );
  }
);

export default AccordionItem;
