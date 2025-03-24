"use client";

import cl from "clsx";
import NextLink from "next/link";
import { ClockDashedIcon, LightBulbIcon } from "@navikt/aksel-icons";
import { BodyShort, Detail, Link } from "@navikt/ds-react";
import { TOC_BY_SLUG_QUERYResult } from "@/app/_sanity/query-types";
import { removeEmojies } from "@/utils";
import styles from "./TableOfContents.module.css";
import { TableOfContentsScroll } from "./TableOfContents.scroll";
import { useTableOfContents } from "./useTableOfContents";

type TableOfContentsProps = {
  toc: TOC_BY_SLUG_QUERYResult;
  variant?: "default" | "subtle";
  showChangelogLink?: boolean;
  feedback?: {
    name?: string;
    text: string;
  };
};

function TableOfContents({
  toc,
  variant = "default",
  showChangelogLink,
  feedback,
}: TableOfContentsProps) {
  const tocCtx = useTableOfContents(toc ?? []);

  if (!toc || toc.length === 0) {
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
                <NextLink
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
                </NextLink>
              </BodyShort>
            );
          })}
        </ul>
      </div>
      <TableOfContentsLinks
        feedback={feedback}
        showChangelogLink={showChangelogLink}
      />
    </aside>
  );
}

function TableOfContentsLinks({
  feedback,
  showChangelogLink,
}: Pick<TableOfContentsProps, "showChangelogLink" | "feedback">) {
  if ((!feedback || !feedback.name) && !showChangelogLink) {
    return null;
  }

  return (
    <div className={styles.tocAsideLinks}>
      {feedback?.name && (
        <Link
          href={`https://github.com/navikt/aksel/issues/new?labels=foresp%C3%B8rsel+%F0%9F%A5%B0%2Ckomponenter+%F0%9F%A7%A9&template=update-component.yml&title=%5BInnspill+til+komponent%5D%3A+%3C${feedback.name}%20/%3E`}
          variant="neutral"
        >
          <LightBulbIcon fontSize="1.5rem" aria-hidden />
          {`${feedback.text}`}
        </Link>
      )}
      {showChangelogLink && (
        <Link href="/grunnleggende/kode/endringslogg" variant="neutral">
          <ClockDashedIcon fontSize="1.5rem" aria-hidden />
          Endringslogg
        </Link>
      )}
    </div>
  );
}

export { TableOfContents };
