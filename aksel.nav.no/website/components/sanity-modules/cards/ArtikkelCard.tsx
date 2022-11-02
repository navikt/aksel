import { getTemaSlug, SanityT } from "@/lib";
import { BodyShort, Detail, Heading } from "@navikt/ds-react";
import NextLink from "next/link";
import { abbrName, dateStr, logNav } from "../..";

export const ArtikkelCard = ({
  slug,
  source,
  heading,
  ingress,
  contributor,
  _updatedAt,
}: Partial<
  (SanityT.Schema.aksel_artikkel | SanityT.Schema.aksel_blogg) & {
    slug: string;
    tema: string[];
    source?: string;
    contributor: string | null;
  }
>) => {
  return (
    <NextLink
      href={{
        pathname: `/${slug}`,
        query: {
          ...(source ? { tema: getTemaSlug(source) } : {}),
        },
      }}
      passHref
    >
      <a
        onClick={(e) =>
          logNav(
            "artikkel-kort",
            window.location.pathname,
            e.currentTarget.getAttribute("href")
          )
        }
        className="shadow-small hover:shadow-medium focus-visible:shadow-focus group relative rounded bg-white p-5 pb-16 ring-1 ring-gray-900/10 focus:outline-none "
      >
        <Heading
          level="2"
          size="small"
          className="text-deepblue-700 group-hover:underline"
        >
          {heading}
        </Heading>
        {ingress && <BodyShort className="mt-2 ">{ingress}</BodyShort>}
        <span className="absolute bottom-5 flex gap-2">
          {contributor && <Detail as="span">{abbrName(contributor)}</Detail>}
          {contributor && (
            <Detail as="span" className="text-text-muted">
              —
            </Detail>
          )}
          <Detail as="span" className="text-text-muted">
            {dateStr(_updatedAt)}
          </Detail>
        </span>
      </a>
    </NextLink>
  );
};
