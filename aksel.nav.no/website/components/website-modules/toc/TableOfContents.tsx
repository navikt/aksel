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

  return (
    <aside className="min-w-56 sticky top-20 order-1 hidden max-h-[80vh] w-56 self-start overflow-y-auto overscroll-contain p-1 xl:block">
      <Label as="h2" className="text-deepblue-800 px-2 pb-1">
        Innhold på siden
      </Label>
      <UlList toc={toc} activeId={activeId} activeSubId={activeSubId} />
    </aside>
  );
}

function UlList({
  activeId,
  activeSubId,
  toc,
  nested,
}: {
  activeId: string | null;
  activeSubId: string | null;
  toc: TableOfContentsT | TableOfContentsT[number]["children"];

  nested?: boolean;
}) {
  const id = nested ? activeSubId : activeId;
  const isActive = (_id: string) => {
    if (nested) {
      return _id === id;
    }
    return _id === id && !activeSubId;
  };

  return (
    <ul>
      {toc.map((lvl2) => (
        <li key={lvl2.id}>
          <>
            <a
              href={`#${lvl2.id}`}
              className={cl(
                "hover:bg-surface-hover focus-visible:shadow-focus rounded-medium flex w-fit items-center justify-between px-2 py-1 outline-none transition-[background-color,color] duration-150 ease-out",
                {
                  "bg-surface-hover text-deepblue-800 shadow-xsmall": isActive(
                    lvl2.id
                  ),
                  "ml-2": nested,
                }
              )}
            >
              <BodyShort
                size="small"
                as="span"
                truncate
                className="whitespace-break-spaces"
                weight={isActive(lvl2.id) ? "semibold" : "regular"}
              >
                {lvl2.title}
              </BodyShort>
            </a>
            {!nested && lvl2.children.length > 0 && (
              <UlList
                toc={lvl2.children}
                activeId={activeId}
                activeSubId={activeSubId}
                nested
              />
            )}
          </>
        </li>
      ))}
    </ul>
  );
}

export default TableOfContents;
