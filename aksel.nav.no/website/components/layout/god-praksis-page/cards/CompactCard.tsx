import Link from "next/link";
import {
  ChevronRightIcon,
  FileFillIcon,
  TagFillIcon,
} from "@navikt/aksel-icons";
import { Detail, Heading } from "@navikt/ds-react";

type GpHeroCardProps = {
  children: React.ReactNode;
  href: string;
  innholdstype?: string;
  undertema?: string;
};

function GpCompactCard({
  href,
  children,
  innholdstype,
  undertema,
}: GpHeroCardProps) {
  return (
    <Link
      href={`/${href}`}
      className="group grid gap-2 rounded-lg bg-surface-default p-4 pb-3 shadow-xsmall outline-none hover:shadow-small focus-visible:shadow-focus md:p-5 md:pb-5"
    >
      <Heading
        size="small"
        as="span"
        className="text-aksel-heading underline group-hover:no-underline"
      >
        {children}
      </Heading>
      <div className="mt-auto flex h-fit justify-between">
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

export default GpCompactCard;