import cl from "clsx";
import Image from "next/legacy/image";
import Link from "next/link";
import { HTMLAttributes, forwardRef } from "react";
import { BodyShort, Heading } from "@navikt/ds-react";
import { FallbackPictogram } from "@/layout/god-praksis-page/FallbackPictogram";
import { urlFor } from "@/sanity/interface";

type GpHeroCardProps = {
  children: React.ReactNode;
  href: string;
  articleCount?: number;
  image: any;
  compact?: boolean;
  onInvertedBg?: boolean;
} & HTMLAttributes<HTMLAnchorElement>;

const GpHeroCard = forwardRef<HTMLAnchorElement, GpHeroCardProps>(
  (
    {
      href,
      articleCount,
      children,
      image,
      compact = false,
      onInvertedBg = false,
      ...rest
    },
    ref,
  ) => {
    return (
      <Link
        ref={ref}
        href={`/${href}`}
        className={cl(
          "group flex gap-2 rounded-lg bg-surface-default py-2 pl-2 pr-3 shadow-xsmall outline-none hover:shadow-small md:gap-3 md:py-3 md:pl-3 md:pr-6",
          {
            "focus-visible:shadow-focus": !onInvertedBg,
            "focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-border-focus-on-inverted":
              onInvertedBg,
          },
        )}
        {...rest}
      >
        <div
          className={cl("relative my-auto shrink-0", {
            "size-8 md:size-12": !compact,
            "size-6": compact,
          })}
        >
          {image ? (
            <Image
              src={urlFor(image).auto("format").url()}
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

        <div className="grid gap-05">
          <Heading
            size="small"
            as="span"
            className="truncate text-aksel-heading underline group-hover:no-underline"
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
              articleCount === 1 ? "Artikkel" : "Artikler"
            }`}</BodyShort>
          )}
        </div>
      </Link>
    );
  },
);

export default GpHeroCard;
