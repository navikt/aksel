import throttle from "lodash/throttle";
import { useEffect, useState } from "react";
import { TableOfContentsT } from "../../types/toc";

export const useToc = (toc: TableOfContentsT) => {
  const [activeId, setActiveId] = useState(null);
  const [activeSubId, setActiveSubId] = useState(null);

  useEffect(() => {
    const validPick = (el: HTMLElement) => {
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top < 116;
    };

    const handleScroll = () => {
      let active = null;
      let activeSub = null;

      for (const x of toc) {
        const lvl2 = document.getElementById(x.id);
        if (validPick(lvl2)) {
          active = x.id;
          activeSub = null;
        }
        if (x?.children) {
          for (const y of x.children) {
            const lvl3 = document.getElementById(y.id);
            if (validPick(lvl3)) {
              activeSub = y.id;
            }
          }
        }
      }

      toc && !activeSub ? setActiveSubId(null) : setActiveSubId(activeSub);

      active && setActiveId(active);

      if (window.scrollY < 300) {
        setActiveId(null);
        setActiveSubId(null);
      }
    };

    const func = throttle(handleScroll, 50);

    window.addEventListener("scroll", func);
    return () => {
      window.removeEventListener("scroll", func);
    };
  }, [toc]);

  useEffect(() => {
    window.location.hash && setActiveId(window.location.hash.replace("#", ""));
  }, []);

  return { activeId, activeSubId };
};
