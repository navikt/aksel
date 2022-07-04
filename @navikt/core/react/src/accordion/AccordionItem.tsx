import cl from "clsx";
import React, { createContext, forwardRef, useState } from "react";

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

    return (
      <div
        className={cl("navds-accordion__item", className, {
          "navds-accordion__item--open": open ?? internalOpen,
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
          {children}
        </AccordionItemContext.Provider>
      </div>
    );
  }
);

export default AccordionItem;
