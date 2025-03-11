import cl from "clsx";
import { TableOfContentsT } from "@/types";
import { removeEmojies } from "@/utils";
import { MenuLi, MenuLink, MenuUl } from "@/web/menu/Menu";
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
    <MenuUl
      className={cl(styles.hideScrollbar, {
        "max-h-[70vh] overflow-y-scroll overscroll-contain py-1": !nested,
      })}
      id={!nested ? "toc-scroll-wrapper" : undefined}
    >
      {toc.map((node) => (
        <MenuLi key={node.id}>
          <>
            <MenuLink
              source="toc"
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
            </MenuLink>
            {!nested && node.children.length > 0 && (
              <UlList toc={node.children} nested tocProps={tocProps} />
            )}
          </>
        </MenuLi>
      ))}
    </MenuUl>
  );
}
export default UlList;
