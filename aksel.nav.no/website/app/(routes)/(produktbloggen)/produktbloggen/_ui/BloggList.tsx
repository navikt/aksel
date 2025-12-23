import NextImage from "next/image";
import { BodyLong, Heading, Hide, Link, Show } from "@navikt/ds-react";
import { BLOGG_LANDINGSSIDE_BLOGS_QUERYResult } from "@/app/_sanity/query-types";
import { urlForImage } from "@/app/_sanity/utils";
import { Avatar, AvatarStack } from "@/app/_ui/avatar/Avatar";
import { queryToAvatars } from "@/app/_ui/avatar/utils";
import { NextLink } from "@/app/_ui/next-link/NextLink";
import { fallbackImageUrl } from "@/ui-utils/fallback-image-url";
import styles from "../_ui/Produktbloggen.module.css";

type Blogg =
  NonNullable<BLOGG_LANDINGSSIDE_BLOGS_QUERYResult>["bloggposts"][number];

export const BloggList = async ({ blogg }: { blogg: Blogg }) => {
  const avatars = queryToAvatars(blogg.writers);

  const imageUrl = urlForImage(blogg?.seo?.image)?.quality(100).url();

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
            <AvatarStack showNames>
              {avatars.map((avatar) => {
                return (
                  <Avatar
                    key={avatar.name}
                    imageSrc={avatar.imageSrc}
                    name={avatar.name}
                    type={avatar.type}
                  />
                );
              })}
            </AvatarStack>
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
          <AvatarStack showNames>
            {avatars.map((avatar) => {
              return (
                <Avatar
                  key={avatar.name}
                  imageSrc={avatar.imageSrc}
                  name={avatar.name}
                  type={avatar.type}
                />
              );
            })}
          </AvatarStack>
        </div>
      </Hide>
    </li>
  );
};
