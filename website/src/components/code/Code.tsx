import "@navikt/ds-css/accordion/index.css";
import classnames from "classnames";
import copy from "copy-to-clipboard";
import Popover, { PopoverOrientering } from "nav-frontend-popover";
import { Normaltekst } from "nav-frontend-typografi";
import Prism from "prismjs";
import React, { useState } from "react";
import { CopyIcon } from "../assets/images/svg";
import { Code as AccordionCode } from "../code-preview/preview/Code";
import "./styles.less";
import "./theme.css";

export const copyImport = (e, content: string) => {
  copy(content, {
    format: "text/plain",
  });
};

export interface CodeProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.SyntheticEvent) => void;
  noCopy?: boolean;
  popupUnder?: boolean;
  type?: string;
  arialabel?: string;
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
