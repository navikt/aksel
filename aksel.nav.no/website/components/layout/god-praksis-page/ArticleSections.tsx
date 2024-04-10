import { useCallback, useMemo } from "react";
import { BodyLong, Heading } from "@navikt/ds-react";
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

export function ArticleSections({
  articles,
  undertemaList,
}: GpArticleCardProps) {
  const queryState = useGpViews();

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

  switch (queryState.view) {
    case "none": {
      return (
        <>
          {[...articlesByUndertema.entries()].map(([ut, utArticles]) => {
            return (
              <section key={ut.title} aria-label={`Undertema ${ut.title}`}>
                <IntroSection title={ut.title} description={ut.description} />
                <GpCardGrid>
                  {utArticles.map((article) => (
                    <li key={article.slug}>
                      <GpArticleCard
                        href={`${article.slug}`.replace("god-praksis", "gp")}
                        innholdstype={article.innholdstype}
                        undertema={article.undertema}
                        publishedAt={article.publishedAt}
                        description={article.description}
                      >
                        {article.heading}
                      </GpArticleCard>
                    </li>
                  ))}
                </GpCardGrid>
              </section>
            );
          })}
        </>
      );
    }

    case "undertema": {
      const ut = getUndertemaFromTema(queryState.undertema);
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

          <GpCardGrid>
            {utArticles.map((_article) => (
              <li key={_article.slug}>
                <GpArticleCard
                  href={`${_article.slug}`.replace("god-praksis", "gp")}
                  innholdstype={_article.innholdstype}
                  undertema={_article.undertema}
                  publishedAt={_article.publishedAt}
                  description={_article.description}
                >
                  {_article.heading}
                </GpArticleCard>
              </li>
            ))}
          </GpCardGrid>
        </div>
      );
    }
    case "innholdstype": {
      const filteredMap = new Map();
      for (const [undertema, utArticles] of articlesByUndertema) {
        const filteredArticles = utArticles.filter(
          (article) => article.innholdstype === queryState.innholdstype,
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
              <section key={ut.title} aria-label={`Undertema ${ut.title}`}>
                <IntroSection title={ut.title} description={ut.description} />
                <GpCardGrid>
                  {utArticles.map((article) => (
                    <li key={article.slug}>
                      <GpArticleCard
                        href={`${article.slug}`.replace("god-praksis", "gp")}
                        innholdstype={article.innholdstype}
                        undertema={article.undertema}
                        publishedAt={article.publishedAt}
                        description={article.description}
                      >
                        {article.heading}
                      </GpArticleCard>
                    </li>
                  ))}
                </GpCardGrid>
              </section>
            );
          })}
        </>
      );
    }
    case "both": {
      const matchingArticles = articles.filter(
        (article) =>
          article.undertema === queryState.undertema &&
          article.innholdstype === queryState.innholdstype,
      );

      if (matchingArticles.length === 0) {
        return null;
      }

      return (
        <div>
          <IntroSection
            title={`Artikler for ${queryState.undertema} og ${queryState.innholdstype}`}
          />
          <GpCardGrid>
            {matchingArticles.map((article) => (
              <li key={article.slug}>
                <GpArticleCard
                  href={`${article.slug}`.replace("god-praksis", "gp")}
                  innholdstype={article.innholdstype}
                  undertema={article.undertema}
                  publishedAt={article.publishedAt}
                  description={article.description}
                >
                  {article.heading}
                </GpArticleCard>
              </li>
            ))}
          </GpCardGrid>
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

export function GpCardGrid({ children }: { children: React.ReactNode }) {
  return (
    <ul className="grid grid-cols-1 gap-3 *:grid md:grid-cols-2 md:gap-6">
      {children}
    </ul>
  );
}
