import { TableOfContentsT } from "@/types";
import { BodyShort, Label } from "@navikt/ds-react";
import cl from "clsx";
import { useToc } from "./useToc";

type TableOfContentsProps = {
  toc: TableOfContentsT;
};

function TableOfContents({ toc }: TableOfContentsProps) {
  const { activeId, activeSubId } = useToc(toc);

  if (toc.length === 0) {
    return null;
  }

  /* ring-border-subtle ring-1 rounded-lg */
  return (
    <aside className="min-w-56 sticky top-20 order-1 hidden max-h-[80vh] self-start overflow-y-auto overscroll-contain xl:block">
      <Label as="h2" className="text-deepblue-800 px-2 pb-1">
        Innhold på siden
      </Label>

      <ul>
        {toc.map((lvl2) => (
          <li key={lvl2.id} className="toc-lvl2 group">
            <>
              <a
                href={`#${lvl2.id}`}
                className={cl(
                  "hover:bg-surface-subtle focus-visible:shadow-focus flex items-center justify-between rounded-lg px-2 py-1 outline-none transition-[background-color] ease-out",
                  { "bg-surface-subtle": lvl2.id === activeId && !activeSubId }
                )}
              >
                <BodyShort
                  size="small"
                  truncate
                  as="span"
                  weight={
                    lvl2.id === activeId && !activeSubId
                      ? "semibold"
                      : "regular"
                  }
                >
                  {lvl2.title}
                </BodyShort>
              </a>
              {lvl2.children.length > 0 && (
                <ul>
                  {lvl2.children.map((lvl3) => (
                    <li key={lvl3.id}>
                      <a
                        href={`#${lvl3.id}`}
                        className={cl(
                          "hover:bg-surface-subtle focus-visible:shadow-focus flex items-center justify-between rounded-lg px-2 py-1 transition-[background-color] ease-out group-[.toc-lvl2]:pl-4",
                          {
                            "bg-surface-subtle": lvl3.id === activeSubId,
                          }
                        )}
                      >
                        <BodyShort
                          size="small"
                          truncate
                          as="span"
                          weight={
                            lvl3.id === activeSubId ? "semibold" : "regular"
                          }
                        >
                          {lvl3.title}
                        </BodyShort>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/*

.TOC_Link__7eZBF.TOC_active__n1Lqs, .TOC_Link__7eZBF:hover {
    background-color: var(--surface-active);
}
*/
export default TableOfContents;
