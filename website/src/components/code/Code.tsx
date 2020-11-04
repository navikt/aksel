import React, { useState } from "react";
import classnames from "classnames";
import Prism from "prismjs";
import Popover, { PopoverOrientering } from "nav-frontend-popover";
import { Normaltekst } from "nav-frontend-typografi";

export const copyString = (e, content) => {
  e.preventDefault();
  const currentActive = document.activeElement;
  const textArea = document.createElement("textarea");
  textArea.value = content;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("Copy");
  textArea.remove();
  if (currentActive instanceof HTMLElement) {
    currentActive.focus();
  }
};

export interface CodeProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.SyntheticEvent) => void;
}

export const InlineCode = ({ children, className, ...props }: CodeProps) => (
  <code className={classnames(className, "inline")} {...props}>
    {children}
  </code>
);

export const Bash = ({ children, className, onClick, ...props }: CodeProps) => {
  const [anchor, setAnchor] = useState(undefined);

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
        tabIndex={onClick ? 0 : -1}
        onClick={(e) => handleClick(e)}
        onKeyDown={(e) => handleKeyPress(e)}
        className={classnames(className, "bash", { "bash--copy": onClick })}
        {...props}
      >
        {children}
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

const Code = ({ children, className, ...props }: CodeProps) => {
  const highlighted = Prism.highlight(children, Prism.languages.jsx, "jsx");
  return (
    <figure role="figure" aria-label="Kode-eksempel">
      <pre className="language-">
        <code
          className={classnames(className)}
          {...props}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        ></code>
      </pre>
    </figure>
  );
};

export default Code;
