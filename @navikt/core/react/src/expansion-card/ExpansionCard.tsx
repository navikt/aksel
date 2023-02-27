import cl from "clsx";
import React, { createContext, forwardRef, useRef, useState } from "react";
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
  /**
   * @default "neutral"
   */
  variant?:
    | "warning"
    | "warning-filled"
    | "success"
    | "success-filled"
    | "danger"
    | "danger-filled"
    | "info"
    | "info-filled"
    | "neutral"
    | "neutral-filled"
    | "alt1"
    | "alt1-filled"
    | "alt2"
    | "alt2-filled"
    | "alt3"
    | "alt3-filled";

  /**
   * @defualt "medium"
   */
  size?: "medium" | "small";
  /**
   *
   */
  clickArea?: "full" | "button";
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
  (
    {
      className,
      onToggle,
      open,
      defaultOpen = false,
      variant = "neutral",
      size = "medium",
      clickArea = "full",
      ...rest
    },
    ref
  ) => {
    const [_open, _setOpen] = useState(defaultOpen);

    const shouldFade = useRef<boolean>(!open || !defaultOpen);

    const handleOpen = () => {
      if (open === undefined) {
        const newOpen = !_open;
        _setOpen(newOpen);
        onToggle?.(newOpen);
      } else {
        onToggle?.(!open);
      }
      shouldFade.current = true;
    };

    return (
      <ExpansionCardContext.Provider
        value={{ open: open ?? _open, toggleOpen: handleOpen }}
      >
        <div
          {...rest}
          className={cl(
            "navds-expansioncard",
            className,
            `navds-expansioncard--${variant}`,
            `navds-expansioncard--${size}`,
            `navds-expansioncard--clickarea-${clickArea}`,
            {
              "navds-expansioncard--filled":
                variant && variant.includes("-filled"),
              "navds-expansioncard--open": open ?? _open,
              "navds-expansioncard--fade": shouldFade.current,
            }
          )}
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
