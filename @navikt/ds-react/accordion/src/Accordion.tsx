import React, { forwardRef, useEffect, useRef, useState } from "react";
import cl from "classnames";
import { UnmountClosed, Collapse } from "react-collapse";

import { Expand } from "@navikt/ds-icons";
import "@navikt/ds-css/accordion/index.css";
import { guid } from "nav-frontend-js-utils";

export interface AccordionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  headline: React.ReactNode;
  open?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  className?: string;
  renderContentWhenClosed?: boolean;
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      children,
      headline,
      open = false,
      className,
      renderContentWhenClosed = false,
      onClick,
      ...rest
    },
    ref
  ) => {
    const contentId = useRef(guid());
    const buttonId = useRef(guid());
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
          <span className="navds-accordion__title">{headline}</span>
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

export default Accordion;
