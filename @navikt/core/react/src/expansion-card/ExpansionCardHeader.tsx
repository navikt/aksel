import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import { ExpansionCardContext } from "./ExpansionCard";

/**
 * TODO:
 * - Prop for header-size
 * - Prop for hele klikkbar vs bare knapp (default hele)
 * - Undersøke flere varianter
 */
export interface ExpansionCardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   *
   */
  avatar?: React.ReactNode;
  /**
   * @default "neutral"
   */
  avatarVariant?:
    | "warning"
    | "success"
    | "danger"
    | "info"
    | "neutral"
    | "alt1"
    | "alt2"
    | "alt3";
}

export type ExpansionCardHeaderType = React.ForwardRefExoticComponent<
  ExpansionCardHeaderProps & React.RefAttributes<HTMLDivElement>
>;

const ExpansionCardHeader: ExpansionCardHeaderType = forwardRef(
  ({ children, className, avatar, avatarVariant, ...rest }, ref) => {
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
            className={cl(
              "navds-expansioncard__header-avatar",
              `navds-expansioncard__header-avatar--${avatarVariant}`
            )}
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
