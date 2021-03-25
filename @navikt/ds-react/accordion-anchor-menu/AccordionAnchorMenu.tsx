import React, { forwardRef, HTMLAttributes } from "react";
import { AccordionMenu as BaseAccordionMenu } from "../accordion-menu";
import { Heading } from "../index";
import { ActiveAnchorProvider } from "./ActiveAnchorStore";
import cl from "classnames";

export interface AccordionAnchorMenuProps
  extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  smoothScrollBehavior?: boolean;
}

const AccordionAnchorMenu = forwardRef<
  HTMLDivElement,
  AccordionAnchorMenuProps
>(
  (
    { children, title, smoothScrollBehavior = true, className, ...rest },
    ref
  ) => (
    <div
      className={cl("navds-accordion-anchor-menu", className)}
      ref={ref}
      {...rest}
    >
      {title && (
        <Heading
          level={2}
          size="medium"
          className="navds-accordion-anchor-menu__title"
        >
          {title}
        </Heading>
      )}
      <ActiveAnchorProvider>
        <BaseAccordionMenu aria-label={title || "Meny"}>
          {children}
        </BaseAccordionMenu>
      </ActiveAnchorProvider>
    </div>
  )
);

export default AccordionAnchorMenu;
