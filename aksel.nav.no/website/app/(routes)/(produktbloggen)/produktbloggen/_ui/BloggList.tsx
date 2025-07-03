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
import { dateStr, getImage } from "@/utils";
import styles from "../_ui/Produktbloggen.module.css";

const getAuthors = (blog: any) =>
  (blog?.contributors as any)?.map((x) => x?.title) ?? [];

export const BloggList = async ({ blogg }: { blogg: any }) => {
  const date = await dateStr(blogg?.publishedAt ?? blogg._createdAt);

  const imageUrl = urlForImage(blogg?.seo?.image as Image)
    ?.quality(100)
    .url();

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
                src={getImage(blogg?.heading ?? "", "thumbnail")}
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
            {getAuthors(blogg).length > 0 ? (
              <BodyShort size="small" className={styles.articleAuthor}>
                <BodyShort as="span" size="small" weight="semibold">
                  {getAuthors(blogg)[0]}
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
          {getAuthors(blogg).length > 0 ? (
            <BodyShort size="small" className={styles.articleAuthor}>
              <BodyShort as="span" size="small" weight="semibold">
                {getAuthors(blogg)[0]}
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
