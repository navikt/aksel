import cl from "clsx";
import Link from "next/link";
import { FileFillIcon, TagFillIcon } from "@navikt/aksel-icons";
import { BodyLong, Detail, Heading } from "@navikt/ds-react";
import ErrorBoundary from "@/error-boundary";
import { AnimatedChevron } from "@/web/AnimatedChevron";

type GpArticleCardProps = {
  children: React.ReactNode;
  href: string;
  innholdstype?: string;
  undertema?: string;
  description?: string;
  date?: string;
};

function GpArticleCard({
  href,
  children,
  innholdstype,
  undertema,
  description,
  date,
}: GpArticleCardProps) {
  return (
    <div className="group relative flex flex-col gap-1 rounded-lg bg-surface-default p-4 pb-3 text-text-default shadow-xsmall hover:shadow-small has-[:focus-visible]:shadow-focus md:p-5 md:pb-4">
      <Link
        href={`/${href}`}
        className="peer after:absolute after:inset-0 after:z-10 after:rounded-lg focus:outline-none"
      >
        <Heading
          size="small"
          as="h3"
          className="text-aksel-heading underline group-hover:no-underline"
        >
          {children}
        </Heading>
      </Link>
      {date && (
        <Detail as="time" textColor="subtle" uppercase>
          {date}
        </Detail>
      )}

      {description && (
        <BodyLong className="mt-1 line-clamp-2">{description}</BodyLong>
      )}
      <div
        className={cl(
          "mt-auto flex h-fit items-end justify-between gap-2 text-deepblue-700",
          {
            "pt-5": description,
          },
        )}
      >
        <div className="flex flex-wrap gap-x-3">
          {undertema && (
            <div className="flex items-center gap-05 text-teal-700">
              <TagFillIcon aria-hidden fontSize="1rem" />
              <Detail weight="semibold" as="span">
                {undertema}
              </Detail>
            </div>
          )}
          {innholdstype && (
            <div className="flex items-center gap-05 text-violet-600">
              <FileFillIcon aria-hidden fontSize="1rem" />
              <Detail weight="semibold" as="span">
                {innholdstype}
              </Detail>
            </div>
          )}
        </div>

        <AnimatedChevron />
      </div>
    </div>
  );
}

export default function Component(props: GpArticleCardProps) {
  return (
    <ErrorBoundary boundaryName="GpArticleCard">
      <GpArticleCard {...props} />
    </ErrorBoundary>
  );
}
