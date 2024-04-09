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
} & HTMLAttributes<HTMLAnchorElement>;

const GpHeroCard = forwardRef<HTMLAnchorElement, GpHeroCardProps>(
  ({ href, articleCount, children, image, compact = false, ...rest }, ref) => {
    return (
      <Link
        ref={ref}
        href={`/${href}`}
        className="group flex gap-2 rounded-lg bg-surface-default py-2 pl-2 pr-3 shadow-xsmall outline-none hover:shadow-small focus-visible:shadow-focus md:gap-3 md:py-3 md:pl-3 md:pr-6"
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
              articleCount === 1 ? "artikkel" : "artikler"
            }`}</BodyShort>
          )}
        </div>
      </Link>
    );
  },
);

export default GpHeroCard;
