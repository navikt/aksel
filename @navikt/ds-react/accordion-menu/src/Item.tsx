import React, { forwardRef, HTMLAttributes, useEffect } from "react";
import cl from "classnames";
import Lenke from "nav-frontend-lenker";
import { useStore } from "./Context";
import { Normaltekst } from "nav-frontend-typografi";

export interface AccordionMenuItemProps
  extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  active?: boolean;
}

const Item = forwardRef<Lenke, AccordionMenuItemProps>(
  ({ children, href, active = false, className, ...rest }, ref) => {
    const anchor = href.split("#")[1];
    const [{ activeAnchor }, dispatch] = useStore();
    const isActive = active || activeAnchor === anchor;

    useEffect(() => {
      if (anchor) {
        const target = document.getElementById(anchor);

        if (target) {
          dispatch({
            type: "INSERT_ANCHOR",
            id: anchor,
            position: { y: target.getBoundingClientRect().top - 15 },
          });

          return () => {
            dispatch({
              type: "REMOVE_ANCHOR",
              id: anchor,
            });
          };
        }
      }
    }, [anchor, dispatch]);

    return (
      <li
        className={cl(
          "navds-accordion-menu__item",
          isActive && "navds-accordion-menu__item--active"
        )}
      >
        {isActive ? (
          <Normaltekst
            className={cl("navds-accordion-menu__link--active", className)}
            {...rest}
          >
            {children}
          </Normaltekst>
        ) : (
          <Lenke
            ref={ref}
            href={href}
            className={cl("navds-accordion-menu__link", className)}
            {...rest}
          >
            {children}
          </Lenke>
        )}
      </li>
    );
  }
);

export default Item;
