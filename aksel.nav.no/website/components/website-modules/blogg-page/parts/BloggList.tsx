import Image from "next/legacy/image";
import NextLink from "next/link";
import { BodyLong, BodyShort, Heading, Link } from "@navikt/ds-react";
import { useFormatedDate } from "@/hooks/useFormatedDate";
import { urlFor } from "@/sanity/interface";
import { AkselBloggDocT, ResolveContributorsT, ResolveSlugT } from "@/types";
import { getAuthors, getImage } from "@/utils";

export const BloggList = ({
  blogg,
}: {
  blogg: ResolveContributorsT<ResolveSlugT<AkselBloggDocT>>;
}) => {
  const date = useFormatedDate(blogg?.publishedAt ?? blogg._createdAt);

  const imageUrl = urlFor(blogg?.seo?.image)
    ?.auto("format")
    .url();

  return (
    <li>
      <div className="hidden gap-6 md:flex">
        <div className="relative hidden aspect-square h-[11.75rem] rounded-lg ring-1 ring-border-subtle lg:block">
          {imageUrl ? (
            <Image
              src={imageUrl}
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

        <div className="w-full">
          <NextLink href={`/${blogg.slug}`} passHref legacyBehavior>
            <Link className="text-aksel-heading underline hover:no-underline focus-visible:text-text-on-inverted">
              <Heading size="medium" level="2">
                {blogg.heading}
              </Heading>
            </Link>
          </NextLink>
          <BodyLong className="mt-4" size="medium">
            {blogg?.ingress}
          </BodyLong>
          {getAuthors(blogg).length > 0 ? (
            <BodyShort
              size="small"
              className="mt-4 flex gap-2 text-text-subtle"
            >
              <span className="font-semibold">{getAuthors(blogg)[0]}</span>
              <span className="animate-fadeIn">{date}</span>
            </BodyShort>
          ) : (
            <BodyShort size="small" className="mt-4 text-text-subtle">
              <span className="animate-fadeIn">{date}</span>
            </BodyShort>
          )}
        </div>
      </div>

      <div className="w-full md:hidden">
        <NextLink href={`/${blogg.slug}`} passHref legacyBehavior>
          <Link className="text-aksel-heading underline hover:no-underline focus-visible:text-text-on-inverted">
            <Heading size="medium" level="2">
              {blogg.heading}
            </Heading>
          </Link>
        </NextLink>
        <BodyLong className="mt-4" size="medium">
          {blogg?.ingress}
        </BodyLong>
        {getAuthors(blogg).length > 0 ? (
          <BodyShort size="small" className="mt-4 flex gap-2 text-text-subtle">
            <span className="font-semibold">{getAuthors(blogg)[0]}</span>
            <span>{date}</span>
          </BodyShort>
        ) : (
          <BodyShort size="small" className="mt-4 text-text-subtle">
            <span>{date}</span>
          </BodyShort>
        )}
      </div>
    </li>
  );
};
