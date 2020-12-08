import React, { forwardRef, useEffect, useRef, useState } from "react";
import cls from "classnames";
import { UnmountClosed, Collapse } from "react-collapse";

import { Expand } from "@nav-frontend/icons";
import "@nav-frontend/expansionpanel-styles";
import { guid } from "nav-frontend-js-utils";

interface ExpansionpanelProps {
  children: React.ReactNode;
  title: React.ReactNode;
  open?: boolean;
  onClick?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
  className?: string;
  renderContentWhenClosed?: boolean;
}

const Expansionpanel = forwardRef<HTMLDivElement, ExpansionpanelProps>(
  (
    {
      children,
      title,
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

    const handleClick = (e) => {
      if (onClick) {
        onClick(e);
      } else {
        setInternalOpen(!internalOpen);
      }
    };

    return (
      <div
        ref={ref}
        className={cls("navds-expansionpanel", className, {
          "navds-expansionpanel--open": internalOpen,
          "navds-expansionpanel--closed": !internalOpen,
        })}
      >
        <button
          id={buttonId.current}
          className="navds-expansionpanel__button"
          aria-expanded={open}
          aria-controls={contentId.current}
          onClick={(e) => handleClick(e)}
          {...rest}
        >
          <span className="navds-expansionpanel__title">{title}</span>
          <Expand
            className={`navds-expansionpanel__chevron--${
              internalOpen ? "up" : "down"
            }`}
          />
        </button>
        <div
          id={contentId.current}
          role="region"
          aria-labelledby={buttonId.current}
        >
          <CollapseComponent isOpened={internalOpen}>
            <div className="navds-expansionpanel__content">{children}</div>
          </CollapseComponent>
        </div>
      </div>
    );
  }
);

export default Expansionpanel;
