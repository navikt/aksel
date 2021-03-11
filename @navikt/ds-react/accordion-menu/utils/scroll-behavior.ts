import { useEffect } from "react";

export const useSmoothScrollBehavior = () => {
  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.classList.add("navds-accordion-menu__html");
    return () => {
      htmlElement.classList.remove("navds-accordion-menu__html");
    };
  }, []);
};
