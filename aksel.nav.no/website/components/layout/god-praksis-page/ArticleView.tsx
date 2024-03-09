import { useCallback, useMemo } from "react";
import { BodyLong, HGrid, Heading } from "@navikt/ds-react";
import GpArticleCard from "@/layout/god-praksis-page/cards/GpArticleCard";
import {
  GpSlugQueryResponse,
  ParsedGPArticle,
} from "@/layout/god-praksis-page/interface";
import { useGpViews } from "@/layout/god-praksis-page/useGpViews";

type GpArticleCardProps = {
  articles: ParsedGPArticle[];
  undertemaList: GpSlugQueryResponse["tema"]["undertema"];
};

export function ArticleView({ articles, undertemaList }: GpArticleCardProps) {
  const view = useGpViews();

  const getUndertemaFromTema = useCallback(
    (undertema: string) => {
      return undertemaList.find((ut) => ut.title === undertema) ?? null;
    },

    [undertemaList],
  );

  const articlesByUndertema = useMemo(() => {
    return articles.reduce((map, article) => {
      const undertema = getUndertemaFromTema(article.undertema);
      if (!undertema) {
        return map;
      }

      const articlesForUndertema = map.get(undertema) || [];
      articlesForUndertema.push(article);
      map.set(undertema, articlesForUndertema);

      return map;
    }, new Map<GpSlugQueryResponse["tema"]["undertema"][0], ParsedGPArticle[]>());
  }, [articles, getUndertemaFromTema]);

  switch (view.view) {
    case "none": {
      return (
        <>
          {[...articlesByUndertema.entries()].map(([ut, utArticles]) => {
            return (
              <div key={ut.title}>
                <IntroSection title={ut.title} description={ut.description} />
                <CardGrid>
                  {utArticles.map((article) => (
                    <GpArticleCard
                      key={article.slug}
                      href={`${article.slug}`.replace("god-praksis", "gp")}
                      innholdstype={article.innholdstype}
                      undertema={article.undertema}
                      publishedAt={article.publishedAt}
                      description={article.description}
                    >
                      {article.heading}
                    </GpArticleCard>
                  ))}
                </CardGrid>
              </div>
            );
          })}
        </>
      );
    }

    case "undertema": {
      const ut = getUndertemaFromTema(view.undertema);
      if (!ut) {
        return null;
      }

      const utArticles = articlesByUndertema.get(ut);
      if (!utArticles) {
        return null;
      }

      return (
        <div>
          <IntroSection title={ut.title} description={ut.description} />

          <CardGrid>
            {utArticles.map((_article) => (
              <GpArticleCard
                key={_article.slug}
                href={`${_article.slug}`.replace("god-praksis", "gp")}
                innholdstype={_article.innholdstype}
                undertema={_article.undertema}
                publishedAt={_article.publishedAt}
                description={_article.description}
              >
                {_article.heading}
              </GpArticleCard>
            ))}
          </CardGrid>
        </div>
      );
    }
    case "innholdstype": {
      const filteredMap = new Map();
      for (const [undertema, utArticles] of articlesByUndertema) {
        const filteredArticles = utArticles.filter(
          (article) => article.innholdstype === view.innholdstype,
        );
        if (filteredArticles.length > 0) {
          filteredMap.set(undertema, filteredArticles);
        }
      }

      if (filteredMap.size === 0) {
        return null;
      }

      return (
        <>
          {[...filteredMap.entries()].map(([ut, utArticles]) => {
            return (
              <div key={ut.title}>
                <IntroSection title={ut.title} description={ut.description} />
                <CardGrid>
                  {utArticles.map((article) => (
                    <GpArticleCard
                      key={article.slug}
                      href={`${article.slug}`.replace("god-praksis", "gp")}
                      innholdstype={article.innholdstype}
                      undertema={article.undertema}
                      publishedAt={article.publishedAt}
                      description={article.description}
                    >
                      {article.heading}
                    </GpArticleCard>
                  ))}
                </CardGrid>
              </div>
            );
          })}
        </>
      );
    }
    case "both": {
      const matchingArticles = articles.filter(
        (article) =>
          article.undertema === view.undertema &&
          article.innholdstype === view.innholdstype,
      );

      if (matchingArticles.length === 0) {
        return null;
      }

      return (
        <div>
          <IntroSection
            title={`Artikler for ${view.undertema} og ${view.innholdstype}`}
          />
          <CardGrid>
            {matchingArticles.map((article) => (
              <GpArticleCard
                key={article.slug}
                href={`${article.slug}`.replace("god-praksis", "gp")}
                innholdstype={article.innholdstype}
                undertema={article.undertema}
                publishedAt={article.publishedAt}
                description={article.description}
              >
                {article.heading}
              </GpArticleCard>
            ))}
          </CardGrid>
        </div>
      );
    }
    default:
      return null;
  }
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

function CardGrid({ children }: { children: React.ReactNode }) {
  return (
    <HGrid columns={{ xs: 1, md: 2 }} gap={{ xs: "3", md: "6" }}>
      {children}
    </HGrid>
  );
}
