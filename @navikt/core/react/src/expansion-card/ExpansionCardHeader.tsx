import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import { BodyShort } from "../typography";
import { Heading } from "../typography/Heading";
import { ExpansionCardContext } from "./ExpansionCard";

export interface ExpansionCardHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  /**
   * Title text
   */
  title: string;
  /**
   * Description text
   */
  description?: string;
  /**
   *
   */
  avatar?: React.ReactNode;
  /**
   * @default "neutral"
   */
  avatarVariant?: "warning" | "success" | "danger" | "info" | "neutral";
}

export type ExpansionCardHeaderType = React.ForwardRefExoticComponent<
  ExpansionCardHeaderProps & React.RefAttributes<HTMLDivElement>
>;

const ExpansionCardHeader: ExpansionCardHeaderType = forwardRef(
  ({ title, className, description, avatar, avatarVariant, ...rest }, ref) => {
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
        aria-expanded={panelContext.open}
        aria-label={`${title}${description ? ` , ${description}` : ""}`}
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
        <span className="navds-expansioncard__header-content">
          <Heading size="small" as="span">
            {title}
          </Heading>
          <BodyShort as="span">{description}</BodyShort>
        </span>

        <button
          className="navds-expansioncard__header-button"
          onClick={() => panelContext.toggleOpen()}
          type="button"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
            focusable={false}
            className="navds-expansioncard__open-icon"
          >
            <path
              d="M17.5 9.5L12 15L6.5 9.5"
              stroke="#262626"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
            focusable={false}
            className="navds-expansioncard__close-icon"
          >
            <path
              d="M17.5 6.5L6.5 17.5"
              stroke="#262626"
              strokeWidth="1.5"
              strokeMiterlimit="3.99933"
              strokeLinecap="round"
            />
            <path
              d="M6.5 6.5L17.5 17.5"
              stroke="#262626"
              strokeWidth="1.5"
              strokeMiterlimit="3.99933"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    );
  }
);

export default ExpansionCardHeader;
