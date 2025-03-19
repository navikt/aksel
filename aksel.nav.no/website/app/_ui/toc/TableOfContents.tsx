"use client";

import cl from "clsx";
import Link from "next/link";
import { BodyShort, Label } from "@navikt/ds-react";
import { removeEmojies } from "@/utils";
import styles from "./TableOfContents.module.css";
import { TableOfContentsScroll } from "./TableOfContents.scroll";
import { TableOfContentsT, useTableOfContents } from "./useTableOfContents";

type TableOfContentsProps = {
  toc: TableOfContentsT;
  variant?: "default" | "subtle";
};

function TableOfContents({ toc, variant }: TableOfContentsProps) {
  const tocCtx = useTableOfContents(toc);

  if (toc.length === 0) {
    return null;
  }

  /**
   * We have to add this to account for different backgrounds for god-praksis and komponent-pages
   */
  const style = {
    "--shadow-color":
      variant === "subtle"
        ? "var(--a-surface-subtle)"
        : "var(--a-surface-default)",
  } as React.CSSProperties;

  const isActive = (_id: string) => {
    return _id === tocCtx.activeId;
  };

  return (
    <aside
      className="sticky top-20 order-1 hidden min-w-60 self-start p-1 xl:block"
      style={style}
    >
      <Label as="h2" size="small" textColor="subtle" className="py-05">
        Innhold på siden
      </Label>
      <div className="relative">
        <TableOfContentsScroll />

        {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
        <ul
          className={cl(
            styles.menuList,
            styles.hideScrollbar,
            "max-h-[70vh] overflow-y-scroll overscroll-contain py-1",
          )}
          id="toc-scroll-wrapper"
          // biome-ignore lint/a11y/noRedundantRoles: WebKit browsers remove list semantics when list-style-type is none
          role="list"
        >
          {toc.map((node) => {
            const _isActive = isActive(node.id);
            return (
              <li key={node.id} className="group">
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
                    onClick={() => tocCtx.setActiveId(node.id)}
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
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

export { TableOfContents };
