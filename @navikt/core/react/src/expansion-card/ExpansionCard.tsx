import cl from "clsx";
import React, { createContext, forwardRef, useState } from "react";
import ExpansionCardContent, {
  ExpansionCardContentType,
} from "./ExpansionCardContent";
import ExpansionCardHeader, {
  ExpansionCardHeaderType,
} from "./ExpansionCardHeader";

interface ExpansionCardComponent
  extends React.ForwardRefExoticComponent<
    ExpansionCardProps & React.RefAttributes<HTMLDivElement>
  > {
  Header: ExpansionCardHeaderType;
  Content: ExpansionCardContentType;
}

export interface ExpansionCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Instances of ExpansionCard.Item
   */
  children: React.ReactNode;
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
  ({ className, ...rest }, ref) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen((x) => !x);
    };

    return (
      <ExpansionCardContext.Provider value={{ open, toggleOpen: handleOpen }}>
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

export default ExpansionCard;
