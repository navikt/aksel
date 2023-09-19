import { removeEmojies } from "@/utils";
import { BodyShort, Heading, Link } from "@navikt/ds-react";
import cl from "clsx";
import { useToc } from "components/website-modules/toc/useToc";
import * as React from "react";

export function TableOfContents({
  changedState,
  hideToc = true,
  aksel = false,
}: {
  changedState: any;
  hideToc?: boolean;
  aksel?: boolean;
}) {
  const { toc, activeId, activeSubId } = useToc(changedState);

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
        "toc-ignore sticky top-20 z-[1] order-1 my-0 mb-16 hidden w-72 flex-col items-start pl-4",
        {
          hidden: !renderToc,
          "col-start-3 max-w-prose md:sticky md:top-20 lg:flex":
            aksel && renderToc,
          "mr-auto mt-12 h-full xl:flex": !aksel && renderToc,
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
