import { urlFor } from "@/lib";
import { Tag } from "@navikt/ds-react";
import cl from "classnames";
import Image from "next/legacy/image";
import NextLink from "next/link";
import { SearchHit } from "lib/types/search";
import { StatusTag } from "components/website-modules/StatusTag";
import { isNew } from "@/utils";

export function Hit({
  hit,
  query,
  index,
  logSuccess,
}: {
  hit: SearchHit;
  query: string;
  index: number;
  logSuccess: (index: number, url: string) => void;
}) {
  if (hit.item._type === "icon") {
    return;
  }

  return (
    <li
      className={cl(
        "focus-within:shadow-focus border-border-subtle group relative flex cursor-pointer scroll-mt-12 items-center justify-between gap-4 rounded border-b px-2 last-of-type:border-b-0 focus-within:z-10 hover:bg-gray-100"
      )}
    >
      <div className="px-2 py-6">
        <NextLink href={`/${hit.item.slug}`} passHref>
          <a
            onClick={() => logSuccess(index, `/${(hit.item as any).slug}`)}
            className="flex items-center gap-2 text-xl font-semibold after:absolute after:inset-0 focus:outline-none"
          >
            <span className="group-hover:underline">
              {highlightStr(hit.item.heading, query)}
            </span>
            <StatusTag status={hit?.item?.status?.tag} aria-hidden />
          </a>
        </NextLink>
        <span className="font-regular text-text-subtle text-lg" aria-hidden>
          {hit.highlight.shouldHightlight ? (
            <div>{highlightStr(hit.highlight.description, query)}</div>
          ) : (
            <div>{hit.highlight.description}</div>
          )}
        </span>
        <span className="mt-4 flex gap-2 empty:mt-0">
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

export function IconHit({
  hit,
  query,
  index,
  logSuccess,
}: {
  hit: SearchHit;
  query: string;
  index: number;
  logSuccess: (index: number, url: string) => void;
}) {
  if (hit.item._type !== "icon") {
    return;
  }

  return (
    <li
      className={cl(
        "focus-within:shadow-focus border-border-subtle group relative flex cursor-pointer scroll-mt-12 items-center justify-between gap-4 rounded border-b px-2 last-of-type:border-b-0 focus-within:z-10 hover:bg-gray-100"
      )}
    >
      <div className="px-2 py-2">
        <NextLink
          href={`/grunnleggende/staesj/ikoner?icon=${hit.item.name}`}
          passHref
        >
          <a
            onClick={() => logSuccess(index, `/${(hit.item as any).name}`)}
            className="flex items-center gap-2 text-xl font-semibold after:absolute after:inset-0 focus:outline-none"
          >
            <span className="group-hover:underline">
              {highlightStr(hit.item.name, query)}
            </span>
            {isNew(hit.item?.created_at ?? "") && (
              <Tag variant="info" size="small" aria-hidden>
                Ny
              </Tag>
            )}
          </a>
        </NextLink>
      </div>

      <div className="hidden aspect-square w-16 place-items-center sm:grid">
        <Image
          src={`https://raw.githubusercontent.com/navikt/Designsystemet/master/%40navikt/icons/svg/${hit.item.name}.svg`}
          decoding="sync"
          width="24px"
          height="24px"
          layout="fixed"
          objectFit="contain"
          alt={hit.item.name + " thumbnail"}
          aria-hidden
        />
      </div>
    </li>
  );
}

function splitStr(str: string, query: string) {
  const regexStr = query.split(" ").join("|");
  return str.split(new RegExp(`(${regexStr})`, "gi"));
}

function highlightStr(str: string, query: string) {
  return (
    <span>
      {splitStr(str, query).map((part, i) => (
        <span
          key={i}
          className={cl({
            "text-text-default bg-teal-200/80": query
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
