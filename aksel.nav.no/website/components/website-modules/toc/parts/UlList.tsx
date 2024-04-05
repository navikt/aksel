import cl from "clsx";
import { TableOfContentsT } from "@/types";
import { removeEmojies } from "@/utils";
import { MenuList, MenuListItem } from "@/web/menu/Menu";
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
    <MenuList
      className={cl(styles.hideScrollbar, {
        "max-h-[70vh] overflow-y-scroll overscroll-contain": !nested,
      })}
      id={!nested ? "toc-scroll-wrapper" : undefined}
    >
      {toc.map((node) => (
        <li key={node.id}>
          <>
            <MenuListItem
              id={`toc-${node.id}`}
              href={`#${node.id}`}
              selected={isActive(node.id)}
              onClick={() =>
                nested
                  ? tocProps.setActiveSubId(node.id)
                  : tocProps.setActiveId(node.id)
              }
            >
              {removeEmojies(node.title).trim()}
            </MenuListItem>
            {!nested && node.children.length > 0 && (
              <UlList toc={node.children} nested tocProps={tocProps} />
            )}
          </>
        </li>
      ))}
    </MenuList>
  );
}
export default UlList;
