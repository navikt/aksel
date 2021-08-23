import cl from "classnames";
import React, { createContext, forwardRef, useEffect, useState } from "react";
import AccordionContent, { AccordionContentProps } from "./AccordionContent";
import AccordionHeader, { AccordionHeaderProps } from "./AccordionHeader";

interface AccordionComponent
  extends React.ForwardRefExoticComponent<
    AccordionProps & React.RefAttributes<HTMLDivElement>
  > {
  Header: React.ForwardRefExoticComponent<
    AccordionHeaderProps & React.RefAttributes<HTMLButtonElement>
  >;
  Content: React.ForwardRefExoticComponent<
    AccordionContentProps & React.RefAttributes<HTMLDivElement>
  >;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Content inside accordion
   */
  children: React.ReactNode;
  /**
   * Opens component if 'true', closes if 'false'
   * Using this props removes automatic control of open-state
   * @default false
   */
  open?: boolean;
  /**
   * Removes content-element from dom when closed
   * @default false
   */
  renderContentWhenClosed?: boolean;
}

export interface AccordionContextProps {
  expanded: boolean;
  toggleExpanded: (state: boolean) => void;
  setButtonId: (id: string) => void;
  setContentId: (id: string) => void;
  buttonId: string;
  contentId: string;
  renderContentWhenClosed: boolean;
}

export const AccordionContext = createContext<AccordionContextProps | null>(
  null
);

const Accordion = forwardRef<HTMLButtonElement, AccordionProps>(
  (
    {
      children,
      className,
      open = false,
      renderContentWhenClosed = false,
      onClick,
      id,
      ...rest
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState<boolean>(open);
    const [buttonId, setButtonId] = useState("");
    const [contentId, setContentId] = useState("");

    useEffect(() => {
      setInternalOpen(open);
    }, [open]);

    console.count("Accordion re-renders");

    return (
      <div
        className={cl("navds-accordion", className, {
          "navds-accordion--open": internalOpen,
          "navds-accordion--closed": !internalOpen,
        })}
      >
        <AccordionContext.Provider
          value={{
            expanded: internalOpen,
            toggleExpanded: (v) => setInternalOpen(v),
            renderContentWhenClosed,
            setButtonId,
            buttonId,
            setContentId,
            contentId,
          }}
        >
          {children}
        </AccordionContext.Provider>
      </div>
    );
  }
) as AccordionComponent;

Accordion.Header = AccordionHeader;
Accordion.Content = AccordionContent;

export default Accordion;
