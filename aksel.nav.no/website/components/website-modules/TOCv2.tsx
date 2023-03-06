import { removeEmojies } from "@/utils";
import { BodyShort, Link } from "@navikt/ds-react";
import cl from "clsx";
import throttle from "lodash/throttle";
import * as React from "react";
import { useEffect, useState } from "react";

export function TableOfContentsv2({
  changedState,
  hideToc = true,
  aksel = false,
}: {
  changedState: any;
  hideToc?: boolean;
  aksel?: boolean;
}): JSX.Element {
  const [toc, setToc] = useState<
    { heading: string; id: string; lvl3: { heading: string; id: string }[] }[]
  >([]);

  const [activeId, setActiveId] = useState(null);
  const [activeSubId, setActiveSubId] = useState(null);

  useEffect(() => {
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

  const handleFocus = (id: string) => {
    const element = document.getElementById(id);
    element && element?.focus();
    element && element?.scrollIntoView();
  };

  const renderToc = !(toc.length < 2) && !hideToc;

  return (
    <aside
      className={cl(
        "toc-ignore sticky top-20 z-[1] order-1 my-0 ml-6 mb-16 mr-auto h-full w-full max-w-[160px] flex-col items-start sm:-mr-6 md:-mr-10",
        {
          hidden: !renderToc,
          "hidden xl:flex": renderToc,
        }
      )}
    >
      <BodyShort
        id="toc-heading"
        className="text-deepblue-800 mb-2 font-semibold"
      >
        Innhold på siden
      </BodyShort>

      <nav
        aria-labelledby="toc-heading"
        id="toc-scroll"
        className="max-h-[80vh] overflow-y-auto"
      >
        <ul>
          {toc.map((link) => {
            return (
              <React.Fragment key={link.id}>
                <BodyShort
                  as="li"
                  size="small"
                  className={cl("py-1", {
                    "font-semibold": link.id === activeId,
                    "": link.id !== activeId,
                  })}
                >
                  <Link
                    href={`#${link.id}`}
                    onClick={() => handleFocus(`${link.id}`)}
                    className={cl(
                      "block max-w-full no-underline hover:underline",
                      {
                        "text-deepblue-800":
                          link.id === activeId &&
                          !link?.lvl3?.find((x) => x.id === activeSubId),
                        "text-text-subtle": link.id !== activeId || activeSubId,
                      }
                    )}
                  >
                    {link.heading}
                  </Link>
                  {link?.lvl3?.length > 0 && (
                    <ul
                      className={cl("animate-fadeIn pt-1", {
                        hidden: link.id !== activeId,
                      })}
                    >
                      {link.lvl3.map((x, y) => (
                        <BodyShort
                          size="small"
                          as="li"
                          key={x.id}
                          className="pl-2"
                          id={`${x.id}-parent`}
                          data-index={y}
                        >
                          <Link
                            href={`#${x.id}`}
                            onClick={() => handleFocus(`${x.id}`)}
                            className={cl(
                              "block w-[152px] overflow-hidden text-ellipsis whitespace-pre py-1 no-underline hover:underline",
                              {
                                "text-deepblue-700 font-semibold":
                                  x.id === activeSubId && aksel,
                                "font-semibold text-gray-900":
                                  x.id === activeSubId && !aksel,
                                "text-text-subtle": x.id !== activeSubId,
                              }
                            )}
                          >
                            {removeEmojies(x.heading.split("(")[0])}
                          </Link>
                        </BodyShort>
                      ))}
                    </ul>
                  )}
                </BodyShort>
              </React.Fragment>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default TableOfContentsv2;
