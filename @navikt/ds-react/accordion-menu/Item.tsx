import React, { forwardRef, useEffect } from "react";
import cl from "classnames";
import { useStore } from "./Context";
import { OverridableComponent } from "../index";

export interface AccordionMenuItemProps {
  props: {
    children: React.ReactNode;
    active?: boolean;
  } & React.HTMLAttributes<HTMLLIElement>;
  defaultComponent: "a";
}

const Item: OverridableComponent<AccordionMenuItemProps> = forwardRef(
  (
    {
      children,
      component: Component = "a",
      active = false,
      className,
      ...rest
    },
    ref
  ) => {
    const anchor = rest.href && rest.href.split("#")[1];
    const [{ activeAnchor }, dispatch] = useStore();
    const isActive = active || (anchor && activeAnchor === anchor) || false;

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
        <Component
          ref={ref}
          className={cl("navds-link", "navds-accordion-menu__link", className, {
            "navds-accordion-menu__link--active": isActive,
          })}
          {...rest}
        >
          {children}
        </Component>
      </li>
    );
  }
);

export default Item;
