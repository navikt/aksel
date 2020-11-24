import * as React from "react";
import cls from "classnames";
import {
  UnmountClosed,
  Collapse,
  CollapseProps,
  CollapseCallbackArgs,
} from "react-collapse";
import "@nav-frontend/accordion-styles";
import { guid, keyCodes } from "nav-frontend-js-utils";
import { forwardRef, useEffect, useRef, useState } from "react";

interface AccordionProps {
  open?: boolean;
  onClick?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  renderContentWhenClosed?: boolean;
  collapseProps?: Partial<CollapseProps>;
  buttonId?: string;
  border?: boolean;
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      children,
      open = false,
      collapseProps,
      className,
      renderContentWhenClosed = false,
      onClick,
      buttonId = guid(),
      border = true,
      ...rest
    },
    ref
  ) => {
    const contentId = useRef(guid());
    const [internalOpen, setOpenInternalOpen] = useState<boolean>(open);

    useEffect(() => {
      setOpenInternalOpen(open);
    }, [open]);

    const CollapseComponent = renderContentWhenClosed
      ? Collapse
      : UnmountClosed;

    const handleClick = (e) => {
      e.preventDefault();
      if (onClick) {
        onClick(e);
      }
    };
    const onRest = (args: CollapseCallbackArgs) => {
      if (collapseProps && collapseProps.onRest) {
        collapseProps.onRest(args);
      }
    };

    return (
      <div
        ref={ref}
        className={cls("navds-accordion", className, {
          "navds-accordion--border": border,
          "navds-accordion--open": internalOpen,
          "navds-accordion--closed": !internalOpen,
        })}
      >
        <button
          id={buttonId}
          className="navds-accordion__button"
          aria-expanded={open}
          aria-controls={contentId.current}
          onClick={(e) => handleClick(e)}
          {...rest}
        >
          <div className="navds-accordion__flex-wrapper">
            <span className="navds-accordion__title">Tittel</span>
            <span className="navds-accordion__chevron" />
          </div>
        </button>
        <div id={contentId.current} role="region" aria-labelledby={buttonId}>
          <CollapseComponent
            {...collapseProps}
            isOpened={internalOpen}
            onRest={(args: CollapseCallbackArgs) => onRest(args)}
          >
            <div className="navds-accordion__content">{children}</div>
          </CollapseComponent>
        </div>
      </div>
    );
  }
);

export default Accordion;
