import React, { useEffect, useState } from "react";
import { forwardRef, HTMLAttributes, ReactNode } from "react";
import cl from "classnames";
import { Button, Heading } from "../../";
import { Attachment } from "@navikt/ds-icons";
import { EtikettInfo } from "nav-frontend-etiketter";
import { Undertekst } from "nav-frontend-typografi";

export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: ReactNode;
  highlight?: boolean;
  anchor?: string;
  whiteBackground?: boolean;
  withPadding?: boolean;
}

const Panel = forwardRef<HTMLDivElement, PanelProps>(
  ({ icon, highlight, anchor, title, children, className, ...rest }, ref) => {
    const [copied, setIsCopied] = useState<boolean>(false);
    const copyRef = React.createRef<HTMLButtonElement>();

    useEffect(() => {
      const header = document.getElementById("layout-header");
      header?.classList.add("navds-layout__header--margin");
    }, []);

    return (
      <div
        ref={ref}
        className={cl(
          "navds-layout__panel",
          icon && "navds-layout__panel--margin",
          highlight && "navds-layout__panel--highlight",
          className
        )}
        {...rest}
      >
        {icon && <div className={"navds-layout__panel-icon"}>{icon}</div>}
        {anchor && <a id={anchor} />}
        <Heading size={"xl"} className={"navds-layout__panel-title"} level={2}>
          {title}
        </Heading>
        {anchor && (
          <div className={"navds-layout__panel-copy"}>
            <Button
              ref={copyRef}
              variant={"secondary"}
              className={"navds-layout__panel-copy-button"}
              onClick={() => {
                setIsCopied(true);
                copyToClipboard(`${window.location.href}/#${anchor}`);
                setTimeout(() => {
                  setIsCopied(false);
                }, 1000);
              }}
            >
              <Attachment className={"navds-layout__panel-copy-icon"} />
              <span>Kopier lenke</span>
            </Button>
            {copied && (
              <EtikettInfo className={"navds-layout__panel-copy-etiquette"}>
                <Undertekst>Kopiert</Undertekst>
              </EtikettInfo>
            )}
          </div>
        )}
        <div className={"navds-layout__panel-content"}>{children}</div>
      </div>
    );
  }
);

const copyToClipboard = (text: string) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
};

export default Panel;
