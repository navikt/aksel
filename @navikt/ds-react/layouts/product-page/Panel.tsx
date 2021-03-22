import React, { Component, useEffect, useState } from "react";
import { forwardRef, ReactNode } from "react";
import cl from "classnames";
import { Button, Heading } from "../../";
import { Attachment } from "@navikt/ds-icons";
import { EtikettInfo } from "nav-frontend-etiketter";
import { Undertekst } from "nav-frontend-typografi";
import { OverridableComponent } from "../../util";

export interface PanelProps {
  props: {
    title: string;
    icon?: ReactNode;
    highlight?: boolean;
    anchor?: string;
    whiteBackground?: boolean;
    withPadding?: boolean;
  } & React.HTMLAttributes<HTMLDivElement>;
  defaultComponent: "div";
}

const Panel: OverridableComponent<PanelProps> = forwardRef(
  (
    {
      title,
      highlight,
      icon,
      anchor,
      component: Component = "div",
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const [copied, setIsCopied] = useState<boolean>(false);
    const copyRef = React.createRef<HTMLButtonElement>();

    useEffect(() => {
      const header = document.getElementById("navds-layout-body");
      header?.classList.add("navds-layout__body--padding");
    }, []);

    return (
      <Component
        ref={ref}
        id={anchor}
        className={cl(
          "navds-layout__panel",
          icon && "navds-layout__panel--icon-margin",
          highlight && "navds-layout__panel--highlight",
          className
        )}
        {...rest}
      >
        {icon && <div className={"navds-layout__panel-icon"}>{icon}</div>}
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
                const { href, hash } = window.location;
                const urlWithoutHash = href.replace(hash, "");
                copyToClipboard(`${urlWithoutHash}#${anchor}`);
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
      </Component>
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
