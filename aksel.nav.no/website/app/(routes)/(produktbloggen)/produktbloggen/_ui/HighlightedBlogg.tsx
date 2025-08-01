import NextImage from "next/image";
import NextLink from "next/link";
import {
  BodyLong,
  BodyShort,
  Heading,
  Hide,
  Link,
  Show,
} from "@navikt/ds-react";
import { BLOGG_LANDINGSSIDE_BLOGS_QUERYResult } from "@/app/_sanity/query-types";
import { urlForImage } from "@/app/_sanity/utils";
import { fallbackImageUrl } from "@/ui-utils/fallback-image-url";
import { formatDateString } from "@/ui-utils/format-date";
import styles from "../_ui/Produktbloggen.module.css";

interface Props {
  blogg: NonNullable<BLOGG_LANDINGSSIDE_BLOGS_QUERYResult>["bloggposts"][number];
}

export const HighlightedBlogg = async ({ blogg }: Props) => {
  const date = formatDateString(blogg?.publishedAt ?? blogg._createdAt);

  const imageUrl = urlForImage(blogg?.seo?.image)
    ?.quality(100)
    .auto("format")
    .url();

  const authors =
    blogg.contributors?.map((author) => author.title).filter(Boolean) ?? [];

  return (
    <article>
      <Show above="md">
        <div className={styles.article}>
          <div className={`${styles.articleImage} ${styles.imageContainer}`}>
            {imageUrl ? (
              <NextImage
                src={imageUrl}
                blurDataURL={imageUrl}
                placeholder="blur"
                decoding="sync"
                fill={true}
                sizes="100%"
                aria-hidden
                priority
                alt=""
                quality={100}
              />
            ) : (
              <NextImage
                src={fallbackImageUrl(blogg?.heading ?? "", "thumbnail")}
                decoding="sync"
                fill={true}
                sizes="100%"
                aria-hidden
                priority
                alt=""
              />
            )}
          </div>
          <Heading size="large" level="2">
            <Link as={NextLink} href={`/${blogg.slug}`} className={styles.link}>
              {blogg.heading}
            </Link>
          </Heading>
          <BodyLong className={styles.articleBody} size="large">
            {blogg?.ingress}
          </BodyLong>
          {authors.length > 0 && (
            <BodyShort size="small" className={styles.articleAuthor}>
              <BodyShort as="span" size="small" weight="semibold">
                {authors[0]}
              </BodyShort>
              <span>{date}</span>
            </BodyShort>
          )}
        </div>
      </Show>
      {/* Mobile view */}
      <Hide above="md">
        <div className={styles.articleMobile}>
          <div className={`${styles.articleImage} ${styles.imageContainer}`}>
            {imageUrl ? (
              <NextImage
                src={imageUrl}
                blurDataURL={imageUrl}
                placeholder="blur"
                decoding="sync"
                fill={true}
                sizes="100%"
                aria-hidden
                priority
                alt=""
                quality={100}
              />
            ) : (
              <NextImage
                src={fallbackImageUrl(blogg?.heading ?? "", "thumbnail")}
                decoding="sync"
                fill={true}
                sizes="100%"
                aria-hidden
                priority
                alt=""
              />
            )}
          </div>

          <Heading size="large" level="2">
            <Link href={`/${blogg.slug}`} as={NextLink} className={styles.link}>
              {blogg.heading}
            </Link>
          </Heading>

          <BodyLong className={styles.articleBody} size="small">
            {blogg?.ingress}
          </BodyLong>
          {authors.length > 0 && (
            <BodyShort size="small" className={styles.articleAuthor}>
              <BodyShort as="span" size="small" weight="semibold">
                {authors[0]}
              </BodyShort>
              <span>{date}</span>
            </BodyShort>
          )}
        </div>
      </Hide>
    </article>
  );
};
