import NextImage from "next/image";
import {
  BodyLong,
  BodyShort,
  Heading,
  Hide,
  Link,
  Show,
} from "@navikt/ds-react";
import type { BLOGG_LANDINGSSIDE_BLOGS_QUERY_RESULT } from "@/app/_sanity/query-types";
import { urlForImage } from "@/app/_sanity/utils";
import { Avatar, AvatarStack } from "@/app/_ui/avatar/Avatar";
import { queryToAvatars } from "@/app/_ui/avatar/utils";
import { NextLink } from "@/app/_ui/next-link/NextLink";
import { fallbackImageUrl } from "@/ui-utils/fallback-image-url";
import { formatDateString } from "@/ui-utils/format-date";
import styles from "../_ui/Produktbloggen.module.css";

interface Props {
  blogg: NonNullable<BLOGG_LANDINGSSIDE_BLOGS_QUERY_RESULT>["bloggposts"][number];
}

export const HighlightedBlogg = async ({ blogg }: Props) => {
  const avatars = queryToAvatars(blogg.writers);
  const publishDate = formatDateString(blogg.publishedAt ?? blogg._createdAt);

  const imageUrl = urlForImage(blogg?.seo?.image)
    ?.quality(100)
    .auto("format")
    .url();

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
          {publishDate && (
            <BodyShort
              as="time"
              dateTime={blogg.publishedAt ?? blogg._createdAt}
              size="small"
              textColor="subtle"
              className={styles.publishDate}
            >
              {publishDate}
            </BodyShort>
          )}
          <Heading size="large" level="2">
            <Link as={NextLink} href={`/${blogg.slug}`} className={styles.link}>
              {blogg.heading}
            </Link>
          </Heading>
          <BodyLong className={styles.articleBody} size="large">
            {blogg?.ingress}
          </BodyLong>
          <AvatarStack showNames>
            {avatars.map((avatar) => {
              return (
                <Avatar
                  key={avatar.name}
                  imageSrc={avatar.imageSrc}
                  name={avatar.name}
                  type={avatar.type}
                ></Avatar>
              );
            })}
          </AvatarStack>
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

          {publishDate && (
            <BodyShort
              as="time"
              dateTime={blogg.publishedAt ?? blogg._createdAt}
              size="small"
              textColor="subtle"
              className={styles.publishDate}
            >
              {publishDate}
            </BodyShort>
          )}
          <Heading size="large" level="2">
            <Link href={`/${blogg.slug}`} as={NextLink} className={styles.link}>
              {blogg.heading}
            </Link>
          </Heading>

          <BodyLong className={styles.articleBody} size="small">
            {blogg?.ingress}
          </BodyLong>
          <AvatarStack showNames>
            {avatars.map((avatar) => {
              return (
                <Avatar
                  key={avatar.name}
                  imageSrc={avatar.imageSrc}
                  type={avatar.type}
                  name={avatar.name}
                />
              );
            })}
          </AvatarStack>
        </div>
      </Hide>
    </article>
  );
};
