import cl from "classnames";
import React, { createContext, forwardRef, useState } from "react";
import AccordionContent, { AccordionContentType } from "./AccordionContent";
import AccordionHeader, { AccordionHeaderType } from "./AccordionHeader";

interface AccordionComponent
  extends React.ForwardRefExoticComponent<
    AccordionProps & React.RefAttributes<HTMLDivElement>
  > {
  Header: AccordionHeaderType;
  Content: AccordionContentType;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Content inside accordion
   */
  children: React.ReactNode;
  /**
   * Opens component if 'true', closes if 'false'
   * Using this props removes automatic control of open-state
   */
  open?: boolean;
  /**
   * Defaults the accordion to opened state
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Removes content-element from dom when closed
   * @default false
   */
  renderContentWhenClosed?: boolean;
}

export interface AccordionContextProps {
  open: boolean;
  toggleOpen: () => void;
  setButtonId: (id: string) => void;
  setContentId: (id: string) => void;
  buttonId: string;
  contentId: string;
  renderContentWhenClosed: boolean;
}

export const AccordionContext = createContext<AccordionContextProps | null>(
  null
);

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      children,
      className,
      open,
      defaultOpen = false,
      renderContentWhenClosed = false,
      onClick,
      id,
      ...rest
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);
    const [buttonId, setButtonId] = useState("");
    const [contentId, setContentId] = useState("");

    return (
      <div
        className={cl("navds-accordion", className, {
          "navds-accordion--open": open ?? internalOpen,
        })}
        ref={ref}
        {...rest}
      >
        <AccordionContext.Provider
          value={{
            open: open ?? internalOpen,
            toggleOpen: () => {
              if (open === undefined) {
                setInternalOpen((iOpen) => !iOpen);
              }
            },
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
