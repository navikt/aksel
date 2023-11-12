import { TableOfContentsT } from "@/types";
import { BodyShort } from "@navikt/ds-react";
import cl from "clsx";
import styles from "./table-of-contents.module.css";

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
    <ul
      className={cl("pl-3", !nested && styles.hideScrollbar, {
        "max-h-[70vh] overflow-y-scroll overscroll-contain": !nested,
      })}
      id={!nested ? "toc-scroll-wrapper" : undefined}
    >
      {toc.map((lvl2) => (
        <li key={lvl2.id}>
          <>
            <a
              href={`#${lvl2.id}`}
              className={cl(
                "hover:bg-surface-hover focus-visible:shadow-focus rounded-medium flex w-fit items-center justify-between px-2 py-1 outline-none transition-[background-color,color] duration-150 ease-out",
                {
                  "bg-surface-hover text-deepblue-700 shadow-xsmall": isActive(
                    lvl2.id
                  ),
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
export default UlList;
