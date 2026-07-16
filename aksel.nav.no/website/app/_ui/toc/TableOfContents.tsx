"use client";

import { stegaClean } from "next-sanity";
import { Events } from "@navikt/analytics-types";
import { BodyShort, Button, Detail } from "@navikt/ds-react";
import type { TOC_BY_SLUG_QUERY_RESULT } from "@/app/_sanity/query-types";
import { NextLink } from "@/app/_ui/next-link/NextLink";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";
import { GithubIcon } from "@/assets/Icons";
import { cl } from "@/ui-utils/className";
import { removeEmojiesFromText } from "@/ui-utils/format-text";
import styles from "./TableOfContents.module.css";
import { TableOfContentsScroll } from "./TableOfContents.scroll";
import { useTableOfContents } from "./useTableOfContents";

type TableOfContentsProps = {
  toc: TOC_BY_SLUG_QUERY_RESULT;
  variant?: "default" | "subtle";
  feedback?: {
    name?: string;
    text: string;
    href?: string;
  };
  linkToChangelogs?: boolean;
};

function TableOfContents({
  toc: tocProp,
  variant = "default",
  feedback,
  linkToChangelogs = false,
}: TableOfContentsProps) {
  const toc = linkToChangelogs ? tocWithChangelogs(tocProp) : tocProp;

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

        <ul
          className={`${styles.tocMenuUl} ${styles.hideScrollbar}`}
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
                    umamiTrack(Events.NAVIGERE, {
                      lenketekst: removeEmojiesFromText(
                        stegaClean(node.title),
                      ).trim(),
                      destinasjon: `#${node.id}`,
                      lenkegruppe: "innholdsfortegnelse",
                    });
                  }}
                  className={cl(styles.tocNavListItemLink, {
                    [styles.tocNavListNotch]: active,
                  })}
                  data-current={active}
                  aria-current={active ? "location" : undefined}
                >
                  {removeEmojiesFromText(stegaClean(node.title)).trim()}
                </NextLink>
              </BodyShort>
            );
          })}
        </ul>
      </div>
      <TableOfContentsLinks feedback={stegaClean(feedback)} />
    </aside>
  );
}

function tocWithChangelogs(toc: TOC_BY_SLUG_QUERY_RESULT) {
  if (!toc || toc.length === 0) {
    return undefined;
  }

  return [...toc, { id: "endringslogg-table", title: "Endringslogg" }];
}

function TableOfContentsLinks({
  feedback,
}: Pick<TableOfContentsProps, "feedback">) {
  if (!feedback?.name) {
    return null;
  }

  return (
    <div className={styles.tocAsideLinks}>
      <Button
        as="a"
        variant="secondary-neutral"
        size="small"
        icon={<GithubIcon aria-hidden />}
        href={
          feedback.href ??
          `https://github.com/navikt/aksel/issues/new?labels=foresp%C3%B8rsel+%F0%9F%A5%B0%2Ckomponenter+%F0%9F%A7%A9&template=update-component.yml&title=%5BInnspill%5D%20${feedback.name}`
        }
        onClick={() =>
          umamiTrack(Events.KNAPP_KLIKKET, {
            tekst: feedback.text,
            seksjon: "innholdsfortegnelse",
          })
        }
        target="_blank"
        rel="noreferrer"
      >
        {feedback.text}
      </Button>
    </div>
  );
}

export { TableOfContents };
