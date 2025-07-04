import NextImage from "next/image";
import NextLink from "next/link";
import { Image } from "sanity";
import {
  BodyLong,
  BodyShort,
  Heading,
  Hide,
  Link,
  Show,
} from "@navikt/ds-react";
import { urlForImage } from "@/app/_sanity/utils";
import { fallbackImageUrl } from "@/ui-utils/fallback-image-url";
import { formatDateString } from "@/ui-utils/format-date";
import styles from "../_ui/Produktbloggen.module.css";

export const BloggList = async ({ blogg }: { blogg: any }) => {
  const date = formatDateString(blogg?.publishedAt ?? blogg._createdAt);

  const imageUrl = urlForImage(blogg?.seo?.image as Image)
    ?.quality(100)
    .url();

  const authors =
    blogg.contributors?.map((author) => author.title).filter(Boolean) ?? [];

  return (
    <li>
      <Show asChild above="md">
        <div className={styles.remainingArticle}>
          <div
            className={`${styles.remainingArticleImage} ${styles.imageContainer}`}
          >
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

          <div>
            <Link as={NextLink} className={styles.link} href={`/${blogg.slug}`}>
              <Heading size="medium" level="2">
                {blogg.heading}
              </Heading>
            </Link>

            <BodyLong className={styles.articleBody} size="medium">
              {blogg?.ingress}
            </BodyLong>
            {authors.length > 0 ? (
              <BodyShort size="small" className={styles.articleAuthor}>
                <BodyShort as="span" size="small" weight="semibold">
                  {authors[0]}
                </BodyShort>
                <span>{date}</span>
              </BodyShort>
            ) : (
              <BodyShort size="small" className={styles.articleBodySubtle}>
                <span>{date}</span>
              </BodyShort>
            )}
          </div>
        </div>
      </Show>

      <Hide asChild above="md">
        <div>
          <Link className={styles.link} href={`/${blogg.slug}`} as={NextLink}>
            <Heading size="medium" level="2">
              {blogg.heading}
            </Heading>
          </Link>

          <BodyLong className={styles.articleBody} size="medium">
            {blogg?.ingress}
          </BodyLong>
          {authors.length > 0 ? (
            <BodyShort size="small" className={styles.articleAuthor}>
              <BodyShort as="span" size="small" weight="semibold">
                {authors[0]}
              </BodyShort>
              <span>{date}</span>
            </BodyShort>
          ) : (
            <BodyShort size="small" className={styles.articleBodySubtle}>
              <span>{date}</span>
            </BodyShort>
          )}
        </div>
      </Hide>
    </li>
  );
};
