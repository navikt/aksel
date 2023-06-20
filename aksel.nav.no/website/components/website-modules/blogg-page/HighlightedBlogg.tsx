import { urlFor } from "@/sanity/interface";
import { AkselBloggDocT, ResolveContributorsT, ResolveSlugT } from "@/types";
import { getAuthors } from "@/utils";
import { BodyLong, BodyShort, Heading, Link } from "@navikt/ds-react";
import { getImage } from "components/website-modules/utils/get-image";
import { useFormatedDate } from "components/website-modules/utils/getDate";
import Image from "next/legacy/image";
import NextLink from "next/link";

export const HighlightedBlogg = ({
  blogg,
}: {
  blogg: ResolveContributorsT<ResolveSlugT<AkselBloggDocT>>;
}) => {
  const date = useFormatedDate(blogg?.publishedAt ?? blogg._createdAt);
  return (
    <div>
      <div className="col-span-1 hidden md:block">
        <div className="relative mb-10 block aspect-video">
          {blogg?.seo?.image ? (
            <Image
              src={urlFor(blogg.seo.image).quality(100).auto("format").url()}
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
          <Link className="text-deepblue-500 no-underline hover:underline">
            <Heading size="large" level="2">
              {blogg.heading}
            </Heading>
          </Link>
        </NextLink>
        <BodyLong className="mt-4" size="small">
          {blogg?.ingress}
        </BodyLong>
        {getAuthors(blogg).length > 0 && (
          <BodyShort size="small" className="text-text-subtle mt-4 flex gap-2">
            <span className="font-semibold">{getAuthors(blogg)[0]}</span>
            <span>{date}</span>
          </BodyShort>
        )}
      </div>
      {/* Mobile view */}
      <div className="w-full md:hidden">
        <div className="relative mb-10 block aspect-video">
          {blogg?.seo?.image ? (
            <Image
              src={urlFor(blogg.seo.image).quality(100).auto("format").url()}
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
          <Link className="text-deepblue-500 no-underline hover:underline">
            <Heading size="large" level="2">
              {blogg.heading}
            </Heading>
          </Link>
        </NextLink>
        <BodyLong className="mt-4" size="small">
          {blogg?.ingress}
        </BodyLong>
        {getAuthors(blogg).length > 0 && (
          <BodyShort size="small" className="text-text-subtle mt-4 flex gap-2">
            <span className="font-semibold">{getAuthors(blogg)[0]}</span>
            <span>{date}</span>
          </BodyShort>
        )}
      </div>
    </div>
  );
};
