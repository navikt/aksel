import { abbrName, dateStr } from "@/utils";
import { BodyShort, Detail, Heading } from "@navikt/ds-react";
import { logNav } from "components/website-modules/utils/amplitude";
import NextLink from "next/link";
import { Tag } from "./Tag";
import cl from "clsx";

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
  contributors?: { title: string }[];
};

export const Card = ({ article }: { article: ArticleT }) => {
  console.log(article);
  const date = article.publishedAt ? article.publishedAt : article._updatedAt;

  const showFooter = ["aksel_artikkel", "aksel_blogg"].includes(article._type);
  console.log(showFooter);
  return (
    <div
      className={cl(
        "bg-surface-default group relative rounded-lg p-3 sm:p-5",
        "focus-within:ring-border-focus ring-border-subtle hover:shadow-small ring-1 focus-within:ring-[3px]",
        showFooter && "pb-16 sm:pb-16"
      )}
    >
      <Tag
        type={article._type}
        text={article.tema ? article.tema[0] : undefined}
        size="small"
      />
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
        <span className="text-text-subtle absolute bottom-5 flex gap-2">
          {article?.contributors && (
            <Detail as="span" className="font-semibold">
              {abbrName(article?.contributors[0]?.title)}
            </Detail>
          )}
          <Detail as="span">{dateStr(date)}</Detail>
        </span>
      )}
    </div>
  );
};
