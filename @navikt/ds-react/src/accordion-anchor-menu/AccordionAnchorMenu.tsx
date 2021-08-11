import React, { forwardRef, HTMLAttributes } from "react";
import { AccordionMenu as BaseAccordionMenu } from "../accordion-menu";
import { Title } from "..";
import { ActiveAnchorProvider } from "./ActiveAnchorStore";
import cl from "classnames";

export interface AccordionAnchorMenuProps
  extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const AccordionAnchorMenu = forwardRef<
  HTMLDivElement,
  AccordionAnchorMenuProps
>(({ children, title, className, ...rest }, ref) => (
  <div
    className={cl("navds-accordion-anchor-menu", className)}
    ref={ref}
    {...rest}
  >
    {title && (
      <Title level={2} size="m" className="navds-accordion-anchor-menu__title">
        {title}
      </Title>
    )}
    <ActiveAnchorProvider>
      <BaseAccordionMenu aria-label={title || "Meny"}>
        {children}
      </BaseAccordionMenu>
    </ActiveAnchorProvider>
  </div>
));

export default AccordionAnchorMenu;
