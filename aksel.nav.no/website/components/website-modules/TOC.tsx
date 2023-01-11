import { removeEmojies } from "@/utils";
import { BodyShort, Heading, Link } from "@navikt/ds-react";
import cl from "classnames";
import throttle from "lodash/throttle";
import * as React from "react";
import { useEffect, useState } from "react";

export function TableOfContents({
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
          !Array.from(
            main.getElementsByClassName("algolia-ignore-index")
          )?.some((y) => y.contains(x))
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
      aria-labelledby="toc-heading"
      className={cl(
        "algolia-ignore-index sticky top-20 z-[1] order-1 my-0 mb-16 hidden w-72 flex-col items-start pl-4",
        {
          hidden: !renderToc,
          "col-start-3 max-w-prose md:sticky md:top-20 lg:flex":
            aksel && renderToc,
          "mt-12 mr-auto h-full xl:flex": !aksel && renderToc,
        }
      )}
    >
      <Heading
        size="small"
        as="p"
        id="toc-heading"
        className={cl("mb-4", {
          "text-deepblue-700": aksel,
        })}
      >
        Innhold på siden
      </Heading>
      <div
        id="toc-scroll"
        className="flex max-h-[80vh] flex-col overflow-y-auto"
      >
        <nav aria-labelledby="toc-heading">
          <ul>
            {toc.map((link) => {
              return (
                <React.Fragment key={link.id}>
                  <BodyShort
                    as="li"
                    className={cl("border-l py-2 pl-4", {
                      "border-l-deepblue-700 font-semibold shadow-[inset_1px_0_0_0_theme(colors.deepblue-700),-1px_0_0_0_theme(colors.deepblue-700)]":
                        link.id === activeId && aksel,
                      "border-l-gray-900 font-semibold shadow-[inset_1px_0_0_0_theme(colors.gray-900),-1px_0_0_0_theme(colors.gray-900)]":
                        link.id === activeId && !aksel,
                      "border-l-border-divider": link.id !== activeId,
                    })}
                  >
                    <Link
                      href={`#${link.id}`}
                      onClick={() => handleFocus(`${link.id}`)}
                      className={cl(
                        "block w-64 max-w-full overflow-hidden no-underline hover:underline",
                        {
                          "text-deepblue-700": aksel && link.id === activeId,
                          "text-text-subtle": aksel && link.id !== activeId,
                          "text-text-default": !aksel,
                        }
                      )}
                      aria-expanded={
                        link?.lvl3?.length > 0 && link?.id === activeId
                      }
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
                            className="pl-4"
                            id={`${x.id}-parent`}
                            data-index={y}
                          >
                            <Link
                              href={`#${x.id}`}
                              onClick={() => handleFocus(`${x.id}`)}
                              className={cl(
                                "block w-56 overflow-hidden text-ellipsis whitespace-pre py-1 no-underline hover:underline",
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
      </div>
    </aside>
  );
}

export default TableOfContents;
