import { TableOfContentsT } from "@/types";
import { removeEmojies } from "@/utils";
import { BodyShort } from "@navikt/ds-react";
import styles from "./table-of-contents.module.css";

function UlList({
  toc,
  nested,
  tocProps,
}: {
  toc: TableOfContentsT | TableOfContentsT[number]["children"];
  tocProps: {
    activeId: string | null;
    activeSubId: string | null;
    setActiveId: (id: string) => void;
    setActiveSubId: (id: string) => void;
  };
  nested?: boolean;
}) {
  const id = nested ? tocProps.activeSubId : tocProps.activeId;
  const isActive = (_id: string) => {
    if (nested) {
      return _id === id;
    }
    return _id === id && !tocProps.activeSubId;
  };

  return (
    <ul
      className={`pl-3 pr-1 data-active:max-h-[70vh] data-active:overflow-y-scroll data-active:overscroll-contain data-active:py-1 ${styles.hideScrollbar}`}
      data-active={!nested}
      id={!nested ? "toc-scroll-wrapper" : undefined}
    >
      {toc.map((node) => (
        <li key={node.id}>
          <>
            <a
              id={`toc-${node.id}`}
              href={`#${node.id}`}
              className={styles.listItem}
              data-active={isActive(node.id)}
              onClick={() =>
                nested
                  ? tocProps.setActiveSubId(node.id)
                  : tocProps.setActiveId(node.id)
              }
            >
              <BodyShort
                size="small"
                as="span"
                truncate
                className="whitespace-break-spaces"
                weight={isActive(node.id) ? "semibold" : "regular"}
              >
                {removeEmojies(node.title).trim()}
              </BodyShort>
            </a>
            {!nested && node.children.length > 0 && (
              <UlList toc={node.children} nested tocProps={tocProps} />
            )}
          </>
        </li>
      ))}
    </ul>
  );
}
export default UlList;
