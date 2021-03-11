import React, { forwardRef, HTMLAttributes, useEffect } from "react";
import { useStore } from "./Context";

export interface AccordionMenuItemProps
  extends HTMLAttributes<HTMLAnchorElement> {
  title?: string;
}

const Nav = forwardRef<HTMLAnchorElement, AccordionMenuItemProps>(
  ({ children, title, className, ...rest }, ref) => {
    const { anchors, setActiveAnchor } = useStore();

    useEffect(() => {
      const scrollListener = () => {
        const offset = 100;
        const lastPassedAnchor = anchors
          .map((anchor) => document.getElementById(anchor.id))
          .map((element: HTMLElement) => ({
            id: element.id,
            top: element.getBoundingClientRect().top - offset,
          }))
          .filter((element) => element.top <= 0)
          .sort((a, b) => (a.top < b.top ? -1 : 1))
          .pop();

        if (lastPassedAnchor) {
          setActiveAnchor(lastPassedAnchor);
        }
      };
      window.addEventListener("scroll", scrollListener);
      return () => {
        window.removeEventListener("scroll", scrollListener);
      };
    }, [anchors, setActiveAnchor]);

    return (
      <nav className={"navds-accordion-menu__nav"} aria-label={title || "menu"}>
        {children}
      </nav>
    );
  }
);

export default Nav;
