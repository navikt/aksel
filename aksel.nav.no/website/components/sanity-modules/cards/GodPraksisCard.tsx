import cl from "clsx";
import Image from "next/legacy/image";
import NextLink from "next/link";
import { BodyShort } from "@navikt/ds-react";
import ErrorBoundary from "@/error-boundary";
import { amplitudeLogNavigation } from "@/logging";
import { urlFor } from "@/sanity/interface";
import { AkselTemaT } from "@/types";

type GodPraksisCardProps = {
  node: AkselTemaT;
};

const GodPraksisCard = ({ node }: GodPraksisCardProps) => {
  if (
    !node?.pictogram ||
    !node?.slug?.current ||
    !node?.title ||
    !node?.refCount
  ) {
    return null;
  }

  return (
    <li className="group relative grid rounded-lg bg-surface-default p-6 shadow-xsmall focus-within:ring-[3px] focus-within:ring-border-focus hover:shadow-small">
      <div className="relative mb-4 h-16 w-16">
        <Image
          src={urlFor(node?.pictogram)
            .auto("format")
            .url()}
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
          amplitudeLogNavigation("card", e.currentTarget.getAttribute("href"))
        }
        className="navds-heading--medium navds-heading mb-4  text-deepblue-700 underline after:absolute after:inset-0 after:rounded-lg focus:outline-none group-hover:no-underline"
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

export default function Component(props: GodPraksisCardProps) {
  return (
    <ErrorBoundary boundaryName="GodPraksisCard">
      <GodPraksisCard {...props} />
    </ErrorBoundary>
  );
}
