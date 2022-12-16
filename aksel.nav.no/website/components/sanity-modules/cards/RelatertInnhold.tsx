import { BodyShort, Heading } from "@navikt/ds-react";
import cl from "classnames";
import NextLink from "next/link";
import React from "react";
import { logNav } from "@/components";
import { SanityT } from "@/lib";
import { withErrorBoundary } from "@/error-boundary";

const RelatertInnhold = ({
  node,
}: {
  node: SanityT.Schema.relatert_innhold;
}): JSX.Element => {
  if (!node || node?.lenker?.length === 0) {
    return null;
  }

  const getHref = (x: any): string =>
    x?.intern ? `/${x.intern_lenke}` : x.ekstern_link;

  const getTag = (x: any): string => {
    return new URL(x.ekstern_link).hostname.replace("www.", "");
  };

  return (
    <div
      className={cl(
        "relatedCard",
        "mb-8 max-w-4xl gap-4",
        "xs:grid-cols-2 grid w-full"
      )}
    >
      {node.lenker.map((x) => (
        <NextLink href={getHref(x)} passHref key={x._key}>
          <a
            onClick={(e) =>
              logNav(
                "relatert-innhold",
                window.location.pathname,
                e.currentTarget.getAttribute("href")
              )
            }
            className="algolia-ignore-index shadow-small focus-visible:shadow-focus bg-surface-default ring-border-subtle group grid rounded border-2 border-transparent px-4 py-3 ring-1 focus:outline-none"
          >
            <Heading
              as="span"
              size="xsmall"
              className="underline group-hover:no-underline"
            >
              {x.title}
            </Heading>
            <BodyShort
              size="small"
              className="text-text-subtle mt-1 self-end break-words"
              as="span"
            >
              {x.ekstern_domene ? <>{getTag(x)}</> : `aksel.nav.no`}
            </BodyShort>
          </a>
        </NextLink>
      ))}
    </div>
  );
};

export default withErrorBoundary(RelatertInnhold, "RelatertInnhold");
