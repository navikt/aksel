import cl from "clsx";
import React, {
  createContext,
  forwardRef,
  useContext,
  useRef,
  useState,
} from "react";
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

    const [_open, _setOpen] = useState(defaultOpen);
    const shouldAnimate = useRef<boolean>(!(Boolean(open) || defaultOpen));
    const handleOpen = () => {
      if (open === undefined) {
        const newOpen = !_open;
        _setOpen(newOpen);
        setInternalOpen(newOpen);
      } else {
        setInternalOpen(!open);
      }
      shouldAnimate.current = true;
    };

    return (
      <div
        className={cl("navds-accordion__item", className, {
          "navds-accordion__item--open": open ?? internalOpen,
          "navds-accordion__item--neutral": context?.variant === "neutral",
          "navds-accordion__item--no-anim": !shouldAnimate.current,
        })}
        ref={ref}
        {...rest}
      >
        <AccordionItemContext.Provider
          value={{
            open: open ?? internalOpen,
            toggleOpen: handleOpen,
          }}
        >
          <div>{children}</div>
        </AccordionItemContext.Provider>
      </div>
    );
  }
);

export default AccordionItem;
