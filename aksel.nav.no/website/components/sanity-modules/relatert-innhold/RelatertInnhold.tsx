import NextLink from "next/link";
import { NewspaperIcon } from "@navikt/aksel-icons";
import { Heading, Link } from "@navikt/ds-react";
import ErrorBoundary from "@/error-boundary";
import { amplitudeLogNavigation } from "@/logging";
import { RelatertInnholdT } from "@/types";

type RelatertInnholdProps = {
  node: RelatertInnholdT;
};

const RelatertInnhold = ({ node }: RelatertInnholdProps) => {
  if (!node || !node.lenker || node?.lenker?.length === 0) {
    return null;
  }

  const getHref = (x: any): string =>
    x?.intern ? `/${x.intern_lenke}` : x.ekstern_link;

  return (
    <div className="toc-ignore my-7 max-w-2xl rounded-lg bg-surface-neutral-subtle p-4 ring-1 ring-inset ring-border-subtle dark:bg-gray-800 sm:p-6">
      <Heading
        className="override-text-no-max flex items-center gap-2 text-text-subtle dark:text-text-on-inverted"
        size="small"
        as="p"
        spacing
      >
        <NewspaperIcon fontSize="1.5rem" title="Lenker" aria-hidden />
        {node.title || "Relevante lenker"}
      </Heading>
      <ul className="grid gap-3 pl-8">
        {node.lenker.map((x) => (
          <li key={x._key} className="list-item">
            <Link
              as={NextLink}
              href={getHref(x)}
              onClick={(e) =>
                amplitudeLogNavigation(
                  "relatert-innhold",
                  e.currentTarget.getAttribute("href"),
                )
              }
              className="text-xl font-semibold text-gray-800 dark:text-text-on-inverted"
            >
              {x.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Component(props: RelatertInnholdProps) {
  return (
    <ErrorBoundary boundaryName="RelatertInnhold">
      <RelatertInnhold {...props} />
    </ErrorBoundary>
  );
}
