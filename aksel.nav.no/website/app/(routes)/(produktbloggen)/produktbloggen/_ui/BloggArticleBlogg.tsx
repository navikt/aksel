import { BodyLong, Heading, Link } from "@navikt/ds-react";
import { BLOGG_LANDINGSSIDE_BLOGS_QUERYResult } from "@/app/_sanity/query-types";
import { Avatar, AvatarStack } from "@/app/_ui/avatar/Avatar";
import { queryToAvatars } from "@/app/_ui/avatar/utils";
import { NextLink } from "@/app/_ui/next-link/NextLink";
import styles from "../_ui/Produktbloggen.module.css";

type Blogg =
  NonNullable<BLOGG_LANDINGSSIDE_BLOGS_QUERYResult>["bloggposts"][number];
export const BloggArticleBlock = async ({ blogg }: { blogg: Blogg }) => {
  const avatars = queryToAvatars(blogg.writers);

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
    </article>
  );
};
