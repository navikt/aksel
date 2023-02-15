import cl from "clsx";
import React, { createContext, forwardRef, useState } from "react";
import ExpansionPanelContent, {
  ExpansionPanelContentType,
} from "./ExpansionPanelContent";
import ExpansionPanelHeader, {
  ExpansionPanelHeaderType,
} from "./ExpansionPanelHeader";

interface ExpansionPanelComponent
  extends React.ForwardRefExoticComponent<
    ExpansionPanelProps & React.RefAttributes<HTMLDivElement>
  > {
  Header: ExpansionPanelHeaderType;
  Content: ExpansionPanelContentType;
}

export interface ExpansionPanelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Instances of ExpansionPanel.Item
   */
  children: React.ReactNode;
}

export type ExpansionPanelContextProps = {
  open: boolean;
  toggleOpen: () => void;
};

export const ExpansionPanelContext = createContext<ExpansionPanelContextProps>({
  open: false,
  toggleOpen: () => {},
});

export const ExpansionPanel = forwardRef<HTMLDivElement, ExpansionPanelProps>(
  ({ className, ...rest }, ref) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen((x) => !x);
    };

    return (
      <ExpansionPanelContext.Provider value={{ open, toggleOpen: handleOpen }}>
        <div
          {...rest}
          className={cl("navds-expansionpanel", className, {
            "navds-expansionpanel--open": open,
          })}
          ref={ref}
        />
      </ExpansionPanelContext.Provider>
    );
  }
) as ExpansionPanelComponent;

ExpansionPanel.Header = ExpansionPanelHeader;
ExpansionPanel.Content = ExpansionPanelContent;

export default ExpansionPanel;
