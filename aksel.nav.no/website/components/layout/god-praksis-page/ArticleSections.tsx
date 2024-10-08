import { useCallback, useMemo, useState } from "react";
import { BodyLong, Button, Heading } from "@navikt/ds-react";
import GpArticleCard from "@/layout/god-praksis-page/cards/GpArticleCard";
import {
  GpSlugQueryResponse,
  ParsedGPArticle,
} from "@/layout/god-praksis-page/interface";
import { useGpViews } from "@/layout/god-praksis-page/useGpViews";
import {
  ArticleSortOrder,
  getArticleSortOrder,
  getCookies,
  getUpdatedSortOrderCookie,
} from "../../utils/sort-by-cookie";
import { sortHeadings } from "../../utils/sort-headings";

type GpArticleCardProps = {
  articles: ParsedGPArticle[];
  undertemaList: GpSlugQueryResponse["tema"]["undertema"];
  tema: string;
  articleSortOrdering: ArticleSortOrder;
};

export function ArticleSections({
  articles,
  undertemaList,
  tema,
  articleSortOrdering,
}: GpArticleCardProps) {
  const queryState = useGpViews();

  const [localOrdering, setLocalOrdering] = useState(articleSortOrdering);

  const sortArticles = useCallback(
    (articleList: GpArticleCardProps["articles"], undertema: string) => {
      const sortOrder = localOrdering[`${tema}:${undertema}`];
      if (!sortOrder) {
        return articleList;
      }

      /* We fallback to default sorting if its by "lastVerified" */
      if (sortOrder === "updated") {
        return articleList;
      }

      return articleList.sort((a, b) => {
        if (sortOrder === "name") {
          /**
           * Heading can be just plain text: "Bare lyd og video" or including numbers: "1.2.11 Bare lyd og video"
           * How do i sort the list in a way that "1.2.11 Bare lyd og video" comes after "1.2.10 Bare lyd og video"?
           */
          return sortHeadings(a.heading, b.heading);
        }
        return 0;
      });
    },
    [localOrdering, tema],
  );

  const sections: [
    GpSlugQueryResponse["tema"]["undertema"][0],
    ParsedGPArticle[],
  ][] = useMemo(() => {
    const getUndertemaNameFromTema = (undertema: string) =>
      undertemaList.find((ut) => ut.title === undertema) ?? null;

    const groupedByUndertema = articles.reduce((map, article) => {
      const undertema = getUndertemaNameFromTema(article.undertema);
      if (!undertema) {
        return map;
      }

      const articlesForUndertema = map.get(undertema) || [];
      articlesForUndertema.push(article);
      map.set(undertema, articlesForUndertema);

      return map;
    }, new Map<GpSlugQueryResponse["tema"]["undertema"][0], ParsedGPArticle[]>());

    if (queryState.view === "none") {
      return [...groupedByUndertema.entries()];
    }

    if (queryState.view === "undertema") {
      const currentUndertema = getUndertemaNameFromTema(queryState.undertema);
      if (!currentUndertema) {
        return [];
      }

      const utArticles = groupedByUndertema.get(currentUndertema);
      if (!utArticles) {
        return [];
      }
      return [
        [currentUndertema, sortArticles(utArticles, currentUndertema.title)],
      ];
    }

    if (queryState.view === "innholdstype") {
      const filteredMap = new Map();
      for (const [undertema, utArticles] of groupedByUndertema) {
        const filteredArticles = utArticles.filter(
          (article) => article.innholdstype === queryState.innholdstype,
        );
        if (filteredArticles.length > 0) {
          filteredMap.set(undertema, filteredArticles);
        }
      }

      if (filteredMap.size === 0) {
        return [];
      }
      return [...filteredMap.entries()];
    }
    if (queryState.view === "both") {
      const matchingArticles = articles.filter(
        (article) =>
          article.undertema === queryState.undertema &&
          article.innholdstype === queryState.innholdstype,
      );

      if (matchingArticles.length === 0) {
        return [];
      }
      return [
        [
          {
            title: `Artikler for ${queryState.undertema} og ${queryState.innholdstype}`,
          },
          matchingArticles,
        ],
      ];
    }

    return [];
  }, [
    articles,
    queryState.view,
    queryState.undertema,
    queryState.innholdstype,
    undertemaList,
    sortArticles,
  ]);

  const SectionTag =
    queryState.view === "undertema" || queryState.view === "both"
      ? "div"
      : "section";

  return sections.map(([ut, utArticles]) => (
    <SectionTag
      key={ut.title}
      aria-label={
        ["none", "innholdstype"].includes(queryState.view)
          ? `Undertema ${ut.title}`
          : undefined
      }
    >
      <IntroSection title={ut.title} description={ut.description} />
      <Button
        variant="secondary-neutral"
        onClick={() => {
          const newCookie = getUpdatedSortOrderCookie(
            `${tema}:${ut.title}`,
            localOrdering,
          );
          if (newCookie) {
            globalThis.document.cookie = newCookie;
            const updatedCookies = getCookies(globalThis.document.cookie);
            setLocalOrdering(
              (prevOrder) => getArticleSortOrder(updatedCookies) ?? prevOrder,
            );
          }
        }}
      >
        Update sortorder
      </Button>
      <GpCardGrid>
        {utArticles.map((article) => (
          <li key={article.slug}>
            <GpArticleCard
              href={article.slug}
              innholdstype={article.innholdstype}
              undertema={article.undertema}
              date={article.displayDate}
              description={article.description}
            >
              {article.heading}
            </GpArticleCard>
          </li>
        ))}
      </GpCardGrid>
    </SectionTag>
  ));
}

function IntroSection({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <>
      <Heading level="2" size="medium" className="mb-2 text-aksel-heading">
        {title}
      </Heading>
      {description && <BodyLong spacing>{description}</BodyLong>}
    </>
  );
}

export function GpCardGrid({ children }: { children: React.ReactNode }) {
  return (
    <ul className="grid grid-cols-1 gap-3 *:grid md:grid-cols-2 md:gap-6">
      {children}
    </ul>
  );
}
