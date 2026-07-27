import { BodyLong, BodyShort, Heading, Link } from "@navikt/ds-react";
import type { BLOGG_LANDINGSSIDE_BLOGS_QUERY_RESULT } from "@/app/_sanity/query-types";
import { Avatar, AvatarStack } from "@/app/_ui/avatar/Avatar";
import { queryToAvatars } from "@/app/_ui/avatar/utils";
import { NextLink } from "@/app/_ui/next-link/NextLink";
import { formatDateString } from "@/ui-utils/format-date";
import styles from "../_ui/Produktbloggen.module.css";

type Blogg =
  NonNullable<BLOGG_LANDINGSSIDE_BLOGS_QUERY_RESULT>["bloggposts"][number];
export const BloggArticleBlock = async ({ blogg }: { blogg: Blogg }) => {
  const avatars = queryToAvatars(blogg.writers);
  const publishDate = formatDateString(blogg.publishedAt ?? blogg._createdAt);

  return (
    <article>
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
            ></Avatar>
          );
        })}
      </AvatarStack>
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
    </article>
  );
};
