import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { useI18n } from "../util/i18n/i18n.context";
import { ExpansionCardContext } from "./context";

export interface ExpansionCardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ExpansionCardHeader = forwardRef<
  HTMLDivElement,
  ExpansionCardHeaderProps
>(({ children, className, ...rest }, ref) => {
  const panelContext = useContext(ExpansionCardContext);
  const translate = useI18n("ExpansionCard");

  if (panelContext === null) {
    console.error(
      "<ExpansionCard.Header> has to be used within an <ExpansionCard>",
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
        onClick={panelContext.toggleOpen}
        type="button"
        aria-expanded={panelContext.open}
      >
        <ChevronDownIcon
          className="navds-expansioncard__header-chevron"
          title={translate("Header.buttonTitle")}
        />
      </button>
    </div>
  );
});

export default ExpansionCardHeader;
