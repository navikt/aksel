import { logNav } from "@/components";
import { withErrorBoundary } from "@/error-boundary";
import { RelatertInnholdT } from "@/types";
import { NewspaperIcon } from "@navikt/aksel-icons";
import { Heading, Link } from "@navikt/ds-react";
import NextLink from "next/link";

const RelatertInnhold = ({ node }: { node: RelatertInnholdT }) => {
  if (!node || node?.lenker?.length === 0) {
    return null;
  }

  const getHref = (x: any): string =>
    x?.intern ? `/${x.intern_lenke}` : x.ekstern_link;

  return (
    <div className="ring-border-subtle toc-ignore bg-surface-neutral-subtle my-7 max-w-2xl rounded-lg p-4 ring-1 ring-inset sm:p-6">
      <Heading
        className="override-text-no-max text-text-subtle flex items-center gap-2"
        size="small"
        as="p"
        spacing
      >
        <NewspaperIcon fontSize="1.5rem" title="Nyheter" aria-hidden />
        Relevante lenker
      </Heading>
      <ul className="grid gap-3 pl-8">
        {node.lenker.map((x) => (
          <li key={x._key} className="list-item">
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
              className="text-xl font-semibold text-gray-800"
            >
              {x.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withErrorBoundary(RelatertInnhold, "RelatertInnhold");
