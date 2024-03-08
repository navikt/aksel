import cl from "clsx";
import Link from "next/link";
import {
  ChevronRightIcon,
  FileFillIcon,
  TagFillIcon,
} from "@navikt/aksel-icons";
import { BodyLong, Detail, Heading } from "@navikt/ds-react";

type GpArticleCardProps = {
  children: React.ReactNode;
  href: string;
  innholdstype?: string;
  undertema?: string;
  description?: string;
  publishedAt?: string;
};

function GpArticleCard({
  href,
  children,
  innholdstype,
  undertema,
  description,
  publishedAt,
}: GpArticleCardProps) {
  return (
    <Link
      href={`/${href}`}
      className="group flex flex-col gap-1 rounded-lg bg-surface-default p-4 pb-3 text-text-default shadow-xsmall outline-none hover:shadow-small focus-visible:shadow-focus md:p-5 md:pb-5"
    >
      <Heading
        size="small"
        as="span"
        className="text-aksel-heading underline group-hover:no-underline"
      >
        {children}
      </Heading>
      {publishedAt && (
        <Detail as="span" textColor="subtle" uppercase>
          {publishedAt}
        </Detail>
      )}

      {description && (
        <BodyLong className="mt-1 line-clamp-2">{description}</BodyLong>
      )}
      <div
        className={cl("mt-auto flex h-fit justify-between", {
          "pt-5": !!description,
        })}
      >
        <div className="flex flex-wrap gap-3">
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
        <ChevronRightIcon aria-hidden fontSize="1.5rem" />
      </div>
    </Link>
  );
}

export default GpArticleCard;
