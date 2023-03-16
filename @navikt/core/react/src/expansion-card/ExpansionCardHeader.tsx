import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import { ExpansionCardContext } from "./ExpansionCard";

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
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
            focusable={false}
            className="navds-expansioncard__header-chevron"
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
