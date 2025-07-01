import NextLink from "next/link";
import { BodyLong, BodyShort, Heading, Link } from "@navikt/ds-react";
import { dateStr, getAuthors } from "@/utils";
import styles from "../_ui/Produktbloggen.module.css";

export const SimpleArticle = async ({ blogg }: { blogg: any }) => {
  const date = await dateStr(blogg?.publishedAt ?? blogg._createdAt);

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
    </article>
  );
};
