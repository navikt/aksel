import ErrorBoundary from "@/error-boundary";
import { amplitudeLogNavigation } from "@/logging";
import { SanityBlockContent } from "@/sanity-block";
import { InnholdsKortPrinsipperT } from "@/types";
import { Heading } from "@navikt/ds-react";
import NextLink from "next/link";

type InnholdsKortProps = {
  node: InnholdsKortPrinsipperT;
};

const InnholdsKort = ({ node }: InnholdsKortProps) => {
  if (!node.title || !node.body || !node.lenke) {
    return null;
  }

  return (
    <article className="last-of-type:mb-18 focus-within:ring-border-focus shadow-xsmall hover:shadow-small group relative mb-7 rounded-lg bg-white p-4 focus-within:ring sm:p-8">
      <Heading
        spacing
        size="small"
        level="3"
        id={node._key}
        className="text-deepblue-500 scroll-mt-28 underline focus:outline-none group-hover:no-underline"
      >
        <NextLink
          href={`/${node?.lenke}`}
          passHref
          onClick={(e) =>
            amplitudeLogNavigation(
              "prinsipp-kort",

              e.currentTarget.getAttribute("href")
            )
          }
          className="z-10 before:absolute before:inset-0 focus:outline-none"
        >
          {node.title}
        </NextLink>
      </Heading>
      <SanityBlockContent blocks={node.body} />
    </article>
  );
};

export default function Component(props: InnholdsKortProps) {
  return (
    <ErrorBoundary boundaryName="InnholdsKort">
      <InnholdsKort {...props} />
    </ErrorBoundary>
  );
}
