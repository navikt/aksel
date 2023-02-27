import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import { ExpansionCardContext } from "./ExpansionCard";

/**
 * TODO: Small variant 48px høy, 32px knapp
 */
export interface ExpansionCardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   *
   */
  avatar?: React.ReactNode;
}

export type ExpansionCardHeaderType = React.ForwardRefExoticComponent<
  ExpansionCardHeaderProps & React.RefAttributes<HTMLDivElement>
>;

const ExpansionCardHeader: ExpansionCardHeaderType = forwardRef(
  ({ children, className, avatar, ...rest }, ref) => {
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
          "navds-expansioncard__header--open": panelContext.open,
          "navds-expansioncard__header--closed": !panelContext.open,
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
          aria-label={panelContext.open ? "Lukk" : "Åpne"}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
            focusable={false}
            className="navds-expansioncard__icon"
          >
            <path
              d="M17.5 9.5L12 15L6.5 9.5"
              stroke="var(--a-text-default)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    );
  }
);

export default ExpansionCardHeader;
