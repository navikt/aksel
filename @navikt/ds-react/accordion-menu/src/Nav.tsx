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
      const scrollListener = () => {
        const lastPassedAnchor = anchors
          .sort((a, b) => (a.position.y < b.position.y ? -1 : 1))
          .filter((anchor) => window.scrollY > anchor.position.y - 10)
          .pop();

        if (lastPassedAnchor) {
          dispatch({
            type: "SET_ACTIVE_ANCHOR",
            id: lastPassedAnchor.id,
          });
        }
      };
      window.addEventListener("scroll", scrollListener);
      return () => {
        window.removeEventListener("scroll", scrollListener);
      };
    }, [anchors]);

    return <nav aria-label={title || "menu"}>{children}</nav>;
  }
);

export default Nav;
