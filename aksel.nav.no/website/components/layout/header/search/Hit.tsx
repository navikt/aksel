import { urlFor } from "@/sanity/interface";
import { SearchHitT } from "@/types";
import { Chips } from "@navikt/ds-react";
import cl from "clsx";
import { SearchContext, SearchResultContext } from "./providers";
import { StatusTag } from "components/website-modules/StatusTag";
import Image from "next/legacy/image";
import NextLink from "next/link";
import { forwardRef, useContext } from "react";

export const Hit = forwardRef<
  HTMLLIElement,
  {
    hit: SearchHitT;
    index: number;
  }
>(({ hit, index }, ref) => {
  const { query } = useContext(SearchContext);
  const { logSuccess } = useContext(SearchResultContext);
  return (
    <li
      ref={ref}
      className={cl(
        "border-border-subtle relative flex items-center justify-between gap-4 rounded border-b px-2 last-of-type:border-b-0"
      )}
    >
      <div className="px-2 py-6">
        <span className="flex items-center gap-2">
          <NextLink
            href={`/${hit.item.slug}${hit.anchor ? `#h${hit.anchor}` : ""}`}
            onClick={() => logSuccess(index, `/${(hit.item as any).slug}`)}
            className="focus-visible:shadow-focus focus-visible:bg-border-focus focus-visible:text-text-on-action group text-xl font-semibold focus:outline-none"
          >
            <span className="group-hover:underline">
              {highlightStr(hit.item.heading, query)}
            </span>
          </NextLink>
          <StatusTag status={hit?.item?.status?.tag} aria-hidden />
        </span>

        <HeadingLinks hit={hit} />
      </div>

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

const highlightedHeadings = ["eksempler", "props", "tokens"];

function HeadingLinks({ hit }: { hit: SearchHitT }) {
  const Description = () => (
    <span className="font-regular text-text-subtle text-lg" aria-hidden>
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
              <Chips.Toggle
                key={x.text}
                variant="neutral"
                as="a"
                href={`/${hit.item.slug}${`#h${x.id}`}`}
              >{`#${x.text}`}</Chips.Toggle>
            ))}
        </Chips>
      </>
    );
  }

  return <Description />;
}
