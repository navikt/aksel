import { BodyShort } from "@navikt/ds-react";
import cl from "classnames";
import NextLink from "next/link";
import Image from "next/image";
import { logNav } from "@/utils";
import { SanityT, urlFor } from "@/lib";

interface AkselTemaT extends SanityT.Schema.aksel_tema {
  refCount: number;
}

export const GodPraksisCard = ({ node }: { node: AkselTemaT }) => {
  return (
    <li className="ring-border-subtle bg-surface-default hover:shadow-small focus-within:shadow-focus relative grid rounded-lg p-6 ring-1 ring-inset">
      <div className="relative mb-4 h-16 w-16">
        <Image
          src={urlFor(node?.pictogram).auto("format").url()}
          decoding="sync"
          layout="fill"
          objectFit="contain"
          aria-hidden
          priority
        />
      </div>
      <NextLink href={`/god-praksis/${node.slug.current}`} passHref>
        <a
          onClick={(e) =>
            logNav(
              "card",
              window.location.pathname,
              e.currentTarget.getAttribute("href")
            )
          }
          className="navds-heading--medium text-deepblue-700 navds-heading focus-visible:after:shadow-focus mb-4 no-underline after:absolute after:inset-0 after:rounded focus:outline-none group-hover:underline"
        >
          {node.title}
        </a>
      </NextLink>
      <BodyShort className={cl("mb-2 lg:mb-6")}>{node.oppsummering}</BodyShort>
      <BodyShort size="small" className="text-text-subtle">
        {node.refCount} ARTIKLER
      </BodyShort>
    </li>
  );
};
