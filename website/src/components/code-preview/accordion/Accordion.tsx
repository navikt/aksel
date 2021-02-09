import { Expand } from "@navikt/ds-icons";
import cl from "classnames";
import React, { useState } from "react";
import { Collapse } from "react-collapse";
import "@navikt/ds-css/accordion/index.css";
import "../../code/theme.css";
import "./index.css";

export const Accordion = ({ children, title, onChange, ...props }) => {
  const [open, setOpen] = useState(false);

  const onOpenChange = () => {
    onChange(!open);
    setOpen(!open);
  };

  return (
    <>
      <button
        aria-expanded={open}
        onClick={() => onOpenChange()}
        className="accordion"
      >
        <Expand
          className={cl(
            "navds-accordion__chevron",
            `navds-accordion__chevron--${open ? "up" : "down"}`,
            "accordion__chevron"
          )}
          focusable="false"
        />
        <span>{title}</span>
      </button>

      <Collapse isOpened={open} theme={{ collapse: "accordion__collapse" }}>
        <div className="accordion__wrapper">{children}</div>
      </Collapse>
    </>
  );
};
