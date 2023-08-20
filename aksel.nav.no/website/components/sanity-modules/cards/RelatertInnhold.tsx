import { logNav } from "@/components";
import { withErrorBoundary } from "@/error-boundary";
import { RelatertInnholdT } from "@/types";
import { BodyShort, Heading } from "@navikt/ds-react";
import NextLink from "next/link";

const RelatertInnhold = ({ node }: { node: RelatertInnholdT }) => {
  if (!node || node?.lenker?.length === 0) {
    return null;
  }

  const getHref = (x: any): string =>
    x?.intern ? `/${x.intern_lenke}` : x.ekstern_link;

  const getTag = (x: any): string => {
    return new URL(x.ekstern_link).hostname.replace("www.", "");
  };

  return (
    <div className="mb-8 grid w-full max-w-4xl gap-4 sm:grid-cols-2">
      {node.lenker.map((x) => (
        <NextLink
          href={getHref(x)}
          passHref
          key={x._key}
          onClick={(e) =>
            logNav(
              "relatert-innhold",
              window.location.pathname,
              e.currentTarget.getAttribute("href")
            )
          }
          className="toc-ignore shadow-xsmall hover:shadow-small focus-visible:shadow-focus bg-surface-default group grid rounded-lg border-2 border-transparent px-4 py-3 focus:outline-none"
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
        </NextLink>
      ))}
    </div>
  );
};

export default withErrorBoundary(RelatertInnhold, "RelatertInnhold");
