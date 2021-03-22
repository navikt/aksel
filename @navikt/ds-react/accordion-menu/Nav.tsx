import React, { forwardRef, HTMLAttributes, useEffect } from "react";
import { useStore } from "./ActiveAnchorStore";

export interface AccordionMenuItemProps
  extends HTMLAttributes<HTMLAnchorElement> {
  title?: string;
}

const Nav = forwardRef<HTMLAnchorElement, AccordionMenuItemProps>(
  ({ children, title, className, ...rest }, ref) => {
    const { anchors, activeAnchor, setActiveAnchor } = useStore();

    useEffect(() => {
      const scrollListener = () => {
        const offset = 100;
        const lastPassedAnchor = anchors
          .map((anchor) => document.getElementById(anchor))
          .map((element: HTMLElement) => ({
            id: element.id,
            top: element.getBoundingClientRect().top - offset,
            scrolledToBottom:
              window.innerHeight + window.pageYOffset >=
              document.body.offsetHeight,
          }))
          .filter((element) => element.scrolledToBottom || element.top <= 0)
          .sort((a, b) => (a.top < b.top ? -1 : 1))
          .map((anchor) => anchor.id)
          .pop();

        // Set active anchor and related url hash
        if (lastPassedAnchor && activeAnchor !== lastPassedAnchor) {
          const { href, hash } = window.location;
          const urlWithoutHash = href.replace(hash, "");
          const urlWithAnchor = `${urlWithoutHash}#${lastPassedAnchor}`;
          const title = document.title;
          window.history.pushState(lastPassedAnchor, title, urlWithAnchor);
          setActiveAnchor(lastPassedAnchor);
        }
      };
      window.addEventListener("scroll", scrollListener);
      return () => {
        window.removeEventListener("scroll", scrollListener);
      };
    }, [anchors, activeAnchor, setActiveAnchor]);

    return (
      <nav className={"navds-accordion-menu__nav"} aria-label={title || "Meny"}>
        {children}
      </nav>
    );
  }
);

export default Nav;
