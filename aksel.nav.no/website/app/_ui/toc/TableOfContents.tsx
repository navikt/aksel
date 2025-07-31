"use client";

import cl from "clsx";
import NextLink from "next/link";
import { SparklesIcon } from "@navikt/aksel-icons";
import { BodyShort, Button, Detail } from "@navikt/ds-react";
import { TOC_BY_SLUG_QUERYResult } from "@/app/_sanity/query-types";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";
import { removeEmojiesFromText } from "@/ui-utils/format-text";
import styles from "./TableOfContents.module.css";
import { TableOfContentsScroll } from "./TableOfContents.scroll";
import { useTableOfContents } from "./useTableOfContents";

type TableOfContentsProps = {
  toc: TOC_BY_SLUG_QUERYResult;
  variant?: "default" | "subtle";
  feedback?: {
    name?: string;
    text: string;
  };
};

function TableOfContents({
  toc,
  variant = "default",
  feedback,
}: TableOfContentsProps) {
  const tocCtx = useTableOfContents(toc ?? []);

  if (!toc || toc.length === 0) {
    return <div className={styles.tocAside} aria-hidden />;
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
        <TableOfContentsScroll tocLength={toc.length} />

        {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
        <ul
          className={cl(styles.tocMenuUl, styles.hideScrollbar)}
          id="toc-scroll-wrapper"
          // biome-ignore lint/a11y/noRedundantRoles: WebKit browsers remove list semantics when list-style-type is none
          role="list"
        >
          {toc.map((node) => {
            /* Filters out "empty" headings from CMS */
            if (!node.id || !node.title) {
              return null;
            }

            const active = node.id === tocCtx.activeId;

            return (
              <BodyShort
                key={node.id}
                as="li"
                size="small"
                data-state={active ? "active" : "inactive"}
                className={styles.tocNavListItem}
                id={`toc-${node.id}`}
              >
                <NextLink
                  prefetch={false}
                  href={`#${node.id}`}
                  onClick={() => {
                    tocCtx.setActiveId(node.id);
                    umamiTrack("navigere", {
                      kilde: "toc",
                      url: `#${node.id}`,
                    });
                  }}
                  className={cl(styles.tocNavListItemLink, {
                    [styles.tocNavListNotch]: active,
                  })}
                  data-current={active}
                >
                  {removeEmojiesFromText(node.title).trim()}
                </NextLink>
              </BodyShort>
            );
          })}
        </ul>
      </div>
      <TableOfContentsLinks feedback={feedback} />
    </aside>
  );
}

function TableOfContentsLinks({
  feedback,
}: Pick<TableOfContentsProps, "feedback">) {
  if (!feedback || !feedback.name) {
    return null;
  }

  return (
    <div className={styles.tocAsideLinks}>
      <Button
        as="a"
        variant="secondary-neutral"
        size="small"
        icon={<SparklesIcon aria-hidden />}
        href={`https://github.com/navikt/aksel/issues/new?labels=foresp%C3%B8rsel+%F0%9F%A5%B0%2Ckomponenter+%F0%9F%A7%A9&template=update-component.yml&title=%5BInnspill%5D%20${feedback.name}`}
        onClick={() => umamiTrack("feedback-designsystem", { kilde: "toc" })}
        target="_blank"
        rel="noreferrer"
      >
        {feedback.text}
      </Button>
    </div>
  );
}

export { TableOfContents };
