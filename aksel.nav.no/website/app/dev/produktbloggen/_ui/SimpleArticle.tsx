import NextLink from "next/link";
import { BodyLong, Heading, Link } from "@navikt/ds-react";
import { BLOGG_LANDINGSSIDE_BLOGS_QUERYResult } from "@/app/_sanity/query-types";
import { Avatar, AvatarStack } from "../../_ui/Avatar";
import styles from "../_ui/Produktbloggen.module.css";
import { queryToAvatars } from "./utils";

type Blogg = NonNullable<BLOGG_LANDINGSSIDE_BLOGS_QUERYResult>["bloggposts"][0];

export const SimpleArticle = async ({ blogg }: { blogg: Blogg }) => {
  const avatars = queryToAvatars(blogg.writers);

  return (
    <article>
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
    </article>
  );
};
