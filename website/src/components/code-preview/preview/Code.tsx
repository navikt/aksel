import Prism from "prismjs";
import React, { useState } from "react";
import "@navikt/ds-css/accordion/index.css";
import "../../code/theme.css";
import "./index.css";
import { Accordion } from "../accordion/Accordion";
import cl from "classnames";

export const Code = ({
  children,
  type = "react",
  accordion = false,
  noCopy = false,
  ...props
}) => {
  const [open, setOpen] = useState(false);

  const accordionMetastring =
    props?.metastring && props.metastring.includes("accordion=false");

  console.log(accordionMetastring);
  const highlighted =
    type === "html"
      ? Prism.highlight(children, Prism.languages.jsx, "html")
      : type === "css"
      ? Prism.highlight(children, Prism.languages.css, "css")
      : Prism.highlight(children, Prism.languages.jsx, "jsx");

  const Content = () => (
    <figure role="button" aria-label="Kode-eksempel">
      <pre
        className={cl("code__dropdownCode--pre", {
          "code__dropdownCode--accordion": accordion && !accordionMetastring,
        })}
        tabIndex={accordion && !accordionMetastring ? (open ? 0 : -1) : 0}
      >
        {!noCopy && (
          <span className="code__dropdownCode--copy">
            <p>copy</p>
          </span>
        )}
        <code
          className="code__dropdownCode--code"
          {...props}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        ></code>
      </pre>
    </figure>
  );

  return (
    <>
      {accordion && !accordionMetastring ? (
        <Accordion title={type} onChange={(e) => setOpen(e)}>
          <Content />
        </Accordion>
      ) : (
        <Content />
      )}
    </>
  );
};
