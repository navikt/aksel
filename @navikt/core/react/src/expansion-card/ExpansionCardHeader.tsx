import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import { ExpansionCardContext } from "./ExpansionCard";
import { ChevronDownIcon } from "@navikt/aksel-icons";

export interface ExpansionCardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ExpansionCardHeader = forwardRef<
  HTMLDivElement,
  ExpansionCardHeaderProps
>(({ children, className, ...rest }, ref) => {
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
        <ChevronDownIcon
          className="navds-expansioncard__header-chevron"
          title="Vis mer"
        />
      </button>
    </div>
  );
});

export default ExpansionCardHeader;
