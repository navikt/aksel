import React, { forwardRef, HTMLAttributes, useEffect } from "react";
import Lenke from "nav-frontend-lenker";
import { useStore } from "./Context";

export interface AccordionMenuItemProps
  extends HTMLAttributes<HTMLAnchorElement> {
  title?: string;
}

const Nav = forwardRef<Lenke, AccordionMenuItemProps>(
  ({ children, title, className, ...rest }, ref) => {
    const [{ anchors }, dispatch] = useStore();

    useEffect(() => {
      window.addEventListener("scroll", () => {
        const lastAnchor = anchors
          .filter((anchor) => window.scrollY > anchor.position.y)
          .pop();

        console.log(lastAnchor);

        if (lastAnchor) {
          dispatch({ type: "SET_ACTIVE_ANCHOR", id: lastAnchor.id });
        }
      });

      return () => {
        window.removeEventListener("scroll", () => {});
      };
    }, [anchors]);

    return <nav aria-label={title || "menu"}>{children}</nav>;
  }
);

export default Nav;
