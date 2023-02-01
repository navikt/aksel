import { urlFor } from "@/lib";
import { Tag } from "@navikt/ds-react";
import cl from "classnames";
import Image from "next/image";
import NextLink from "next/link";
import { SearchHit } from "lib/types/search";

export function Hit({ hit, query }: { hit: SearchHit; query: string }) {
  const hightlightDesc = hit.matches[0].indices
    .map((y) => hit.matches[0].value.slice(y[0], y[1] + 1))
    .filter((x) => x.toLowerCase().includes(query.toLowerCase()));

  const getHightlight = (q: string) => {
    if (hit.matches[0].key === "heading") {
      return <span>{hit?.item.intro ?? hit.item.ingress}</span>;
    }

    const value = hit.matches[0].value;
    const idx = value.toLowerCase().indexOf(q.toLowerCase());
    const clampBefore = Math.max(idx - 20, 0) === 0;
    const clampAfter = Math.min(idx + 20, value.length) === value.length;
    const slice = value.slice(
      Math.max(idx - 50, 0),
      Math.min(idx + 50, value.length)
    );
    let str = "";
    !clampBefore && (str += "...");
    str += slice;
    !clampAfter && (str += "...");

    return highlightStr(str, query);
  };

  /* TODO: Heading utenfor eller innenfor a-tag? */
  return (
    <li
      className={cl(
        "focus-within:shadow-focus border-border-subtle group relative flex cursor-pointer scroll-mt-12 items-center justify-between gap-4 rounded border-b px-2 last-of-type:border-b-0 hover:bg-gray-100"
      )}
    >
      <div className="px-2 py-6">
        <NextLink href={hit.item.slug} passHref>
          <a className="text-xl font-semibold after:absolute after:inset-0 focus:outline-none group-hover:underline">
            <span>{highlightStr(hit.item.heading, query)}</span>
          </a>
        </NextLink>
        {/* TODO: aria-hidden vs after-element med inset-0? Høre med uu */}
        <span className="font-regular text-text-subtle text-lg" aria-hidden>
          {hightlightDesc.length > 0 ? (
            <div>{getHightlight(query)}</div>
          ) : (
            <div>{hit.item?.ingress ?? hit.item?.intro}</div>
          )}
        </span>
        <span className="mt-4 flex gap-2">
          {hit.item?.tema &&
            hit.item?.tema.map((x) => (
              <Tag variant="alt3" size="xsmall" key={x}>
                {x}
              </Tag>
            ))}
        </span>
      </div>

      <div className="hidden aspect-square w-24 sm:block">
        {hit.item?.status?.bilde && (
          <Image
            src={urlFor(hit.item.status.bilde).auto("format").url()}
            decoding="sync"
            width="96px"
            height="96px"
            layout="fixed"
            objectFit="contain"
            alt={hit.item?.heading + " thumbnail"}
            aria-hidden
          />
        )}
      </div>
    </li>
  );
}

function splitStr(str: string, query: string) {
  return str.split(new RegExp(`(${query})`, "gi"));
}

function highlightStr(str: string, query: string) {
  return (
    <span>
      {splitStr(str, query).map((part, i) => (
        <span
          key={i}
          className={cl({
            "text-text-default bg-teal-200/80":
              part.toLowerCase() === query.toLowerCase(),
          })}
        >
          {part}
        </span>
      ))}
    </span>
  );
}
