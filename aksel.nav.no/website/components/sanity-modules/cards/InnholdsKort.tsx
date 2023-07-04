import { withErrorBoundary } from "@/error-boundary";
import { SanityBlockContent } from "@/sanity-block";
import { InnholdsKortPrinsipperT } from "@/types";
import { logNav } from "@/utils";
import { Heading } from "@navikt/ds-react";
import NextLink from "next/link";

const InnholdsKort = ({ node }: { node: InnholdsKortPrinsipperT }) => {
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
            logNav(
              "prinsipp-kort",
              window.location.pathname,
              e.currentTarget.getAttribute("href")
            )
          }
          className="z-10 before:absolute before:inset-0 focus:outline-none"
        >
          {node.title}
        </NextLink>
      </Heading>
      <SanityBlockContent blocks={node.body} noLastMargin />
    </article>
  );
};

export default withErrorBoundary(InnholdsKort, "InnholdsKort");
