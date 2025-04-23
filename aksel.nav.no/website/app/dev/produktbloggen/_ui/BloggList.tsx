import NextImage from "next/image";
import NextLink from "next/link";
import { Image } from "sanity";
import { BodyLong, BodyShort, Heading, Link } from "@navikt/ds-react";
import { urlForImage } from "@/app/_sanity/utils";
import { dateStr, getImage } from "@/utils";

const getAuthors = (blog: any) =>
  (blog?.contributors as any)?.map((x) => x?.title) ?? [];

export const BloggList = async ({ blogg }: { blogg: any }) => {
  const date = await dateStr(blogg?.publishedAt ?? blogg._createdAt);

  const imageUrl = urlForImage(blogg?.seo?.image as Image)
    ?.quality(100)
    .url();

  return (
    <li>
      <div className="hidden gap-6 md:flex">
        <div className="relative hidden aspect-square h-[11.75rem] rounded-lg ring-1 ring-border-subtle lg:block">
          {imageUrl ? (
            <NextImage
              src={imageUrl}
              blurDataURL={imageUrl}
              placeholder="blur"
              decoding="sync"
              layout="fill"
              objectFit="cover"
              aria-hidden
              priority
              alt=""
              quality={100}
            />
          ) : (
            <NextImage
              src={getImage(blogg?.heading ?? "", "thumbnail")}
              decoding="sync"
              layout="fill"
              objectFit="cover"
              aria-hidden
              priority
              alt=""
            />
          )}
        </div>

        <div className="w-full">
          <NextLink href={`/${blogg.slug}`} passHref legacyBehavior>
            <Link className="text-aksel-heading underline hover:no-underline">
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
          <Link className="text-aksel-heading underline hover:no-underline">
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
