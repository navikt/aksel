import React, { useState } from "react";
import classnames from "classnames";
import Prism from "prismjs";
import copy from "copy-to-clipboard";
import Popover, { PopoverOrientering } from "nav-frontend-popover";
import { Normaltekst } from "nav-frontend-typografi";
import { CopyIcon } from "../assets/images/svg";
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
