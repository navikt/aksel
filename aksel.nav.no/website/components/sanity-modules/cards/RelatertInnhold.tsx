import { logNav } from "@/components";
import { withErrorBoundary } from "@/error-boundary";
import { RelatertInnholdT } from "@/types";
import { NewspaperIcon } from "@navikt/aksel-icons";
import { BodyShort, Heading, Link } from "@navikt/ds-react";
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
    <div className="ring-border-subtle toc-ignore link-color-override bg-surface-subtle my-7 max-w-2xl rounded-lg p-4 ring-1 ring-inset sm:p-6">
      <Heading
        className="override-text-no-max text-text-subtle -ml-[2px] flex items-center gap-2"
        size="small"
        as="p"
        spacing
      >
        <NewspaperIcon fontSize="1.5rem" title="Nyheter" aria-hidden />
        Relevante lenker
      </Heading>
      <ul className="grid gap-3">
        {node.lenker.map((x) => (
          <li key={x._key}>
            <Link
              as={NextLink}
              href={getHref(x)}
              onClick={(e) =>
                logNav(
                  "relatert-innhold",
                  window.location.pathname,
                  e.currentTarget.getAttribute("href")
                )
              }
              className="text-xl font-semibold"
            >
              {x.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

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
