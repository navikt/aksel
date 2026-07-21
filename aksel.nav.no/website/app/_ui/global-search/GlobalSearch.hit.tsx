"use client";

import Image from "next/image";
import React from "react";
import { Events } from "@navikt/analytics-types";
import { Heading, Tag } from "@navikt/ds-react";
import { urlForImage } from "@/app/_sanity/utils";
import {
  useGlobalSearch,
  useGlobalSearchResults,
} from "@/app/_ui/global-search/GlobalSearch.context";
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
            key={`/${x.item.slug}${x.anchor ? `#${x.anchor}` : ""}`}
            hit={x}
            tag={tag}
          />
        ))}
      </ul>
    </div>
  );
}

function GlobalSearchLink(props: {
  hit: SearchHitT | Omit<SearchHitT, "score" | "anchor">;
  tag?: Partial<SearchResultPageTypesT>;
}) {
  const context = useGlobalSearch();
  const { clearDebounce } = useGlobalSearchResults();
  const { hit } = props;

  const href =
    "anchor" in hit && hit.anchor
      ? `/${hit.item.slug}#${hit.anchor}`
      : `/${hit.item.slug}`;

  const imageUrl = urlForImage(hit.item.status?.bilde)?.auto("format").url();

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
                lenketekst: hit.item.heading,
                destinasjon: href,
                lenkegruppe: "globalt søk",
              })
            }
            onNavigate={() => {
              context.closeSearch();
              clearDebounce();
            }}
            className={styles.searchLink}
            prefetch={false}
          >
            {hit.item.heading}
          </Heading>

          {hit.item?.status?.tag && <StatusTag status={hit.item.status.tag} />}
        </span>

        <p className={styles.searchLinkDescription}>{hit.description}</p>
      </div>

      <div className={styles.searchThumbnail}>
        {imageUrl && (
          <Image
            src={imageUrl}
            decoding="sync"
            width="96"
            height="96"
            alt={`${hit.item?.heading} thumbnail`}
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
