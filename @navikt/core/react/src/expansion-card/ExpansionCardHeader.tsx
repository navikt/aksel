import React, { forwardRef, useContext } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { useRenameCSS } from "../theme/Theme";
import { useI18n } from "../util/i18n/i18n.hooks";
import { ExpansionCardContext } from "./context";

export interface ExpansionCardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ExpansionCardHeader = forwardRef<
  HTMLDivElement,
  ExpansionCardHeaderProps
>(({ children, className, ...rest }, ref) => {
  const { cn } = useRenameCSS();
  const panelContext = useContext(ExpansionCardContext);
  const translate = useI18n("global");

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
      className={cn("navds-expansioncard__header", className)}
      data-open={panelContext.open}
    >
      <div className={cn("navds-expansioncard__header-content")}>
        {children}
      </div>

      <button
        className={cn("navds-expansioncard__header-button")}
        onClick={panelContext.toggleOpen}
        type="button"
        aria-expanded={panelContext.open}
      >
        <ChevronDownIcon
          className={cn("navds-expansioncard__header-chevron")}
          title={translate("showMore")}
        />
      </button>
    </div>
  );
});

export default ExpansionCardHeader;
