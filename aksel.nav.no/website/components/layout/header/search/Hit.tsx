import { urlFor } from "@/sanity/interface";
import { SearchHitT, searchOptions } from "@/types";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import { Chips } from "@navikt/ds-react";
import cl from "clsx";
import { Tag } from "components/sanity-modules/frontpage-blocks/Tag";
import { StatusTag } from "components/website-modules/StatusTag";
import Image from "next/legacy/image";
import { default as Link, default as NextLink } from "next/link";
import { forwardRef, useContext } from "react";
import { SearchContext, SearchLoggingContext } from "./providers";
import { highlightMatches, highlightStr } from "./utils";

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

const highlightedHeadings = ["eksempler", "props", "tokens", "retningslinjer"];

function HeadingLinks({
  hit,
  index,
}: {
  hit: SearchHitT | Omit<SearchHitT, "score" | "anchor">;
  index: number;
}) {
  const { logSuccess } = useContext(SearchLoggingContext);

  const Description = () => {
    if (hit.matches[0].key !== "heading") {
      return highlightMatches(hit.matches[0]);
    }

    return (
      <span className="font-regular text-text-subtle max-w-full text-lg">
        {hit.description}
      </span>
    );
  };

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
