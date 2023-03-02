import { withErrorBoundary } from "@/error-boundary";
import { SanityT } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { logNav } from "@/utils";
import { Heading } from "@navikt/ds-react";
import NextLink from "next/link";

const InnholdsKort = ({
  node,
}: {
  node: SanityT.Schema.innholdskort & { _key: string; lenke: string };
}) => {
  if (!node.title || !node.body || !node.lenke) {
    return null;
  }

  return (
    <article className="shadow-small last-of-type:mb-18 focus-within:ring-border-focus hover:shadow-medium group relative mb-7 rounded-lg bg-white p-4 ring-1 ring-gray-900/10 focus-within:ring sm:p-8">
      <Heading
        spacing
        size="small"
        level="3"
        id={node._key}
        className="text-deepblue-500 scroll-mt-28 focus:outline-none group-hover:underline"
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
