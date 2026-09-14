import React, { forwardRef } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { cl } from "../../utils/helpers";
import { useI18n } from "../../utils/i18n/i18n.hooks";

interface ExpansionCardHeaderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

/**
 * @see 🏷️ {@link ExpansionCardHeaderProps}
 */
const ExpansionCardHeader = forwardRef<HTMLElement, ExpansionCardHeaderProps>(
  ({ children, className, ...rest }, ref) => {
    const translate = useI18n("global");

    return (
      <summary
        ref={ref}
        {...rest}
        className={cl("aksel-expansioncard__header", className)}
      >
        <div>{children}</div>

        <div className="aksel-expansioncard__header-button">
          <ChevronDownIcon
            className="aksel-expansioncard__header-chevron"
            title={translate("showMore")}
          />
        </div>
      </summary>
    );
  },
);

export { ExpansionCardHeader };
export type { ExpansionCardHeaderProps };
