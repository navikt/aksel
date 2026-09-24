"use client";

import Image from "next/image";
import React, { useEffect, useId, useRef } from "react";
import { Events } from "@navikt/analytics-types";
import { Heading, Tag } from "@navikt/ds-react";
import {
  getHitHref,
  getOptionId,
  useGlobalSearch,
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
  startIndex,
  tag,
}: {
  heading: React.ReactNode;
  searchHits: SearchHitT[];
  /* Index of the first hit in the flattened hit list. */
  startIndex: number;
  tag?: Partial<SearchResultPageTypesT>;
}) {
  const headingId = useId();

  if (!searchHits || searchHits.length === 0) {
    return null;
  }

  return (
    // biome-ignore lint/a11y/useSemanticElements: Listbox groups can't be fieldsets
    <div role="group" aria-labelledby={headingId}>
      <Heading
        as="div"
        id={headingId}
        className={styles.searchSectionHeading}
        size="small"
        data-color={doctypeToColorRole[tag ?? ""] ?? "neutral"}
      >
        {heading}
      </Heading>
      {searchHits.map((x, i) => (
        <GlobalSearchOption
          key={getHitHref(x)}
          hit={x}
          index={startIndex + i}
        />
      ))}
    </div>
  );
}

function GlobalSearchOption({
  hit,
  index,
}: {
  hit: SearchHitT;
  index: number;
}) {
  const { closeSearch, activeIndex, activeSource, setActiveIndex } =
    useGlobalSearch();
  const optionRef = useRef<HTMLAnchorElement>(null);

  const href = getHitHref(hit);
  const optionId = getOptionId(index);
  const isActive = activeIndex === index;

  useEffect(() => {
    if (isActive && activeSource === "keyboard") {
      optionRef.current?.scrollIntoView({ block: "nearest" });
    }
  }, [isActive, activeSource]);

  return (
    <NextLink
      ref={optionRef}
      id={optionId}
      href={href}
      role="option"
      aria-selected={isActive}
      aria-describedby={hit.description ? `${optionId}-description` : undefined}
      tabIndex={-1}
      data-virtual-focus={isActive}
      className={styles.searchOption}
      prefetch={false}
      /* Keeps real focus in the input, also after Cmd/Ctrl+click. */
      onMouseDown={(event) => event.preventDefault()}
      onMouseMove={() => {
        if (!isActive) {
          setActiveIndex(index, "pointer");
        }
      }}
      onClick={() => trackSearchHitNavigation(hit.heading, href)}
      onNavigate={closeSearch}
    >
      <span className={styles.searchOptionText}>
        <span className={styles.searchOptionHeading}>
          <Heading size="small" as="span" className={styles.searchOptionTitle}>
            {hit.heading}
          </Heading>{" "}
          {hit.statusTag && <StatusTag status={hit.statusTag} />}
        </span>

        {hit.description && (
          <span
            id={`${optionId}-description`}
            className={styles.searchOptionDescription}
            aria-hidden
          >
            {hit.description}
          </span>
        )}
      </span>

      <span className={styles.searchThumbnail}>
        {hit.thumbnail && (
          <Image
            src={hit.thumbnail}
            decoding="sync"
            width="96"
            height="96"
            alt=""
          />
        )}
      </span>
    </NextLink>
  );
}

function trackSearchHitNavigation(heading: string, href: string) {
  umamiTrack(Events.NAVIGERE, {
    lenketekst: heading,
    destinasjon: href,
    lenkegruppe: "globalt søk",
  });
}

const StatusTag = ({ status }: { status: string }) => {
  switch (status) {
    case "preview":
      return (
        <Tag size="small" data-color="meta-purple">
          Preview
        </Tag>
      );
    case "beta":
      return (
        <Tag size="small" data-color="meta-purple">
          Beta
        </Tag>
      );
    case "new":
      return (
        <Tag data-color="info" size="small">
          Ny
        </Tag>
      );
    case "deprecated":
      return (
        <Tag data-color="neutral" size="small">
          Avviklet
        </Tag>
      );
    default:
      return null;
  }
};

export { GlobalSearchHitCollection, trackSearchHitNavigation };
