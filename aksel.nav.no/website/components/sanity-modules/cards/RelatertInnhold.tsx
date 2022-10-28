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
        "grid w-full xs:grid-cols-2"
      )}
    >
      {node.lenker.map((x) => (
        <div
          key={x._key}
          className="relatert-kort algolia-ignore-index group relative cursor-pointer rounded border-2 border-transparent bg-white px-4 py-3 shadow-small ring-1 ring-gray-900/10 only-of-type:col-span-2 focus-within:border-focus focus-within:outline-none hover:shadow-medium"
        >
          <NextLink href={getHref(x)} passHref>
            <Heading
              size="xsmall"
              as="a"
              onClick={(e) =>
                logNav(
                  "relatert-innhold",
                  window.location.pathname,
                  e.currentTarget.getAttribute("href")
                )
              }
              className="underline after:absolute after:inset-0 focus:text-link focus:outline-none group-hover:text-link group-hover:no-underline group-focus:no-underline"
            >
              {x.title}
            </Heading>
          </NextLink>

          <BodyShort
            size="small"
            className="mt-1 self-end break-words text-text-muted"
          >
            {x.ekstern_domene ? <>{getTag(x)}</> : `aksel.nav.no`}
          </BodyShort>
          {/*   <style>{`
          .relatert-kort{
            background-color: var(--navds-global-color-gray-50);
            border: 1px solid var(--navds-global-color-blue-300);
            box-shadow: none;
          }
          .aksel-artikkel .relatert-kort{
            background-color: white;
          }`}</style> */}
        </div>
      ))}
    </div>
  );
};

export default withErrorBoundary(RelatertInnhold, "RelatertInnhold");
