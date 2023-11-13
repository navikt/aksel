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
      className={`data-active:max-h-[70vh] data-active:py-1 data-active:overflow-y-scroll data-active:overscroll-contain pl-3 ${styles.hideScrollbar}`}
      data-active={!nested}
      id={!nested ? "toc-scroll-wrapper" : undefined}
    >
      {toc.map((node) => (
        <li key={node.id}>
          <>
            <a
              id={`toc-${node.id}`}
              href={`#${node.id}`}
              className="hover:bg-surface-hover data-active:font-semibold focus-visible:shadow-focus rounded-medium data-active:bg-surface-hover data-active:text-deepblue-700 data-active:shadow-xsmall flex w-fit max-w-[13rem] scroll-my-6 items-center justify-between px-2 py-1 outline-none transition-[background-color,color] duration-150 ease-out"
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
                {removeEmojies(node.title)}
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
