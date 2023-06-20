import { urlFor } from "@/sanity/interface";
import { AkselBloggDocT, ResolveContributorsT, ResolveSlugT } from "@/types";
import { getAuthors } from "@/utils";
import { BodyLong, BodyShort, Heading, Link } from "@navikt/ds-react";
import { getImage } from "components/website-modules/utils/get-image";
import { useFormatedDate } from "components/website-modules/utils/getDate";
import Image from "next/legacy/image";
import NextLink from "next/link";

export const BloggList = ({
  blogg,
}: {
  blogg: ResolveContributorsT<ResolveSlugT<AkselBloggDocT>>;
}) => {
  const date = useFormatedDate(blogg?.publishedAt ?? blogg._createdAt);
  return (
    <div>
      <div className="hidden gap-6 md:flex">
        <div className="relative hidden aspect-square h-[11.75rem] lg:block">
          {blogg?.seo?.image ? (
            <Image
              src={urlFor(blogg.seo.image).auto("format").url()}
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
              objectFit="cover"
              aria-hidden
              priority
              className="rounded-lg"
            />
          )}
        </div>

        <div>
          <NextLink href={`/${blogg.slug}`} passHref legacyBehavior>
            <Link className="text-deepblue-500 no-underline hover:underline">
              <Heading size="small" level="2">
                {blogg.heading}
              </Heading>
            </Link>
          </NextLink>
          <BodyLong className="mt-4" size="small">
            {blogg?.ingress}
          </BodyLong>
          {getAuthors(blogg).length > 0 ? (
            <BodyShort
              size="small"
              className="text-text-subtle mt-4 flex gap-2"
            >
              <span className="font-semibold">{getAuthors(blogg)[0]}</span>
              <span className="animate-fadeIn">{date}</span>
            </BodyShort>
          ) : (
            <BodyShort size="small" className="text-text-subtle mt-4">
              <span className="animate-fadeIn">{date}</span>
            </BodyShort>
          )}
        </div>
      </div>
      <div className="md:hidden">
        <div className="relative mb-6 block aspect-video">
          {blogg?.seo?.image ? (
            <Image
              src={urlFor(blogg.seo.image).auto("format").url()}
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
              objectFit="cover"
              aria-hidden
              priority
              className="rounded-lg"
            />
          )}
        </div>
        <div className="md:hidden">
          <NextLink href={`/${blogg.slug}`} passHref legacyBehavior>
            <Link className="text-deepblue-500 no-underline hover:underline">
              <Heading size="small" level="2">
                {blogg.heading}
              </Heading>
            </Link>
          </NextLink>
          <BodyLong className="mt-4" size="small">
            {blogg?.ingress}
          </BodyLong>
          {getAuthors(blogg).length > 0 ? (
            <BodyShort
              size="small"
              className="text-text-subtle mt-4 flex gap-2"
            >
              <span className="font-semibold">{getAuthors(blogg)[0]}</span>
              <span>{date}</span>
            </BodyShort>
          ) : (
            <BodyShort size="small" className="text-text-subtle mt-4">
              <span>{date}</span>
            </BodyShort>
          )}
        </div>
      </div>
    </div>
  );
};
