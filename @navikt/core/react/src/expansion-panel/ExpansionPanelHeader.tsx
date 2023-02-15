import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import { BodyShort } from "../typography";
import { Heading } from "../typography/Heading";
import { ExpansionPanelContext } from "./ExpansionPanel";

export interface ExpansionPanelHeaderProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, "onClick"> {
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
   *
   */
  headingTag?: "h2" | "h3" | "h4" | "h5" | "h6";
  /**
   *
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export type ExpansionPanelHeaderType = React.ForwardRefExoticComponent<
  ExpansionPanelHeaderProps & React.RefAttributes<HTMLHeadingElement>
>;

const ExpansionPanelHeader: ExpansionPanelHeaderType = forwardRef(
  (
    {
      title,
      className,
      onClick,
      description,
      avatar,
      headingTag = "h3",
      ...rest
    },
    ref
  ) => {
    const panelContext = useContext(ExpansionPanelContext);

    if (panelContext === null) {
      console.error(
        "<ExpansionPanel.Header> has to be used within an <ExpansionPanel>"
      );
      return null;
    }

    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      panelContext.toggleOpen();
      onClick && onClick(e);
    };

    const HeadingTag = headingTag as React.ElementType;

    return (
      <HeadingTag {...rest} ref={ref} style={{ margin: 0 }}>
        <button
          className={cl("navds-expansionpanel__header", className, {
            "navds-expansionpanel__header--open": panelContext.open,
            "navds-expansionpanel__header--closed": !panelContext.open,
          })}
          type="button"
          onClick={handleClick}
          aria-expanded={panelContext.open}
          aria-label={`${title}${description ? ` , ${description}` : ""}`}
        >
          {avatar && (
            <span className="navds-expansionpanel__header-avatar" aria-hidden>
              {avatar}
            </span>
          )}
          <span className="navds-expansionpanel__header-content">
            <Heading size="small" as="span">
              {title}
            </Heading>
            <BodyShort as="span">{description}</BodyShort>
          </span>

          <span className="navds-expansionpanel__header-icon" aria-hidden>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
              focusable={false}
              className="navds-expansionpanel__open-icon"
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
              className="navds-expansionpanel__close-icon"
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
          </span>
        </button>
      </HeadingTag>
    );
  }
);

export default ExpansionPanelHeader;
