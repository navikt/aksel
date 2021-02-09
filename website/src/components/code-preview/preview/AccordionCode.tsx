import { Expand } from "@navikt/ds-icons";
import cl from "classnames";
import Prism from "prismjs";
import React, { useState } from "react";
import { Collapse } from "react-collapse";
import "@navikt/ds-css/accordion/index.css";
import "../../code/theme.css";
import "./index.css";

export const AccordionCode = ({ children, type, ...props }) => {
  const [open, setOpen] = useState(false);

  const highlighted =
    type === "html"
      ? Prism.highlight(children, Prism.languages.jsx, "html")
      : type === "css"
      ? Prism.highlight(children, Prism.languages.css, "css")
      : Prism.highlight(children, Prism.languages.jsx, "jsx");

  return (
    <>
      <button
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="code__dropdown"
      >
        <Expand
          className={cl(
            "navds-accordion__chevron",
            `navds-accordion__chevron--${open ? "up" : "down"}`,
            "code__dropdownChevron"
          )}
          focusable="false"
        />
        <span className="code__dropdownHeading">{type}</span>
      </button>

      <Collapse isOpened={open} theme={{ collapse: "code__dropdownCode" }}>
        <div style={{ padding: "1rem 0" }}>
          <div
            className={cl("code__dropdownCode--wrapper", {
              "code__dropdownCode--open": open,
            })}
          >
            <figure role="figure" aria-label="Kode-eksempel">
              <pre className="code__dropdownCode--pre" tabIndex={open ? 0 : -1}>
                <span className="code__dropdownCode--copy">
                  <p>copy</p>
                </span>
                <code
                  className="code__dropdownCode--code"
                  {...props}
                  dangerouslySetInnerHTML={{ __html: highlighted }}
                ></code>
              </pre>
            </figure>
          </div>
        </div>
      </Collapse>
    </>
  );
};
