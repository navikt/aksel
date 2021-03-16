import PropTypes from "prop-types";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import cl from "classnames";
import { UnmountClosed, Collapse } from "react-collapse";

import { Expand } from "@navikt/ds-icons";
import { v4 as uuidv4 } from "uuid";

export interface AccordionProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Component content
   */
  children: React.ReactNode;
  /**
   * @ignore
   */
  className?: string;
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
   *
   * @param {object} event
   */
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  /**
   * Removes content-element from dom when closed
   * @default false
   */
  renderContentWhenClosed?: boolean;
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      children,
      heading,
      open = false,
      className,
      renderContentWhenClosed = false,
      onClick,
      ...rest
    },
    ref
  ) => {
    const contentId = useRef(uuidv4());
    const buttonId = useRef(uuidv4());
    const [internalOpen, setInternalOpen] = useState<boolean>(open);

    useEffect(() => {
      setInternalOpen(open);
    }, [open]);

    const CollapseComponent = renderContentWhenClosed
      ? Collapse
      : UnmountClosed;

    return (
      <div
        ref={ref}
        className={cl("navds-accordion", className, {
          "navds-accordion--open": internalOpen,
          "navds-accordion--closed": !internalOpen,
        })}
      >
        <button
          id={buttonId.current}
          className="navds-accordion__button"
          aria-expanded={open}
          aria-controls={contentId.current}
          onClick={onClick ? onClick : () => setInternalOpen((open) => !open)}
          {...rest}
        >
          <span className="navds-accordion__heading">{heading}</span>
          <Expand
            className={cl(
              "navds-accordion__chevron",
              `navds-accordion__chevron--${internalOpen ? "up" : "down"}`
            )}
          />
        </button>
        <div
          id={contentId.current}
          role="region"
          aria-labelledby={buttonId.current}
        >
          <CollapseComponent isOpened={internalOpen}>
            <div className="navds-accordion__content">{children}</div>
          </CollapseComponent>
        </div>
      </div>
    );
  }
);

Accordion.propTypes = {
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Component content
   */
  children: PropTypes.node.isRequired,
  /**
   * Content on interactive surface of component
   */
  heading: PropTypes.node.isRequired,
  /**
   * Callback for when user interacts with component
   *
   * @param {object} event
   */
  onClick: PropTypes.any,
  /**
   * Opens component if 'true', closes if 'false'
   * Using this props removes automatic control of open-state
   * @default false
   */
  open: PropTypes.bool,
  /**
   * Removes content-element from dom when closed
   * @default false
   */
  renderContentWhenClosed: PropTypes.bool,
};
export default Accordion;
