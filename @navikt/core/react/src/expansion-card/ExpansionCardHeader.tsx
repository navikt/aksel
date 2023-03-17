import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import { ExpansionCardContext } from "./ExpansionCard";
import { ChevronDownIcon } from "@navikt/aksel-icons";

export interface ExpansionCardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export type ExpansionCardHeaderType = React.ForwardRefExoticComponent<
  ExpansionCardHeaderProps & React.RefAttributes<HTMLDivElement>
>;

const ExpansionCardHeader: ExpansionCardHeaderType = forwardRef(
  ({ children, className, ...rest }, ref) => {
    const panelContext = useContext(ExpansionCardContext);

    if (panelContext === null) {
      console.error(
        "<ExpansionCard.Header> has to be used within an <ExpansionCard>"
      );
      return null;
    }

    return (
      <div
        ref={ref}
        {...rest}
        className={cl("navds-expansioncard__header", className)}
      >
        <div className="navds-expansioncard__header-content">{children}</div>

        <button
          className="navds-expansioncard__header-button"
          onClick={() => panelContext.toggleOpen()}
          type="button"
          aria-expanded={panelContext.open}
        >
          <span className="navds-sr-only">Vis mer</span>
          <ChevronDownIcon className="navds-expansioncard__header-chevron" />
        </button>
      </div>
    );
  }
);

export default ExpansionCardHeader;
