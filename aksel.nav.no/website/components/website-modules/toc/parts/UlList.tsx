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
      {toc.map((node) => (
        <li key={node.id}>
          <>
            <a
              href={`#${node.id}`}
              className="hover:bg-surface-hover data-active:font-semibold focus-visible:shadow-focus rounded-medium data-active:bg-surface-hover data-active:text-deepblue-700 data-active:shadow-xsmall flex w-fit items-center justify-between px-2 py-1 outline-none transition-[background-color,color] duration-150 ease-out"
              data-active={isActive(node.id)}
            >
              <BodyShort
                size="small"
                as="span"
                truncate
                className="whitespace-break-spaces"
                weight={isActive(node.id) ? "semibold" : "regular"}
              >
                {node.title}
              </BodyShort>
            </a>
            {!nested && node.children.length > 0 && (
              <UlList
                toc={node.children}
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
