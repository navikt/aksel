import React, { useState } from "react";
import cl from "classnames";
import classnames from "classnames";
import Prism from "prismjs";
import copy from "copy-to-clipboard";
import Popover, { PopoverOrientering } from "nav-frontend-popover";
import { Normaltekst } from "nav-frontend-typografi";
import { CopyIcon } from "../assets/images/svg";
import { Expand } from "@navikt/ds-icons";
import { Collapse } from "react-collapse";
import "@navikt/ds-css/accordion/index.css";
/* import { Accordion } from "@navikt/ds-react"; */

import "./styles.less";
import "./theme.css";

export const copyImport = (e, content: string) => {
  copy(content, {
    format: "text/plain",
  });
};

export const copyCode = (content) => {
  if (typeof content === "string") {
    copy(content, {
      format: "text/plain",
    });
  }
};

export interface CodeProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.SyntheticEvent) => void;
  noCopy?: boolean;
  popupUnder?: boolean;
  type?: string;
}

export const InlineCode = ({ children, className, ...props }: CodeProps) => (
  <code className={classnames(className, "inline")} {...props}>
    {children}
  </code>
);

export const Bash = ({ children, className, onClick, ...props }: CodeProps) => {
  const [anchor, setAnchor] = useState(undefined);

  const getNewProps = () => {
    if (onClick) {
      return {
        onClick: (e) => handleClick(e),
        onKeyDown: (e) => handleKeyPress(e),
        tabIndex: 0,
      };
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      setAnchor(anchor ? undefined : e.currentTarget);
      onClick && onClick(e);
    }
  };
  const handleClick = (e) => {
    if (!onClick) return;
    setAnchor(anchor ? undefined : e.currentTarget);
    onClick(e);
  };

  return (
    <>
      <code
        aria-label={onClick ? "Kopier tekst til utklippstavle" : undefined}
        role={onClick && "button"}
        className={classnames(className, "bash", { "bash--copy": onClick })}
        {...getNewProps()}
        {...props}
      >
        {children}
        {onClick && (
          <span className="copyIcon">
            <CopyIcon color="#fff" />
          </span>
        )}
      </code>
      <Popover
        orientering={PopoverOrientering.OverHoyre}
        ankerEl={anchor}
        onRequestClose={() => setAnchor(undefined)}
        autoFokus={false}
        utenPil
      >
        <Normaltekst style={{ padding: "0.5rem" }}> Kopiert! </Normaltekst>
      </Popover>
    </>
  );
};

const DropDownCode = ({ children, type, ...props }) => {
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
        <div
          className={cl("code__dropdownCode--wrapper", {
            "code__dropdownCode--open": open,
          })}
        >
          <figure
            /* className="code-example" */
            role="figure"
            aria-label="Kode-eksempel"
          >
            <pre className="code__dropdownCode--pre">
              <code
                className="code__dropdownCode--code"
                {...props}
                dangerouslySetInnerHTML={{ __html: highlighted }}
              ></code>
            </pre>
          </figure>
        </div>
      </Collapse>
    </>
  );
};

const Code = ({
  children,
  className,
  noCopy,
  popupUnder = false,
  ...props
}: CodeProps) => {
  const [anchor, setAnchor] = useState(undefined);
  const highlighted = Prism.highlight(children, Prism.languages.jsx, "jsx");

  const getNewProps = () => {
    if (!noCopy) {
      return {
        onClick: (e) => handleClick(e),
        onKeyDown: (e) => handleKeyPress(e),
        tabIndex: 0,
      };
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setAnchor(anchor ? undefined : e.currentTarget);
      copyCode(children);
    }
  };
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setAnchor(anchor ? undefined : e.currentTarget);
    copyCode(children);
  };

  if (props.type && ["html", "react"].includes(props.type.toLowerCase())) {
    return <DropDownCode type={props.type} children={children} />;
  }

  return (
    <>
      <figure
        className={classnames({ "code-example": !noCopy })}
        role={noCopy ? "figure" : "button"}
        aria-label={noCopy ? "Kode-eksempel" : "Kopier kode-eksempel"}
        {...getNewProps()}
      >
        <pre className="language-">
          <code
            className={className}
            {...props}
            dangerouslySetInnerHTML={{ __html: highlighted }}
          ></code>
        </pre>
      </figure>
      <Popover
        orientering={
          popupUnder
            ? PopoverOrientering.UnderHoyre
            : PopoverOrientering.OverHoyre
        }
        ankerEl={anchor}
        onRequestClose={() => setAnchor(undefined)}
        autoFokus={false}
        utenPil
      >
        <Normaltekst style={{ padding: "0.5rem" }}> Kopiert! </Normaltekst>
      </Popover>
    </>
  );
};

export default Code;
