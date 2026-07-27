import NextImage from "next/image";
import { BodyLong, BodyShort, Heading, Link, Show } from "@navikt/ds-react";
import type { BLOGG_LANDINGSSIDE_BLOGS_QUERY_RESULT } from "@/app/_sanity/query-types";
import { urlForImage } from "@/app/_sanity/utils";
import { Avatar, AvatarStack } from "@/app/_ui/avatar/Avatar";
import { queryToAvatars } from "@/app/_ui/avatar/utils";
import { NextLink } from "@/app/_ui/next-link/NextLink";
import { fallbackImageUrl } from "@/ui-utils/fallback-image-url";
import { formatDateString } from "@/ui-utils/format-date";
import styles from "../_ui/Produktbloggen.module.css";

type Blogg =
  NonNullable<BLOGG_LANDINGSSIDE_BLOGS_QUERY_RESULT>["bloggposts"][number];

export const BloggList = async ({ blogg }: { blogg: Blogg }) => {
  const avatars = queryToAvatars(blogg.writers);
  const publishDate = formatDateString(blogg.publishedAt ?? blogg._createdAt);
  const imageUrl = urlForImage(blogg?.seo?.image)?.quality(100).url();

  return (
    <li className={styles.remainingArticle}>
      {/* Thumbnail only shows on large screens; hidden below via Show */}
      <Show asChild above="lg">
        <div
          className={`${styles.remainingArticleImage} ${styles.imageContainer}`}
        >
          <NextImage
            src={
              imageUrl ?? fallbackImageUrl(blogg?.heading ?? "", "thumbnail")
            }
            {...(imageUrl && { blurDataURL: imageUrl, placeholder: "blur" })}
            decoding="sync"
            fill={true}
            sizes="12rem"
            aria-hidden
            alt=""
          />
        </div>
      </Show>

      <div className={styles.remainingArticleContent}>
        <div>
          {publishDate && (
            <BodyShort
              as="time"
              dateTime={blogg.publishedAt ?? blogg._createdAt}
              size="small"
              textColor="subtle"
            >
              {publishDate}
            </BodyShort>
          )}
        </div>
        <Link as={NextLink} className={styles.link} href={`/${blogg.slug}`}>
          <Heading size="medium" level="2">
            {blogg.heading}
          </Heading>
        </Link>

        <BodyLong className={styles.articleBody} size="medium">
          {blogg?.ingress}
        </BodyLong>

        <div className={styles.articleMeta}>
          <AvatarStack showNames>
            {avatars.map((avatar) => (
              <Avatar
                key={avatar.name}
                imageSrc={avatar.imageSrc}
                name={avatar.name}
                type={avatar.type}
              />
            ))}
          </AvatarStack>
        </div>
      </div>
    </li>
  );
};
