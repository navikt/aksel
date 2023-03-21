import { abbrName, dateStr } from "@/utils";
import { BodyShort, Detail, Heading } from "@navikt/ds-react";
import { logNav } from "components/website-modules/utils/amplitude";
import NextLink from "next/link";

export type ArticleT = {
  _key: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _id: string;
  heading: string;
  ingress?: string;
  slug: { current: string };
  seo?: {
    meta?: string;
    image?: any;
  };
  tema?: string[];
  status?: { tag: string };
  publishedAt: string;
  contributors?: string[];
};

export const Card = ({ article }: { article: ArticleT }) => {
  console.log(article);
  const date = article.publishedAt ? article.publishedAt : article._updatedAt;

  const showFooter = ["aksel_artikkel", "aksel_blogg"].includes(article._type);
  console.log(showFooter);
  return (
    <div className="hover:shadow-small focus-within:ring-border-focus bg-surface-default ring-border-subtle group relative rounded-lg p-3 pb-16 ring-1 focus-within:ring-[3px] sm:p-5 sm:pb-16">
      <NextLink
        href={`/${article.slug.current}`}
        passHref
        className="after:absolute after:inset-0 after:z-10 after:rounded-lg focus:outline-none"
        onClick={(e) =>
          logNav(
            "forside-masonary",
            window.location.pathname,
            e.currentTarget.getAttribute("href")
          )
        }
      >
        <Heading
          level="3"
          size="small"
          className="text-deepblue-700 group-hover:underline"
        >
          {article.heading}
        </Heading>
      </NextLink>
      {article.ingress && (
        <BodyShort className="mt-2">{article.ingress}</BodyShort>
      )}
      {showFooter && (
        <span className="absolute bottom-5 flex gap-2">
          {article?.contributors && (
            <Detail as="span">
              {abbrName(article?.contributors[0]?.title)}
            </Detail>
          )}
          {article?.contributors && (
            <Detail as="span" className="text-text-subtle">
              —
            </Detail>
          )}
          <Detail as="span" className="text-text-subtle">
            {dateStr(date)}
          </Detail>
        </span>
      )}
    </div>
  );
};
