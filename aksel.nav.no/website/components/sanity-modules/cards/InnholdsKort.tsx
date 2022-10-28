import { SanityT } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { logNav } from "@/utils";
import { Heading } from "@navikt/ds-react";
import NextLink from "next/link";

export const InnholdsKort = ({
  node,
}: {
  node: SanityT.Schema.innholdskort & { _key: string; lenke: string };
}) => {
  if (!node.title || !node.body || !node.lenke) {
    return null;
  }

  return (
    <article className="group relative mb-7 rounded-lg bg-white p-4 shadow-small ring-1 ring-gray-900/10 last-of-type:mb-18 focus-within:ring focus-within:ring-focus hover:shadow-medium xs:p-8">
      <Heading
        spacing
        size="small"
        level="3"
        id={node._key}
        className="algolia-index-lvl3 scroll-mt-28 text-deepblue-500 focus:outline-none group-hover:underline"
      >
        <NextLink href={`/${node?.lenke}`} passHref>
          <a
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
          </a>
        </NextLink>
      </Heading>
      <SanityBlockContent blocks={node.body} noLastMargin />
    </article>
  );
};
