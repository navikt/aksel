import Image from "next/legacy/image";
import NextLink from "next/link";
import { BodyLong, BodyShort, Heading, Link } from "@navikt/ds-react";
import { useFormatedDate } from "@/hooks/useFormatedDate";
import { urlFor } from "@/sanity/interface";
import { AkselBloggDocT, ResolveContributorsT, ResolveSlugT } from "@/types";
import { getAuthors, getImage } from "@/utils";

export const HighlightedBlogg = ({
  blogg,
}: {
  blogg: ResolveContributorsT<ResolveSlugT<AkselBloggDocT>>;
}) => {
  const date = useFormatedDate(blogg?.publishedAt ?? blogg._createdAt);
  return (
    <article>
      <div className="col-span-1 hidden md:block">
        <div className="relative mb-10 block aspect-video rounded-lg ring-1 ring-border-subtle">
          {blogg?.seo?.image ? (
            <Image
              src={urlFor(blogg.seo.image).quality(100).auto("format").url()}
              blurDataURL={urlFor(blogg.seo.image)
                .width(24)
                .height(24)
                .blur(10)
                .url()}
              placeholder="blur"
              quality={100}
              layout="fill"
              objectFit="cover"
              aria-hidden
              priority
              className="rounded-lg"
              decoding="sync"
            />
          ) : (
            <Image
              src={getImage(blogg?.heading ?? "", "thumbnail")}
              layout="fill"
              objectFit="contain"
              aria-hidden
              priority
              className="rounded-lg"
              decoding="sync"
            />
          )}
        </div>
        <NextLink href={`/${blogg.slug}`} passHref legacyBehavior>
          <Link className="text-aksel-heading underline hover:no-underline">
            <Heading size="large" level="2">
              {blogg.heading}
            </Heading>
          </Link>
        </NextLink>
        <BodyLong className="mt-4" size="small">
          {blogg?.ingress}
        </BodyLong>
        {getAuthors(blogg).length > 0 && (
          <BodyShort size="small" className="mt-4 flex gap-2 text-text-subtle">
            <span className="font-semibold">{getAuthors(blogg)[0]}</span>
            <span>{date}</span>
          </BodyShort>
        )}
      </div>
      {/* Mobile view */}
      <div className="w-full md:hidden">
        <div className="relative mb-10 block aspect-video rounded-lg ring-1 ring-border-subtle">
          {blogg?.seo?.image ? (
            <Image
              src={urlFor(blogg.seo.image).quality(100).auto("format").url()}
              blurDataURL={urlFor(blogg.seo.image)
                .width(24)
                .height(24)
                .blur(10)
                .url()}
              placeholder="blur"
              quality={100}
              layout="fill"
              objectFit="cover"
              aria-hidden
              priority
              className="rounded-lg"
            />
          ) : (
            <Image
              src={getImage(blogg?.heading ?? "", "thumbnail")}
              layout="fill"
              objectFit="contain"
              aria-hidden
              priority
              className="rounded-lg"
            />
          )}
        </div>
        <NextLink href={`/${blogg.slug}`} passHref legacyBehavior>
          <Link className="text-aksel-heading underline hover:no-underline">
            <Heading size="large" level="2">
              {blogg.heading}
            </Heading>
          </Link>
        </NextLink>
        <BodyLong className="mt-4" size="small">
          {blogg?.ingress}
        </BodyLong>
        {getAuthors(blogg).length > 0 && (
          <BodyShort size="small" className="mt-4 flex gap-2 text-text-subtle">
            <span className="font-semibold">{getAuthors(blogg)[0]}</span>
            <span>{date}</span>
          </BodyShort>
        )}
      </div>
    </article>
  );
};
