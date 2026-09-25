import React, { forwardRef } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { cl } from "../../utils/helpers";
import { useI18n } from "../../utils/i18n/i18n.hooks";
import { useExpansionCardContext } from "../root/ExpansionCardRoot.context";

interface ExpansionCardHeaderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

/**
 * @see 🏷️ {@link ExpansionCardHeaderProps}
 */
const ExpansionCardHeader = forwardRef<HTMLElement, ExpansionCardHeaderProps>(
  ({ children, className, ...rest }, ref) => {
    const translate = useI18n("global");
    const { summaryClicked } = useExpansionCardContext();

    return (
      // biome-ignore lint/a11y/noStaticElementInteractions: Think this is false positive, but the click handler is not critical anyways.
      <summary
        ref={ref}
        {...rest}
        className={cl("aksel-expansioncard__header", className)}
        onClick={(e) => {
          e.preventDefault();
          summaryClicked();
        }}
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

// eslint-disable-next-line @typescript-eslint/no-namespace, import/export
export namespace ExpansionCardHeader {
  export type Props = ExpansionCardHeaderProps;
}

// eslint-disable-next-line import/export
export { ExpansionCardHeader };
export type { ExpansionCardHeaderProps };
