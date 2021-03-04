import React, { forwardRef, HTMLAttributes, ReactNode, useEffect } from "react";
import cl from "classnames";
import { Heading } from "../../lib";

export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: ReactNode;
  whiteBackground?: boolean;
  withPadding?: boolean;
}

const Panel = forwardRef<HTMLDivElement, PanelProps>(
  ({ icon, title, children, className, ...rest }, ref) => {
    useEffect(() => {
      const header = document.getElementById("layout-header");
      header?.classList.add("navds-layout__header--margin");
    }, []);

    return (
      <div ref={ref} className={cl("navds-layout__panel", className)} {...rest}>
        {icon && <div className={"navds-layout__panel--icon"}>{icon}</div>}
        <div className={"navds-layout__panel--heading"}>
          <Heading size={"xl"} level={2}>
            {title}
          </Heading>
        </div>
        <div className={"navds-layout__panel--content"}>{children}</div>
      </div>
    );
  }
);

export default Panel;
