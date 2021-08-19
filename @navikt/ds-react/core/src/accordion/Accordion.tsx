import React, { forwardRef, useEffect, useState } from "react";
import cl from "classnames";
import { UnmountClosed, Collapse } from "react-collapse";
import { Expand, ExpandFilled } from "@navikt/ds-icons";
import { useId } from "..";

export interface AccordionProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Component content
   */
  children: React.ReactNode;
  /**
   * Content on interactive surface of component
   */
  heading: React.ReactNode;
  /**
   * Opens component if 'true', closes if 'false'
   * Using this props removes automatic control of open-state
   * @default false
   */
  open?: boolean;
  /**
   * Callback for when user interacts with component
   */
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  /**
   * Removes content-element from dom when closed
   * @default false
   */
  renderContentWhenClosed?: boolean;
}

const Accordion = forwardRef<HTMLButtonElement, AccordionProps>(
  (
    {
      children,
      heading,
      open = false,
      className,
      renderContentWhenClosed = false,
      onClick,
      id,
      ...rest
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState<boolean>(open);

    const buttonId = useId(id);
    const contentId = useId();

    useEffect(() => {
      setInternalOpen(open);
    }, [open]);

    const CollapseComponent = renderContentWhenClosed
      ? Collapse
      : UnmountClosed;

    return (
      <div
        className={cl("navds-accordion", className, {
          "navds-accordion--open": internalOpen,
          "navds-accordion--closed": !internalOpen,
        })}
      >
        <button
          ref={ref}
          id={buttonId}
          className="navds-accordion__button"
          aria-expanded={open}
          aria-controls={contentId}
          onClick={onClick ? onClick : () => setInternalOpen((open) => !open)}
          {...rest}
        >
          <span className="navds-accordion__heading navds-title navds-title--s">
            {heading}
          </span>
          <Expand
            focusable="false"
            role="img"
            className={cl(
              "navds-accordion__chevron",
              `navds-accordion__chevron--${internalOpen ? "up" : "down"}`
            )}
          />
          <ExpandFilled
            focusable="false"
            role="img"
            className={cl(
              "navds-accordion__chevron",
              "navds-accordion__chevron--filled",
              `navds-accordion__chevron--${internalOpen ? "up" : "down"}`
            )}
          />
        </button>
        <div id={contentId} role="region" aria-labelledby={buttonId}>
          <CollapseComponent isOpened={internalOpen}>
            <div className="navds-accordion__content">{children}</div>
          </CollapseComponent>
        </div>
      </div>
    );
  }
);

export default Accordion;
