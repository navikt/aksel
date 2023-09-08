import { removeEmojies } from "@/utils";
import { BodyShort, Link } from "@navikt/ds-react";
import cl from "clsx";
import { useToc } from "components/website-modules/toc/useToc";
import * as React from "react";

export function TableOfContentsv2({ changedState }: { changedState: any }) {
  const { toc, activeId, activeSubId } = useToc(changedState);

  const handleFocus = (id: string) => {
    const element = document.getElementById(id);
    element && element?.focus();
    element && element?.scrollIntoView();
  };

  const renderToc = toc.length !== 0;

  return (
    <aside
      className={cl(
        "toc-ignore sticky top-20 z-[1] order-1 my-0 mb-16 ml-6 mr-auto h-full max-w-[160px] flex-col items-start overflow-x-hidden sm:-mr-6 md:-mr-10",
        {
          "invisible hidden": !renderToc,
          "invisible hidden xl:visible xl:flex": renderToc,
        }
      )}
    >
      {toc.length > 0 && (
        <BodyShort
          id="toc-heading"
          className="text-deepblue-800 animate-fadeIn mb-2 font-semibold "
        >
          Innhold på siden
        </BodyShort>
      )}

      <nav
        aria-labelledby="toc-heading"
        id="toc-scroll"
        className="max-h-[80vh] w-full overflow-y-auto"
      >
        <ul>
          {toc.map((link) => {
            return (
              <React.Fragment key={link.id}>
                <BodyShort
                  as="li"
                  truncate
                  size="small"
                  className={cl("animate-fadeIn relative py-1 ", {
                    "font-semibold": link.id === activeId,
                  })}
                >
                  <Link
                    href={`#${link.id}`}
                    onClick={() => handleFocus(`${link.id}`)}
                    className={cl(
                      "z-10 block max-w-full no-underline hover:underline",
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
                      className={cl("animate-toc z-10 pt-1 ", {
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
                                "font-semibold text-gray-900":
                                  x.id === activeSubId,
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
