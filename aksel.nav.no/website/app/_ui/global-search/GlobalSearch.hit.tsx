"use client";

import Image from "next/image";
import React from "react";
import { Events } from "@navikt/analytics-types";
import { Heading, Tag } from "@navikt/ds-react";
import { useGlobalSearch } from "@/app/_ui/global-search/GlobalSearch.context";
import type {
  SearchHitT,
  SearchResultPageTypesT,
} from "@/app/_ui/global-search/server/GlobalSearch.config";
import { NextLink } from "@/app/_ui/next-link/NextLink";
import { doctypeToColorRole } from "@/app/_ui/theming/theme-config";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";
import styles from "./GlobalSearch.module.css";

function GlobalSearchHitCollection({
  heading,
  searchHits,
  tag,
}: {
  heading: React.ReactNode;
  searchHits: SearchHitT[];
  tag?: Partial<SearchResultPageTypesT>;
}) {
  if (!searchHits || searchHits.length === 0) {
    return null;
  }

  return (
    <div>
      <Heading
        className={styles.searchSectionHeading}
        size="small"
        level="2"
        data-color={doctypeToColorRole[tag ?? ""] ?? "neutral"}
      >
        {heading}
      </Heading>
      <ul>
        {searchHits.map((x) => (
          <GlobalSearchLink
            key={`/${x.slug}${x.anchor ? `#${x.anchor}` : ""}`}
            hit={x}
            tag={tag}
          />
        ))}
      </ul>
    </div>
  );
}

function GlobalSearchLink(props: {
  hit: SearchHitT;
  tag?: Partial<SearchResultPageTypesT>;
}) {
  const { closeSearch } = useGlobalSearch();
  const { hit } = props;

  const href = hit.anchor ? `/${hit.slug}#${hit.anchor}` : `/${hit.slug}`;

  return (
    <li className={styles.searchLinkLi}>
      <div className={styles.searchLinkText}>
        <span className={styles.searchLinkHeading}>
          <Heading
            size="small"
            as={NextLink}
            href={href}
            onClick={() =>
              umamiTrack(Events.NAVIGERE, {
                lenketekst: hit.heading,
                destinasjon: href,
                lenkegruppe: "globalt søk",
              })
            }
            onNavigate={closeSearch}
            className={styles.searchLink}
            prefetch={false}
          >
            {hit.heading}
          </Heading>

          {hit.statusTag && <StatusTag status={hit.statusTag} />}
        </span>

        <p className={styles.searchLinkDescription}>{hit.description}</p>
      </div>

      <div className={styles.searchThumbnail}>
        {hit.thumbnail && (
          <Image
            src={hit.thumbnail}
            decoding="sync"
            width="96"
            height="96"
            alt={`${hit.heading} thumbnail`}
            aria-hidden
          />
        )}
      </div>
    </li>
  );
}

const StatusTag = ({ status }: { status: string }) => {
  switch (status) {
    case "preview":
      return (
        <Tag size="small" data-color="meta-purple" aria-hidden>
          Preview
        </Tag>
      );
    case "beta":
      return (
        <Tag size="small" data-color="meta-purple" aria-hidden>
          Beta
        </Tag>
      );
    case "new":
      return (
        <Tag data-color="info" size="small" aria-hidden>
          Ny
        </Tag>
      );
    case "deprecated":
      return (
        <Tag data-color="neutral" size="small" aria-hidden>
          Avviklet
        </Tag>
      );
    default:
      return null;
  }
};

export { GlobalSearchHitCollection };
