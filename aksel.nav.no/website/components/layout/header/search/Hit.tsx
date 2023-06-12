import { urlFor } from "@/sanity/interface";
import { SearchHitT } from "@/types";
import { Chips } from "@navikt/ds-react";
import cl from "clsx";
import { SearchContext, SearchResultContext } from "./providers";
import { StatusTag } from "components/website-modules/StatusTag";
import Image from "next/legacy/image";
import NextLink from "next/link";
import { forwardRef, useContext } from "react";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import Link from "next/link";
import { Tag } from "components/sanity-modules/frontpage-blocks/Tag";

export const Hit = forwardRef<
  HTMLLIElement,
  {
    hit: SearchHitT | Omit<SearchHitT, "score" | "anchor">;
    index: number;
    simple?: boolean;
  }
>(({ hit, index, simple = false }, ref) => {
  const { query } = useContext(SearchContext);
  const { logSuccess } = useContext(SearchResultContext);

  const getHref = () => {
    if ("anchor" in hit) {
      return `/${hit.item.slug}${hit?.anchor ? `#h${hit.anchor}` : ""}`;
    }
    return `/${hit.item.slug}`;
  };

  return (
    <li
      ref={ref}
      className={cl(
        "border-border-subtle relative flex scroll-my-10  items-center justify-between gap-3 border-b px-2 last-of-type:border-b-0"
      )}
    >
      <div className="w-full truncate px-2 py-4">
        <span
          className={cl({
            "flex flex-col gap-1": simple,
            "flex items-center gap-2": !simple,
          })}
        >
          <NextLink
            href={getHref()}
            onClick={() => logSuccess(index, `/${(hit.item as any).slug}`)}
            className="focus-visible:shadow-focus focus-visible:bg-border-focus focus-visible:text-text-on-action group scroll-my-32 text-xl font-semibold focus:outline-none"
          >
            <span className="group-hover:underline">
              {highlightStr(hit.item.heading, query)}
            </span>
          </NextLink>
          {simple ? (
            <Tag
              type={hit.item._type}
              size="small"
              text={hit.item.tema ? hit.item.tema[0] : undefined}
              inline
              aria-hidden
            />
          ) : (
            <StatusTag status={hit?.item?.status?.tag} aria-hidden />
          )}
        </span>

        {!simple && <HeadingLinks index={index} hit={hit} />}
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

function splitStr(str: string, query: string) {
  const regexStr = query.toLowerCase().split(" ").join("|");
  return str.split(new RegExp(`(${regexStr})`, "gi"));
}

function highlightStr(str: string, query: string) {
  return (
    <span>
      {splitStr(str, query)
        .filter((x) => !!x)
        .map((part, i) => (
          <span
            key={i}
            className={cl({
              "text-text-default group-focus-visible:text-text-on-action bg-teal-200/80 group-focus-visible:bg-transparent":
                query
                  .split(" ")
                  .map((x) => x.toLowerCase())
                  .includes(part.toLowerCase()),
            })}
          >
            {part}
          </span>
        ))}
    </span>
  );
}

const highlightedHeadings = ["eksempler", "props", "tokens", "retningslinjer"];

function HeadingLinks({
  hit,
  index,
}: {
  hit: SearchHitT | Omit<SearchHitT, "score" | "anchor">;
  index: number;
}) {
  const { logSuccess } = useContext(SearchResultContext);

  const Description = () => (
    <span
      className="font-regular text-text-subtle max-w-full text-lg"
      aria-hidden
    >
      {hit.description}
    </span>
  );
  if (hit.item._type === "komponent_artikkel") {
    return (
      <>
        <Description />
        <Chips className="mt-3" size="small">
          {hit.item.lvl2
            .filter(
              (x) =>
                !!x.id && highlightedHeadings.includes(x.text.toLowerCase())
            )
            .map((x) => (
              <Link
                prefetch={false}
                key={x.text}
                href={`/${hit.item.slug}${`#h${x.id}`}`}
                onClick={() =>
                  logSuccess(index, `/${(hit.item as any).slug}`, x.text)
                }
                className="min-h-6 bg-surface-neutral-subtle focus-visible:shadow-focus hover:bg-surface-neutral-subtle-hover ring-border-subtle flex items-center justify-center rounded-full px-2 ring-1 ring-inset focus:outline-none"
              >
                <span>{x.text}</span>
                <ChevronRightIcon aria-hidden className="-mr-1" />
              </Link>
            ))}
        </Chips>
      </>
    );
  }

  return <Description />;
}
