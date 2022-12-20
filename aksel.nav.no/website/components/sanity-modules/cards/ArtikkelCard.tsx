import { withErrorBoundary } from "@/error-boundary";
import { SanityT } from "@/lib";
import { BodyShort, Detail, Heading } from "@navikt/ds-react";
import NextLink from "next/link";
import { abbrName, dateStr, logNav } from "../..";

const ArtikkelCard = ({
  slug,
  source,
  heading,
  ingress,
  contributor,
  _updatedAt,
  variant = "god-praksis",
  tema,
  level = "2",
}: Partial<
  (SanityT.Schema.aksel_artikkel | SanityT.Schema.aksel_blogg) & {
    slug: string;
    tema: string[];
    source?: string;
    contributor: { title: string } | null;
    variant?: "god-praksis" | "tema";
    level?: "2" | "3" | "4";
  }
>) => {
  return (
    <div className="hover:shadow-small focus-within:ring-border-focus bg-surface-default ring-border-subtle group relative rounded-lg p-5 pb-16 ring-1 focus-within:ring-[3px]">
      <NextLink
        href={{
          pathname: `/${slug}`,
          query: {
            ...(source ? { tema: source } : {}),
          },
        }}
        passHref
      >
        <a
          className="after:absolute after:inset-0 after:z-10 after:rounded-lg focus:outline-none"
          onClick={(e) =>
            logNav(
              "artikkel-kort",
              window.location.pathname,
              e.currentTarget.getAttribute("href")
            )
          }
        >
          <Heading
            level={level}
            size="small"
            className="text-deepblue-700 group-hover:underline"
          >
            {heading}
          </Heading>
        </a>
      </NextLink>
      {ingress && <BodyShort className="mt-2">{ingress}</BodyShort>}
      {variant === "god-praksis" ? (
        <span className="absolute bottom-5 flex gap-2">
          {contributor && (
            <Detail as="span">{abbrName(contributor.title)}</Detail>
          )}
          {contributor && (
            <Detail as="span" className="text-text-subtle">
              —
            </Detail>
          )}
          <Detail as="span" className="text-text-subtle">
            {dateStr(_updatedAt)}
          </Detail>
        </span>
      ) : (
        <>
          {tema?.[0] && (
            <Detail
              as="span"
              uppercase
              className="text-text-subtle absolute bottom-5"
            >
              {tema[0]}
            </Detail>
          )}
        </>
      )}
    </div>
  );
};

export default withErrorBoundary(ArtikkelCard, "ArtikkelCard");
