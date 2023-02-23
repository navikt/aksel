import cl from "clsx";
import React, { createContext, forwardRef, useState } from "react";
import ExpansionCardContent, {
  ExpansionCardContentType,
} from "./ExpansionCardContent";
import {
  ExpansionCardDescription,
  ExpansionCardDescriptionType,
} from "./ExpansionCardDescription";
import ExpansionCardHeader, {
  ExpansionCardHeaderType,
} from "./ExpansionCardHeader";
import {
  ExpansionCardTitle,
  ExpansionCardTitleType,
} from "./ExpansionCardTitle";

interface ExpansionCardComponent
  extends React.ForwardRefExoticComponent<
    ExpansionCardProps & React.RefAttributes<HTMLDivElement>
  > {
  Header: ExpansionCardHeaderType;
  Title: ExpansionCardTitleType;
  Description: ExpansionCardDescriptionType;
  Content: ExpansionCardContentType;
}

export interface ExpansionCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Callback function for when the expansion card is toggled open or closed
   */
  onToggle?: (open: boolean) => void;
  /**
   * Controlled open-state
   * Using this removes automatic control of open-state
   */
  open?: boolean;
  /**
   * Defaults to open if not controlled
   * @default false
   */
  defaultOpen?: boolean;
}

export type ExpansionCardContextProps = {
  open: boolean;
  toggleOpen: () => void;
};

export const ExpansionCardContext = createContext<ExpansionCardContextProps>({
  open: false,
  toggleOpen: () => {},
});

export const ExpansionCard = forwardRef<HTMLDivElement, ExpansionCardProps>(
  ({ className, onToggle, open, defaultOpen = false, ...rest }, ref) => {
    const [_open, _setOpen] = useState(defaultOpen);

    const handleOpen = () => {
      if (open === undefined) {
        const newOpen = !_open;
        _setOpen(newOpen);
        onToggle?.(newOpen);
      } else {
        onToggle?.(!open);
      }
    };

    return (
      <ExpansionCardContext.Provider
        value={{ open: open ?? _open, toggleOpen: handleOpen }}
      >
        <div
          {...rest}
          className={cl("navds-expansioncard", className, {
            "navds-expansioncard--open": open,
          })}
          ref={ref}
        />
      </ExpansionCardContext.Provider>
    );
  }
) as ExpansionCardComponent;

ExpansionCard.Header = ExpansionCardHeader;
ExpansionCard.Content = ExpansionCardContent;
ExpansionCard.Title = ExpansionCardTitle;
ExpansionCard.Description = ExpansionCardDescription;

export default ExpansionCard;
