import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import { ExpansionCardContext } from "./ExpansionCard";
import { ChevronDownIcon } from "@navikt/aksel-icons";

export interface ExpansionCardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   *  Illustration or icon to be displayed
   */
  avatar?: React.ReactNode;
  /**
   * removes gray circle behind avatar
   * @default false
   */
  hideAvatarBg?: boolean;
}

export type ExpansionCardHeaderType = React.ForwardRefExoticComponent<
  ExpansionCardHeaderProps & React.RefAttributes<HTMLDivElement>
>;

const ExpansionCardHeader: ExpansionCardHeaderType = forwardRef(
  ({ children, className, avatar, hideAvatarBg = false, ...rest }, ref) => {
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
        className={cl("navds-expansioncard__header", className, {
          "navds-expansioncard__header--no-avatar-bg": hideAvatarBg,
        })}
      >
        {avatar && (
          <span
            className={cl("navds-expansioncard__header-avatar")}
            aria-hidden
          >
            {avatar}
          </span>
        )}
        <span className="navds-expansioncard__header-content">{children}</span>

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
