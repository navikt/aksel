import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import cl from "clsx";
import Image from "next/legacy/image";
import Link from "next/link";
import { HTMLAttributes, forwardRef } from "react";
import { BodyShort, Heading } from "@navikt/ds-react";
import { FallbackPictogram } from "@/layout/god-praksis-page/FallbackPictogram";
import { urlFor } from "@/sanity/interface";
import ErrorBoundary from "@/web/ErrorBoundary";

type GpHeroCardProps = {
  children: React.ReactNode;
  href: string;
  articleCount?: number;
  image?: SanityImageSource;
  compact?: boolean;
} & HTMLAttributes<HTMLAnchorElement>;

const GpHeroCard = forwardRef<HTMLAnchorElement, GpHeroCardProps>(
  ({ href, articleCount, children, image, compact = false, ...rest }, ref) => {
    const imageUrl = urlFor(image)?.auto("format").url();
    return (
      <Link
        ref={ref}
        href={`/${href}`}
        className={cl(
          "group flex gap-2 rounded-lg bg-surface-default shadow-xsmall outline-none hover:shadow-small focus-visible:shadow-focus aria-[current]:bg-teal-800 aria-[current]:focus-visible:shadow-focus-gap md:gap-3",
          "py-2 pl-2 pr-3 md:pl-3 md:pr-6",
          {
            "md:py-2.5": compact,
            "md:py-3": !compact,
          },
        )}
        {...rest}
      >
        <div
          className={cl("relative my-auto size-8 shrink-0", {
            "md:size-12": !compact,
          })}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              decoding="sync"
              layout="fill"
              objectFit="contain"
              aria-hidden
              priority
            />
          ) : (
            <FallbackPictogram />
          )}
        </div>

        <div className="grid items-center gap-05">
          <Heading
            size="small"
            as="span"
            className="truncate text-aksel-heading underline group-hover:no-underline group-aria-[current]:text-text-on-inverted group-aria-[current]:no-underline"
          >
            {children}
          </Heading>
          {articleCount && (
            <BodyShort
              as="span"
              size="small"
              textColor="subtle"
              className="uppercase"
            >{`${articleCount} ${
              articleCount === 1 ? "artikkel" : "artikler"
            }`}</BodyShort>
          )}
        </div>
      </Link>
    );
  },
);

export default function Component(props: GpHeroCardProps) {
  return (
    <ErrorBoundary boundaryName="GpHeroCard">
      <GpHeroCard {...props} />
    </ErrorBoundary>
  );
}
