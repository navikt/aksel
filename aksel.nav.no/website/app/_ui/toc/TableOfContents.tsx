"use client";

import cl from "clsx";
import Link from "next/link";
import { BodyShort, Detail } from "@navikt/ds-react";
import { removeEmojies } from "@/utils";
import styles from "./TableOfContents.module.css";
import { TableOfContentsScroll } from "./TableOfContents.scroll";
import { TableOfContentsT, useTableOfContents } from "./useTableOfContents";

type TableOfContentsProps = {
  toc: TableOfContentsT;
  variant?: "default" | "subtle";
};

function TableOfContents({ toc, variant = "default" }: TableOfContentsProps) {
  const tocCtx = useTableOfContents(toc);

  if (toc.length === 0) {
    return null;
  }

  return (
    <aside className={styles.tocAside} data-variant={variant}>
      <Detail
        as="h2"
        textColor="subtle"
        weight="semibold"
        className={styles.tocAsideLabel}
      >
        Innhold på siden
      </Detail>
      <div className={styles.tocAsideContent}>
        <TableOfContentsScroll />

        {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
        <ul
          className={cl(styles.tocMenuUl, styles.hideScrollbar)}
          id="toc-scroll-wrapper"
          // biome-ignore lint/a11y/noRedundantRoles: WebKit browsers remove list semantics when list-style-type is none
          role="list"
        >
          {toc.map((node) => {
            const active = node.id === tocCtx.activeId;

            return (
              <BodyShort
                key={node.id}
                as="li"
                size="small"
                data-state={active ? "active" : "inactive"}
                className={styles.tocNavListItem}
              >
                <Link
                  id={`toc-${node.id}`}
                  prefetch={false}
                  href={`#${node.id}`}
                  onClick={() => tocCtx.setActiveId(node.id)}
                  className={cl(styles.tocNavListItemLink, {
                    [styles.tocNavListNotch]: active,
                  })}
                  data-current={active}
                  data-umami-event="navigere"
                  data-umami-event-kilde="toc"
                >
                  {removeEmojies(node.title).trim()}
                </Link>
              </BodyShort>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

export { TableOfContents };
