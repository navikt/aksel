import throttle from "lodash/throttle";
import { useEffect, useRef, useState } from "react";
import { TableOfContentsT } from "../../types/toc";

function useToc(toc: TableOfContentsT) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeSubId, setActiveSubId] = useState<string | null>(null);

  const tempDisableScroll = useRef(false);

  useEffect(() => {
    const validPick = (el: HTMLElement | null) => {
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top < 116;
    };

    const handleScroll = () => {
      if (tempDisableScroll.current) {
        return;
      }
      let active: string | null = null;
      let activeSub: string | null = null;

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

      const activeEl = activeSub ?? active;
      if (activeEl) {
        const parent = document.getElementById(`toc-scroll-wrapper`);
        const activeNode = document.getElementById(`toc-${activeEl}`);
        const visible = isVisible(activeNode, parent);

        if (!visible && parent && activeNode) {
          parent.scrollTop = activeNode.offsetTop - 128;
        }
      }

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

  const scrollToggle = () => {
    tempDisableScroll.current = true;
    setTimeout(() => {
      tempDisableScroll.current = false;
    }, 50);
  };

  return {
    activeId,
    activeSubId,
    setActiveId: (id) => {
      setActiveId(id);
      setActiveSubId(null);
      scrollToggle();
    },
    setActiveSubId: (id) => {
      setActiveSubId(id);
      setActiveId(null);
      scrollToggle();
    },
  };
}

function isVisible(ele, container) {
  const eleTop = ele.offsetTop;
  const eleBottom = ele.offsetTop + ele.clientHeight;

  const containerTop = container.scrollTop + 70;
  const containerBottom = containerTop + container.clientHeight - 140;

  return (
    (eleTop >= containerTop && eleBottom <= containerBottom) ||
    (eleTop < containerTop && containerTop < eleBottom) ||
    (eleTop < containerBottom && containerBottom < eleBottom)
  );
}

export { useToc };
