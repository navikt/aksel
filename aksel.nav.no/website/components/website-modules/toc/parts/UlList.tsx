import cl from "clsx";
import Link from "next/link";
import { BodyShort } from "@navikt/ds-react";
import { TableOfContentsT } from "@/types";
import { removeEmojies } from "@/utils";
import styles from "../TableOfContents.module.css";

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
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <ul
      className={cl(styles.menuList, styles.hideScrollbar, {
        "max-h-[70vh] overflow-y-scroll overscroll-contain py-1": !nested,
      })}
      id={!nested ? "toc-scroll-wrapper" : undefined}
      // biome-ignore lint/a11y/noRedundantRoles: WebKit browsers remove list semantics when list-style-type is none
      role="list"
    >
      {toc.map((node) => {
        const _isActive = isActive(node.id);
        return (
          <li key={node.id} className="group">
            <>
              <div
                className="relative scroll-m-6 border-l border-border-subtle"
                id={`toc-${node.id}`}
              >
                <BodyShort
                  data-current={_isActive}
                  size="small"
                  as={Link}
                  prefetch={false}
                  href={`#${node.id}`}
                  onClick={() =>
                    nested
                      ? tocProps.setActiveSubId(node.id)
                      : tocProps.setActiveId(node.id)
                  }
                  data-umami-event="navigere"
                  data-umami-event-kilde="toc"
                  className={cl(
                    styles.menuListItem,
                    "flex py-05 focus:outline-none *:focus-visible:shadow-focus group-first:pt-0 group-last:last:pb-0",
                    "before:absolute before:-left-px before:top-05 before:h-[calc(100%-0.25rem)] before:rounded-r-sm before:transition-all group-first:before:top-0 group-first:before:h-[calc(100%-0.125rem)] group-last:before:h-[calc(100%-0.125rem)]",
                    {
                      "text-text-subtle before:w-0 before:bg-gray-400 before:duration-100 before:ease-linear hover:text-text-default hover:before:w-1":
                        !_isActive,
                      "before:w-1": _isActive,
                    },
                  )}
                >
                  <span className="w-full rounded px-2 py-1 transition-colors duration-100 ease-out">
                    {removeEmojies(node.title).trim()}
                  </span>
                </BodyShort>
              </div>

              {!nested && node.children.length > 0 && (
                <UlList toc={node.children} nested tocProps={tocProps} />
              )}
            </>
          </li>
        );
      })}
    </ul>
  );
}
export { UlList };
