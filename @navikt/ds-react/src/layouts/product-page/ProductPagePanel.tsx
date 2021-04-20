import React, { useEffect, useRef, useState } from "react";
import { forwardRef, ReactNode } from "react";
import cl from "classnames";
import { Heading, CopyToClipboard } from "../../";
import { Attachment } from "@navikt/ds-icons";
import { OverridableComponent } from "../../util";

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
      <Component
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
      </Component>
    );
  }
);

export default ProductPagePanel;
