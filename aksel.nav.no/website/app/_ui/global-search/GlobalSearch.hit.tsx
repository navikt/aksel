"use client";

import cl from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Heading, Show } from "@navikt/ds-react";
import { Tag } from "@/cms/frontpage-blocks/latest-articles/Tag";
import { urlFor } from "@/sanity/interface";
import { StatusTag } from "@/web/StatusTag";
import { SearchHitT, SearchResultPageTypesT } from "./GlobalSearch.config";

function GlobalSearchLink(props: {
  hit: SearchHitT | Omit<SearchHitT, "score" | "anchor">;
  tag?: Partial<SearchResultPageTypesT>;
}) {
  const { hit } = props;

  const href =
    "anchor" in hit && hit.anchor
      ? `/${hit.item.slug}#${hit.anchor}`
      : `/${hit.item.slug}`;

  /* TODO: We now do this with data-layout="simple" */
  const simple = false;

  return (
    <li
      className={cl(
        "relative flex scroll-my-10 items-center justify-between gap-3 border-b border-border-subtle px-2 last-of-type:border-b-0 has-[+_*_:focus-visible]:border-b-transparent has-[:focus-visible]:border-b-transparent",
      )}
    >
      <div className="w-full px-2 py-3">
        <span
          className={cl({
            "flex flex-col gap-1 md:flex-row md:justify-between md:gap-4":
              simple,
            "flex items-center gap-2": !simple,
          })}
        >
          <Link
            href={href}
            data-umami-event="navigere"
            data-umami-event-kilde="global sok"
            className={cl(
              "group scroll-my-32 break-words text-xl font-semibold underline hover:decoration-[3px] focus:outline-none",
              "after:absolute after:inset-0 after:rounded-lg after:ring-inset focus-visible:after:ring-[3px] focus-visible:after:ring-border-focus",
            )}
          >
            {hit.item.heading}
          </Link>

          {simple ? (
            <Tag
              type={hit.item._type}
              size="xsmall"
              text={hit.item.tema ? hit.item.tema[0] : undefined}
              inline
              aria-hidden
            />
          ) : (
            hit.item?.status?.tag && (
              <StatusTag status={hit.item.status.tag} aria-hidden />
            )
          )}
        </span>

        <Show above="md" asChild>
          <p className="line-clamp-2">{hit.description}</p>
        </Show>
      </div>

      {!simple && (
        <div className="hidden aspect-square w-24 sm:block">
          {hit.item?.status?.bilde && (
            <Image
              src={urlFor(hit.item.status.bilde).auto("format").url()}
              decoding="sync"
              width="96"
              height="96"
              layout="fixed"
              objectFit="contain"
              alt={hit.item?.heading + " thumbnail"}
              aria-hidden
            />
          )}
        </div>
      )}
    </li>
  );
}

function GlobalSearchHitCollection({
  heading,
  hits,
  tag,
}: {
  heading?: React.ReactNode;
  hits: SearchHitT[];
  tag?: Partial<SearchResultPageTypesT>;
}) {
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
      <ul className="px-2 md:px-6">
        {hits.map((x, xi) => (
          <GlobalSearchLink key={xi} hit={x} tag={tag} />
        ))}
      </ul>
    </div>
  );
}

export { GlobalSearchHitCollection };
