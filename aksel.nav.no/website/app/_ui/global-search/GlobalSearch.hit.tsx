"use client";

import cl from "clsx";
import Image from "next/image";
import Link from "next/link";
import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { Heading, Show } from "@navikt/ds-react";
import { Tag } from "@/cms/frontpage-blocks/latest-articles/Tag";
import { allArticleDocuments } from "@/sanity/config";
import { urlFor } from "@/sanity/interface";
import { StatusTag } from "@/web/StatusTag";
import { SearchHitT, SearchResultPageTypesT } from "./GlobalSearch.types";

const Hit = forwardRef<
  HTMLLIElement,
  {
    hit: SearchHitT | Omit<SearchHitT, "score" | "anchor">;
    index: number;
    simple?: boolean;
    tag?: Partial<SearchResultPageTypesT>;
  }
>(({ hit, simple = false }, ref) => {
  const href =
    "anchor" in hit && hit.anchor
      ? `/${hit.item.slug}#${hit.anchor}`
      : `/${hit.item.slug}`;

  return (
    <li
      ref={ref}
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
});

/* TODO: handle double import */
const searchOptions: {
  [K in (typeof allArticleDocuments)[number]]: {
    display: string;
    index: number;
    hidden?: boolean;
  };
} = {
  komponent_artikkel: { display: "Komponenter", index: 0 },
  aksel_artikkel: { display: "God praksis", index: 1 },
  ds_artikkel: { display: "Grunnleggende", index: 2 },
  templates_artikkel: { display: "Mønster og Maler", index: 3 },
  aksel_blogg: { display: "Blogg", index: 4 },
  aksel_prinsipp: { display: "Prinsipper", index: 5 },
  aksel_standalone: { display: "Unike sider", index: 6, hidden: true },
};

function GlobalSearchHitCollectionMapper({
  groups,
  startIndex,
}: {
  groups: Partial<Record<Partial<SearchResultPageTypesT>, SearchHitT[]>>;
  startIndex: number;
}) {
  if (Object.keys(groups).length === 0) {
    return null;
  }

  return (
    <>
      {Object.entries(groups)
        .sort((a, b) => searchOptions[a[0]].index - searchOptions[b[0]].index)
        .map(([key, val], index, arr) => {
          const prev = arr.slice(0, index);
          const total =
            prev.reduce((prev2, cur) => prev2 + cur[1].length, 0) + startIndex;

          return (
            <GlobalSearchHitCollection
              startIndex={total}
              key={key}
              heading={`${searchOptions[key].display} (${val.length})`}
              tag={key as SearchResultPageTypesT}
              hits={val}
            />
          );
        })}
    </>
  );
}

function GlobalSearchHitCollection({
  heading,
  hits,
  startIndex,
  simple = false,
  tag,
}: {
  heading?: React.ReactNode;
  hits: SearchHitT[];
  simple?: boolean;
  startIndex: number;
  tag?: Partial<SearchResultPageTypesT>;
}) {
  const [intersected, setIntersected] = useState(false);
  const item = useRef(null);

  const split = useMemo(() => {
    if (hits.length <= (simple ? 20 : 5)) {
      return { initial: hits, lazy: null };
    }

    return { initial: hits.slice(0, 4), lazy: hits.slice(4 + 1) };
  }, [hits, simple]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      entry.isIntersecting && setIntersected(entry.isIntersecting);
    });
    item.current && observer.observe(item.current);
    return () => observer.disconnect();
  }, []);

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
          <Tag hTag="span" type={tag} size="small" inline count={hits.length} />
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
        {split.initial.map((x, xi) => (
          <Hit
            key={xi}
            hit={x}
            index={startIndex + xi}
            ref={xi === split.initial.length - 1 ? item : null}
            simple={simple}
            tag={tag}
          />
        ))}
        {split.lazy &&
          intersected &&
          split.lazy.map((x, xi) => (
            <Hit
              key={xi}
              hit={x}
              index={startIndex + xi}
              simple={simple}
              tag={tag}
            />
          ))}
      </ul>
    </div>
  );
}

export { GlobalSearchHitCollection, GlobalSearchHitCollectionMapper };
