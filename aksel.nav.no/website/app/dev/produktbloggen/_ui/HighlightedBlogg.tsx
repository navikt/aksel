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
import { urlFor } from "@/sanity/interface";
import { dateStr, getAuthors, getImage } from "@/utils";
import styles from "../_ui/Produktbloggen.module.css";

export const HighlightedBlogg = async ({ blogg }: { blogg: any }) => {
  const date = await dateStr(blogg?.publishedAt ?? blogg._createdAt);

  const imageUrl = urlFor(blogg?.seo?.image)
    ?.quality(100)
    .auto("format")
    .url();

  return (
    <article>
      <Show above="md">
        <div className={styles.article}>
          <div className={styles.articleImage}>
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
          <NextLink href={`/${blogg.slug}`} passHref legacyBehavior>
            <Link className={styles.link}>
              <Heading size="large" level="2">
                {blogg.heading}
              </Heading>
            </Link>
          </NextLink>
          <BodyLong className={styles.articleBody} size="small">
            {blogg?.ingress}
          </BodyLong>
          {getAuthors(blogg).length > 0 && (
            <BodyShort size="small" className={styles.articleAuthor}>
              <span>{getAuthors(blogg)[0]}</span>
              <span>{date}</span>
            </BodyShort>
          )}
        </div>
      </Show>
      {/* Mobile view */}
      <Hide above="md">
        <div className={styles.articleMobile}>
          <div className={styles.articleImage}>
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
          <NextLink href={`/${blogg.slug}`} passHref legacyBehavior>
            <Link className={styles.link}>
              <Heading size="large" level="2">
                {blogg.heading}
              </Heading>
            </Link>
          </NextLink>
          <BodyLong className={styles.articleBody} size="small">
            {blogg?.ingress}
          </BodyLong>
          {getAuthors(blogg).length > 0 && (
            <BodyShort size="small" className={styles.articleAuthor}>
              <span>{getAuthors(blogg)[0]}</span>
              <span>{date}</span>
            </BodyShort>
          )}
        </div>
      </Hide>
    </article>
  );
};
