"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Heading } from "@navikt/ds-react";
import { urlForImage } from "@/app/_sanity/utils";
import {
  useGlobalSearch,
  useGlobalSearchResults,
} from "@/app/_ui/global-search/GlobalSearch.context";
import type {
  SearchHitT,
  SearchResultPageTypesT,
} from "@/app/_ui/global-search/server/GlobalSearch.config";
import { doctypeToColorRole } from "@/app/_ui/theming/theme-config";
import { StatusTag } from "@/web/StatusTag";
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
        {searchHits.map((x, xi) => (
          <GlobalSearchLink key={xi} hit={x} tag={tag} />
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
            as={Link}
            href={href}
            onNavigate={() => {
              context.closeSearch();
              clearDebounce();
            }}
            className={styles.searchLink}
            prefetch={false}
          >
            {hit.item.heading}
          </Heading>

          {hit.item?.status?.tag && (
            <StatusTag status={hit.item.status.tag} aria-hidden />
          )}
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
            alt={hit.item?.heading + " thumbnail"}
            aria-hidden
          />
        )}
      </div>
    </li>
  );
}

export { GlobalSearchHitCollection };
