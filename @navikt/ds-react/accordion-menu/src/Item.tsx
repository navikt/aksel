import React, { forwardRef, HTMLAttributes, useEffect } from "react";
import cl from "classnames";
import { useStore } from "./Context";
import { Text, Link } from "../../index";

export interface AccordionMenuItemProps
  extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  active?: boolean;
}

const Item = forwardRef<HTMLAnchorElement, AccordionMenuItemProps>(
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
          <Text
            size="medium"
            className={cl("navds-accordion-menu__link--active", className)}
            {...rest}
          >
            {children}
          </Text>
        ) : (
          <Link
            ref={ref}
            href={href}
            className={cl("navds-accordion-menu__link", className)}
            {...rest}
          >
            {children}
          </Link>
        )}
      </li>
    );
  }
);

export default Item;
