import Prism from "prismjs";
import React, { useState } from "react";
import "@navikt/ds-css/accordion/index.css";
import "../../code/theme.css";
import "./index.css";
import { Accordion } from "../accordion/Accordion";

export const Code = ({ children, type, ...props }) => {
  const [open, setOpen] = useState(false);

  const highlighted =
    type === "html"
      ? Prism.highlight(children, Prism.languages.jsx, "html")
      : type === "css"
      ? Prism.highlight(children, Prism.languages.css, "css")
      : Prism.highlight(children, Prism.languages.jsx, "jsx");

  return (
    <>
      <Accordion title={type} onChange={(e) => setOpen(e)}>
        <figure role="button" aria-label="Kode-eksempel">
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
      </Accordion>
    </>
  );
};
