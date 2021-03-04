import React, { forwardRef, HTMLAttributes, useEffect, useState } from "react";
import cl from "classnames";
import Lenke from "nav-frontend-lenker";
import { useStore } from "./Context";

export interface AccordionMenuItemProps
  extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  active?: boolean;
}

const Item = forwardRef<Lenke, AccordionMenuItemProps>(
  ({ children, href, active = false, className, ...rest }, ref) => {
    const anchor = href.split("#")[1];
    const [{ activeAnchor }, dispatch] = useStore();

    useEffect(() => {
      if (anchor) {
        const target = document.getElementById(anchor);
        if (target) {
          dispatch({
            type: "INSERT_ANCHOR",
            id: anchor,
            position: { y: target.offsetTop },
          });

          return () => {
            dispatch({
              type: "REMOVE_ANCHOR",
              id: anchor,
            });
          };
        }
      }
    }, []);

    return (
      <li
        className={cl(
          "navds-accordion-menu__item",
          (active || activeAnchor === anchor) &&
            "navds-accordion-menu__item--active"
        )}
      >
        <Lenke
          ref={ref}
          href={href}
          className={cl("navds-accordion-menu__link", className)}
          {...rest}
        >
          {children}
        </Lenke>
      </li>
    );
  }
);

export default Item;
