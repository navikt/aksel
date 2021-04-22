import React, { useEffect, useRef } from "react";
import { forwardRef, ReactNode } from "react";
import cl from "classnames";
import { Heading, CopyToClipboard } from "../../";
import { Attachment } from "@navikt/ds-icons";

export interface ProductPagePanelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  anchor: string;
  className?: string;
  title: string;
  icon?: ReactNode;
  highlight?: boolean;
  whiteBackground?: boolean;
}

const ProductPagePanel = forwardRef<HTMLDivElement, ProductPagePanelProps>(
  ({ children, className, title, highlight, icon, anchor, ...rest }, ref) => {
    const copyRef = useRef(null);

    useEffect(() => {
      const header = document.getElementById("navds-layout-body");
      header?.classList.add("navds-layout__body--padding");
    }, []);

    const getLink = () => {
      const { href, hash } = window.location;
      const urlWithoutHash = href.replace(hash, "");
      return `${urlWithoutHash}#${anchor}`;
    };

    return (
      <div
        ref={ref}
        className={cl(
          "navds-layout__panel",
          icon && "navds-layout__panel--icon-margin",
          highlight && "navds-layout__panel--highlight",
          className
        )}
        {...rest}
      >
        <div className="navds-layout__panel-anchor">
          <div
            id={anchor}
            className={cl("navds-layout__panel-anchor--child", {
              "navds-layout__panel-anchor--child--icon": !!icon,
            })}
          />
        </div>
        {icon && <div className={"navds-layout__panel-icon"}>{icon}</div>}
        <Heading size={"xl"} className={"navds-layout__panel-title"} level={2}>
          {title}
        </Heading>

        <CopyToClipboard
          className="navds-layout__panel-copy"
          ref={copyRef}
          text={getLink()}
          label="Kopierte lenke til panel"
          icon={<Attachment />}
        >
          Kopier lenke
        </CopyToClipboard>

        <div className={"navds-layout__panel-content"}>{children}</div>
      </div>
    );
  }
);

export default ProductPagePanel;
