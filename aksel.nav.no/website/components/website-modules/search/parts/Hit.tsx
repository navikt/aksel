import cl from "clsx";
import Image from "next/legacy/image";
import NextLink from "next/link";
import { forwardRef, useContext } from "react";
import { Show } from "@navikt/ds-react";
import { Tag } from "@/cms/frontpage-blocks/latest-articles/Tag";
import { urlFor } from "@/sanity/interface";
import { SearchHitT, searchOptions } from "@/types";
import { StatusTag } from "@/web/StatusTag";
import { SearchContext, SearchLoggingContext } from "../providers";
import { highlightStr } from "../utils";

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
          <NextLink
            href={href}
            onClick={() => logSuccess(index, `/${hit.item.slug}`)}
            className={cl(
              "group scroll-my-32 break-words text-xl font-semibold underline hover:decoration-[3px] focus:outline-none",
              "after:absolute after:inset-0 after:rounded-lg after:ring-inset focus-visible:after:ring-[3px] focus-visible:after:ring-border-focus",
            )}
          >
            {highlightStr(hit.item.heading, query, tag)}
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
