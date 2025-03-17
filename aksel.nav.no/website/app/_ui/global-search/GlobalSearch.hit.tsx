"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Heading } from "@navikt/ds-react";
import { urlFor } from "@/sanity/interface";
import { StatusTag } from "@/web/StatusTag";
import { SearchHitT, SearchResultPageTypesT } from "./GlobalSearch.config";
import styles from "./GlobalSearch.module.css";

/* TODO: Move this to global Aksel-config */
const doctypeToRole: Record<SearchResultPageTypesT, string> = {
  ds_artikkel: "brand-blue",
  komponent_artikkel: "brand-blue",
  templates_artikkel: "brand-blue",
  aksel_artikkel: "teal",
  aksel_blogg: "pink",
  aksel_prinsipp: "neutral",
  aksel_standalone: "neutral",
};

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
        data-color-role={doctypeToRole[tag ?? ""] ?? "neutral"}
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
  const { hit } = props;

  const href =
    "anchor" in hit && hit.anchor
      ? `/${hit.item.slug}#${hit.anchor}`
      : `/${hit.item.slug}`;

  return (
    <li className={styles.searchLinkLi}>
      <div className={styles.searchLinkText}>
        <span className={styles.searchLinkHeading}>
          <Heading
            size="small"
            as={Link}
            href={href}
            data-umami-event="navigere"
            data-umami-event-kilde="global sok"
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
        {hit.item?.status?.bilde && (
          <Image
            src={urlFor(hit.item.status.bilde).auto("format").url()}
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
