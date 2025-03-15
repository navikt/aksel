"use client";

import cl from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Heading } from "@navikt/ds-react";
import { Tag } from "@/cms/frontpage-blocks/latest-articles/Tag";
import { urlFor } from "@/sanity/interface";
import { StatusTag } from "@/web/StatusTag";
import { SearchHitT, SearchResultPageTypesT } from "./GlobalSearch.config";
import styles from "./GlobalSearch.module.css";

function GlobalSearchHitCollection({
  heading,
  searchHits,
  tag,
}: {
  heading?: React.ReactNode;
  searchHits: SearchHitT[];
  tag?: Partial<SearchResultPageTypesT>;
}) {
  if (!searchHits || searchHits.length === 0) {
    return null;
  }

  return (
    <div>
      {heading && tag && (
        <h2
          className={cl("top-0 z-10 p-2 px-6 md:sticky md:px-10", {
            "bg-deepblue-50": ["komponent_artikkel", "ds_artikkel"].includes(
              tag,
            ),
            "bg-violet-50": ["aksel_prinsipp", "aksel_standalone"].includes(
              tag,
            ),
            "bg-teal-50": tag === "aksel_artikkel",
            "bg-pink-50": tag === "aksel_blogg",
          })}
        >
          <Tag hTag="span" type={tag} size="small" inline />
        </h2>
      )}
      {heading && !tag && (
        <Heading
          className="top-0 z-10 bg-surface-subtle p-2 px-6 md:sticky md:px-10"
          size="small"
          level="2"
        >
          {heading}
        </Heading>
      )}
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
