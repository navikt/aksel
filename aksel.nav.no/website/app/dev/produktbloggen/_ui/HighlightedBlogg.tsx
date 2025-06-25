import NextImage from "next/image";
import NextLink from "next/link";
import { Image } from "sanity";
import { BodyLong, Heading, Hide, Link, Show } from "@navikt/ds-react";
import { BLOGG_LANDINGSSIDE_BLOGS_QUERYResult } from "@/app/_sanity/query-types";
import { urlForImage } from "@/app/_sanity/utils";
import { getImage } from "@/utils";
import { Avatar, AvatarStack } from "../../_ui/Avatar";
import styles from "../_ui/Produktbloggen.module.css";
import { queryToAvatars } from "./utils";

type Blogg = NonNullable<BLOGG_LANDINGSSIDE_BLOGS_QUERYResult>["bloggposts"][0];

export const HighlightedBlogg = async ({ blogg }: { blogg: Blogg }) => {
  const avatars = queryToAvatars(blogg.writers);

  const imageUrl = urlForImage(blogg?.seo?.image as Image)
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
                  name={avatar.name}
                ></Avatar>
              );
            })}
          </AvatarStack>
        </div>
      </Hide>
    </article>
  );
};
