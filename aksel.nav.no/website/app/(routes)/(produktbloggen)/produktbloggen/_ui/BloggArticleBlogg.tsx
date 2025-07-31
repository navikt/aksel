import NextLink from "next/link";
import { BodyLong, BodyShort, Heading, Link } from "@navikt/ds-react";
import { formatDateString } from "@/ui-utils/format-date";
import styles from "../_ui/Produktbloggen.module.css";

async function BloggArticleBlock({ blogg }: { blogg: any }) {
  const date = formatDateString(blogg?.publishedAt ?? blogg._createdAt);

  const authors =
    blogg.contributors?.map((author) => author.title).filter(Boolean) ?? [];

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
      {authors.length > 0 ? (
        <BodyShort size="small" className={styles.articleAuthor}>
          <BodyShort as="span" size="small" weight="semibold">
            {authors[0]}
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
}

export { BloggArticleBlock };
