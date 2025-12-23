"use client";

import throttle from "lodash/throttle";
import { useEffect, useRef, useState } from "react";
import { TOC_BY_SLUG_QUERY_RESULT } from "@/app/_sanity/query-types";

function useTableOfContents(toc: NonNullable<TOC_BY_SLUG_QUERY_RESULT>) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const tempDisableScroll = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (tempDisableScroll.current) {
        return;
      }
      let activeElementId: string | null = null;

      for (const x of toc) {
        const h2Element = document.getElementById(x.id);

        if (h2Element && h2Element.getBoundingClientRect().top < 116) {
          activeElementId = x.id;
        }
      }

      if (activeElementId) {
        setActiveId(activeElementId);
        const parent = document.getElementById(`toc-scroll-wrapper`);
        const activeNode = document.getElementById(`toc-${activeElementId}`);
        const visible = isVisible(activeNode, parent);

        if (!visible && parent && activeNode) {
          parent.scrollTop = activeNode.offsetTop - 128;
        }
      }

      if (window.scrollY < 300) {
        setActiveId(null);
      }
    };

    const func = throttle(handleScroll, 50);

    window.addEventListener("scroll", func);
    return () => {
      window.removeEventListener("scroll", func);
    };
  }, [toc]);

  useEffect(() => {
    /**
     * `activeId` updates state in TOC, causes hydration-errors if we change initial state on load outside effect.
     */

    // eslint-disable-next-line
    /* eslint-disable-next-line react-hooks/set-state-in-effect  */
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
    setActiveId: (id: string) => {
      setActiveId(id);
      scrollToggle();
    },
  };
}

function isVisible(ele: HTMLElement | null, container: HTMLElement | null) {
  if (!ele || !container) {
    return false;
  }

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

export { useTableOfContents };
