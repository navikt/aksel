import React, { useEffect, useState } from "react";
import { forwardRef, ReactNode } from "react";
import cl from "classnames";
import { Button, Heading, Popover } from "../../";
import { Attachment } from "@navikt/ds-icons";
import { OverridableComponent } from "../../util";
import copy from "copy-to-clipboard";

export interface ProductPagePanelProps {
  props: {
    children: React.ReactNode;
    className?: string;
    title: string;
    icon?: ReactNode;
    highlight?: boolean;
    anchor: string;
    whiteBackground?: boolean;
  } & React.HTMLAttributes<HTMLDivElement>;
  defaultComponent: "div";
}

const ProductPagePanel: OverridableComponent<ProductPagePanelProps> = forwardRef(
  (
    {
      children,
      className,
      title,
      highlight,
      icon,
      anchor,
      component: Component = "div",
      ...rest
    },
    ref
  ) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [copied, setIsCopied] = useState<boolean>(false);

    useEffect(() => {
      const header = document.getElementById("navds-layout-body");
      header?.classList.add("navds-layout__body--padding");
    }, []);

    const handleClick = () => {
      setIsCopied(true);
      const { href, hash } = window.location;
      const urlWithoutHash = href.replace(hash, "");
      copy(`${urlWithoutHash}#${anchor}`);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    };

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

        <div className={"navds-layout__panel-copy"}>
          <a
            ref={(el) => setAnchorEl(el)}
            className={"navds-layout__panel-copy-anchor"}
            onClick={handleClick}
            href={`#${anchor}`}
          >
            <Attachment className={"navds-layout__panel-copy-icon"} />
            <span>Kopier lenke</span>
          </a>
          <Popover
            size="small"
            anchorEl={anchorEl}
            open={copied}
            onClose={() => {}}
          >
            <div className="navds-layout__panel-popover-content">Kopiert</div>
          </Popover>
        </div>

        <div className={"navds-layout__panel-content"}>{children}</div>
      </Component>
    );
  }
);

export default ProductPagePanel;
