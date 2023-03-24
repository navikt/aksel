import { withErrorBoundary } from "@/error-boundary";
import { urlFor } from "@/lib";
import { AkselTemaT } from "@/types";
import { logNav } from "@/utils";
import { BodyShort } from "@navikt/ds-react";
import cl from "clsx";
import Image from "next/legacy/image";
import NextLink from "next/link";

const GodPraksisCard = ({ node }: { node: AkselTemaT }) => {
  if (
    !node?.pictogram ||
    !node?.slug?.current ||
    !node?.title ||
    !node?.refCount
  ) {
    return null;
  }

  return (
    <li className="ring-border-subtle bg-surface-default hover:shadow-small focus-within:ring-border-focus relative grid rounded-lg p-6 ring-1  focus-within:ring-[3px]">
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
      <NextLink
        href={`/god-praksis/${node.slug.current}`}
        passHref
        onClick={(e) =>
          logNav(
            "card",
            window.location.pathname,
            e.currentTarget.getAttribute("href")
          )
        }
        className="navds-heading--medium text-deepblue-700 navds-heading  mb-4 no-underline after:absolute after:inset-0 after:rounded-lg focus:outline-none group-hover:underline"
      >
        {node.title}
      </NextLink>
      <BodyShort className={cl("mb-2 lg:mb-6")}>{node.oppsummering}</BodyShort>
      <BodyShort size="small" className="text-text-subtle">
        {node.refCount === 1 ? "1 ARTIKKEL" : `${node.refCount} ARTIKLER`}
      </BodyShort>
    </li>
  );
};

export default withErrorBoundary(GodPraksisCard, "GodPraksisCard");
