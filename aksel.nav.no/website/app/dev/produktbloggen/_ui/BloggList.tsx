import NextImage from "next/image";
import NextLink from "next/link";
import { Image } from "sanity";
import { BodyLong, Heading, Hide, Link, Show } from "@navikt/ds-react";
import { BLOGG_LANDINGSSIDE_BLOGS_QUERYResult } from "@/app/_sanity/query-types";
import { urlForImage } from "@/app/_sanity/utils";
import { getImage } from "@/utils";
import { AvatarStack } from "../../_ui/Avatar";
import styles from "../_ui/Produktbloggen.module.css";
import { queryToAvatars } from "./utils";

type Blogg = NonNullable<BLOGG_LANDINGSSIDE_BLOGS_QUERYResult>["bloggposts"][0];

export const BloggList = async ({ blogg }: { blogg: Blogg }) => {
  const avatars = queryToAvatars(blogg.editorial_staff_teams);

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
            <NextLink href={`/${blogg.slug}`} passHref legacyBehavior>
              <Link className={styles.link}>
                <Heading size="medium" level="2">
                  {blogg.heading}
                </Heading>
              </Link>
            </NextLink>
            <BodyLong className={styles.articleBody} size="medium">
              {blogg?.ingress}
            </BodyLong>
            <AvatarStack avatars={avatars} />
          </div>
        </div>
      </Show>

      <Hide asChild above="md">
        <div>
          <NextLink href={`/${blogg.slug}`} passHref legacyBehavior>
            <Link className={styles.link}>
              <Heading size="medium" level="2">
                {blogg.heading}
              </Heading>
            </Link>
          </NextLink>
          <BodyLong className={styles.articleBody} size="medium">
            {blogg?.ingress}
          </BodyLong>
          <AvatarStack avatars={avatars} />
        </div>
      </Hide>
    </li>
  );
};
