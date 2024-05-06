import cl from "clsx";
import Image from "next/legacy/image";
import { default as NextLink } from "next/link";
import { forwardRef, useContext } from "react";
import { Tag } from "@/cms/frontpage-blocks/latest-articles/Tag";
import { urlFor } from "@/sanity/interface";
import { SearchHitT, searchOptions } from "@/types";
import { StatusTag } from "@/web/StatusTag";
import { SearchContext, SearchLoggingContext } from "../providers";
import { highlightMatches, highlightStr } from "../utils";

export const Hit = forwardRef<
  HTMLLIElement,
  {
    hit: SearchHitT | Omit<SearchHitT, "score" | "anchor">;
    index: number;
    simple?: boolean;
    tag?: Partial<keyof typeof searchOptions>;
  }
>(({ hit, index, simple = false, tag }, ref) => {
  const { query } = useContext(SearchContext);
  const { logSuccess } = useContext(SearchLoggingContext);

  const href =
    "anchor" in hit && hit.anchor
      ? `/${hit.item.slug}#${hit.anchor}`
      : `/${hit.item.slug}`;

  return (
    <li
      ref={ref}
      className={cl(
        "relative flex scroll-my-10 items-center  justify-between gap-3 border-b border-border-subtle px-2 last-of-type:border-b-0",
      )}
    >
      <div className="w-full truncate px-2 py-3">
        <span
          className={cl({
            "flex flex-col": simple,
            "flex items-center gap-2": !simple,
          })}
        >
          <NextLink
            href={href}
            onClick={() => logSuccess(index, `/${hit.item.slug}`)}
            className="group scroll-my-32 text-xl font-semibold focus:outline-none focus-visible:bg-border-focus focus-visible:text-text-on-action focus-visible:shadow-focus"
          >
            <span className="group-hover:underline">
              {highlightStr(hit.item.heading, query, tag)}
            </span>
          </NextLink>
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

        {!simple && <HeadingLinks hit={hit} />}
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

function HeadingLinks({
  hit,
}: {
  hit: SearchHitT | Omit<SearchHitT, "score" | "anchor">;
}) {
  if (hit.matches && hit.matches?.[0].key !== "heading") {
    return highlightMatches(hit.matches[0]);
  }

  return (
    <span className="max-w-full text-lg font-regular text-text-subtle">
      {hit.description}
    </span>
  );
}
