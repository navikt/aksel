import { useClientLayoutEffect } from "@navikt/ds-react";
import throttle from "lodash/throttle";
import { useState, useEffect } from "react";

export const useToc = ({ changedState }: { changedState: any }) => {
  const [toc, setToc] = useState<
    { heading: string; id: string; lvl3: { heading: string; id: string }[] }[]
  >([]);

  const [activeId, setActiveId] = useState(null);
  const [activeSubId, setActiveSubId] = useState(null);

  useClientLayoutEffect(() => {
    const time = setTimeout(() => {
      const main = document.getElementsByTagName("main")?.[0];
      const tags = main?.getElementsByTagName("h2");
      const tree = main?.querySelectorAll("h2, h3");
      if (!tags) return;

      let hit = false;

      const newTree = Array.from(tree)?.filter((x) => {
        if (x.tagName === "H2") {
          hit = true;
          return true;
        } else if (x.tagName === "H3" && hit === false) {
          return false;
        }
        return true;
      });

      const filtered = Array.from(newTree)?.filter(
        (x) =>
          !Array.from(main.getElementsByClassName("toc-ignore"))?.some((y) =>
            y.contains(x)
          )
      );
      const toc: {
        heading: string;
        id: string;
        lvl3: { heading: string; id: string }[];
      }[] = [];
      for (const x in filtered) {
        if (!filtered[x]?.id) continue;
        filtered[x].tagName === "H2"
          ? toc.push({
              heading: filtered[x].textContent,
              id: decodeURI(filtered[x].id),
              lvl3: [],
            })
          : toc[toc.length - 1].lvl3.push({
              heading: filtered[x].textContent,
              id: decodeURI(filtered[x].id),
            });
      }
      setToc([...toc]);
    }, 150);

    return () => clearTimeout(time);
  }, [changedState]);

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
        const el = document.getElementById(x.id);
        if (validPick(el)) {
          active = x.id;
        }
        if (x?.lvl3) {
          for (const y of x.lvl3) {
            const el = document.getElementById(y.id);
            if (validPick(el)) {
              activeSub = y.id;
            }
          }
        }
      }

      toc && !activeSub ? setActiveSubId(null) : setActiveSubId(activeSub);

      active && setActiveId(active);

      if (activeSub) {
        const dist = document.getElementById(`${activeSub}-parent`).offsetTop;
        const parent = document.getElementById(`toc-scroll`);
        if (!parent || !dist) return;
        parent.scrollTop = dist - 128;
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

  return { toc, activeId, activeSubId };
};
