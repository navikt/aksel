import { SchemaConfig } from "../../schema/schema.config";

/**
 * Content published between $from and $to (both inclusive):
 * - articles: first published in the period (`publishedAt`, set by the first-publish function)
 * - changelog: design system and god praksis changelog entries dated in the period (`endringsdato`, set manually)
 */
export const NEWSLETTER_ENTRIES_QUERY = `{
  "articles": *[_type in $articleTypes && publishedAt >= $from && publishedAt <= $to] | order(publishedAt asc) {
    _id, _type, heading, slug, "date": publishedAt
  },
  "changelog": *[_type in ["ds_endringslogg_artikkel", "gp_endringslogg_artikkel"] && endringsdato >= $from && endringsdato <= $to] | order(endringsdato asc) {
    _id, _type, heading, slug, endringstype, "date": endringsdato
  }
}`;

export const newsletterQueryParams = (from: Date, to: Date) => ({
  articleTypes: [...SchemaConfig.allArticleDocuments],
  from: from.toISOString(),
  to: to.toISOString(),
});

export type NewsletterArticleT = {
  _id: string;
  _type: string;
  heading: string | null;
  slug: { current?: string } | null;
  date: string;
};

export type NewsletterChangelogT = NewsletterArticleT & {
  endringstype?: "design" | "dokumentasjon" | "kode" | null;
};

export type NewsletterEntriesT = {
  articles: NewsletterArticleT[];
  changelog: NewsletterChangelogT[];
};
