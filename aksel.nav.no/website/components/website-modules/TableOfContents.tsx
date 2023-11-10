import { TableOfContentsT } from "@/types";
import { BodyShort, Label } from "@navikt/ds-react";
import cl from "clsx";

type TableOfContentsProps = {
  toc: TableOfContentsT;
};

function TableOfContents({ toc }: TableOfContentsProps) {
  if (toc.length === 0) {
    return null;
  }

  return (
    <aside className="ring-border-subtle min-w-56 sticky top-20 order-1 hidden self-start overscroll-contain rounded-lg p-2 pt-4 ring-1 xl:block">
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
                  "hover:bg-surface-subtle flex items-center justify-between rounded-lg px-2 py-1",
                  {
                    "bg-surface-subtle font-semibold": false,
                  }
                )}
              >
                <BodyShort size="small" truncate as="span">
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
                          "hover:bg-surface-subtle flex items-center justify-between rounded-lg px-2 py-1 group-[.toc-lvl2]:pl-4",
                          {
                            "bg-surface-subtle font-semibold": false,
                          }
                        )}
                      >
                        <BodyShort size="small" truncate as="span">
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
