import { groq } from "next-sanity";
import { GetServerSideProps } from "next/types";
import { Suspense, lazy, useCallback, useEffect, useMemo } from "react";
import { BodyLong, Box, HGrid, Heading, Page, VStack } from "@navikt/ds-react";
import Footer from "@/layout/footer/Footer";
import GpArticleCard from "@/layout/god-praksis-page/cards/GpArticleCard";
import { GpChipNavigation } from "@/layout/god-praksis-page/chips/GpChipNavigation";
import TemaHero from "@/layout/god-praksis-page/hero/tema-hero/TemaHero";
import {
  GpSlugQueryResponse,
  ParsedGPArticle,
} from "@/layout/god-praksis-page/interface";
import { useGpViews } from "@/layout/god-praksis-page/useGpViews";
import Header from "@/layout/header/Header";
import { getClient } from "@/sanity/client.server";
import { NextPageT } from "@/types";
import { dateStr } from "@/utils";
import { SEO } from "@/web/seo/SEO";

const sanityQuery = groq`
{
  "articles": *[_type == "aksel_artikkel" && defined(undertema) && $slug in undertema[]->tema->slug.current] | order(publishedAt desc) {
    _id,
    heading,
    publishedAt,
    "description": ingress,
    "undertema": undertema[]->{title, "temaTitle": tema->title},
    "innholdstype": innholdstype->title,
    "slug": slug.current,
  },
  "tema": *[_type == "gp.tema" && slug.current == $slug][0]{
    ...,
    "slug": slug.current,
    "undertema": *[_type == "gp.tema.undertema" && tema->slug.current == $slug]{
      title,
      description
    }
  },
  "heroNav": *[_type == "gp.tema" && count(*[_type=="aksel_artikkel"
      && (^._id in undertema[]->tema._ref)]) > 0]{
    title,
    "slug": slug.current,
    "image": pictogram,
  }
}
`;

type PageProps = NextPageT<GpSlugQueryResponse>;

export const getServerSideProps: GetServerSideProps = async (
  ctx,
): Promise<PageProps> => {
  const slug = ctx.params?.slug as string;
  const preview = !!ctx.preview;

  const { heroNav, tema, articles } =
    await getClient().fetch<GpSlugQueryResponse>(sanityQuery, {
      slug,
    });

  return {
    props: {
      tema,
      heroNav,
      // Avoids having to format date on client
      articles: await Promise.all(
        articles.map(async (a) => ({
          ...a,
          publishedAt: await dateStr(a.publishedAt),
        })),
      ),
      slug,
      preview,
      id: tema._id ?? "",
      title: tema.title ?? "",
    },
    notFound: !tema || articles.length === 0,
  };
};

/**
 * TODO:
 * - Cleanup after refactor
 * - Add SEO
 * - Add chips
 * - Add preview
 * - Add error handling?
 */
const GpPage = (props: PageProps["props"]) => {
  useEffect(() => {
    window.location.host === "aksel.nav.no" &&
      window.location.replace(`http://aksel.nav.no/404`);
  }, []);

  const view = useGpViews();

  const articles = useMemo(
    () =>
      props.articles
        .map((article) => {
          const undertema = article.undertema.find(
            (ut) => ut?.temaTitle === props.tema.title,
          )?.title;

          return {
            ...article,
            undertema: undertema ?? "",
          } satisfies ParsedGPArticle;
        })
        .filter((article) => !!article.undertema),
    [props.articles, props.tema.title],
  );

  const getUndertemaFromTema = useCallback(
    (undertema: string) => {
      return props.tema.undertema.find((ut) => ut.title === undertema) ?? null;
    },

    [props.tema.undertema],
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

  const ArticleView = () => {
    switch (view.view) {
      case "none": {
        return (
          <>
            {[...articlesByUndertema.entries()].map(([ut, utArticles]) => {
              return (
                <div key={ut.title}>
                  <Heading
                    level="2"
                    size="medium"
                    className="mb-2 text-aksel-heading"
                  >
                    {ut.title}
                  </Heading>
                  {ut.description && (
                    <BodyLong spacing>{ut.description}</BodyLong>
                  )}
                  <HGrid columns={{ xs: 1, md: 2 }} gap={{ xs: "3", md: "6" }}>
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
                  </HGrid>
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
            <Heading
              level="2"
              size="medium"
              className="mb-2 text-aksel-heading"
            >
              {ut.title}
            </Heading>
            {ut.description && <BodyLong spacing>{ut.description}</BodyLong>}

            <HGrid columns={{ xs: 1, md: 2 }} gap={{ xs: "3", md: "6" }}>
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
            </HGrid>
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
                  <Heading
                    level="2"
                    size="medium"
                    className="mb-2 text-aksel-heading"
                  >
                    {ut.title}
                  </Heading>
                  {ut.description && (
                    <BodyLong spacing>{ut.description}</BodyLong>
                  )}
                  <HGrid columns={{ xs: 1, md: 2 }} gap={{ xs: "3", md: "6" }}>
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
                  </HGrid>
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
            <Heading
              level="2"
              size="medium"
              className="mb-2 text-aksel-heading"
            >
              Artikler for {view.undertema} og {view.innholdstype}
            </Heading>
            <HGrid columns={{ xs: 1, md: 2 }} gap={{ xs: "3", md: "6" }}>
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
            </HGrid>
          </div>
        );
      }
      default:
        return null;
    }
  };

  return (
    <>
      {/* TODO: Find out how we want to handle SEO for these pages */}
      <SEO
        title={props.tema?.title ?? ""}
        /* description={page?.seo?.meta} */
        /* image={page?.seo?.image} */
      />
      <Page
        footer={<Footer />}
        footerPosition="belowFold"
        className="bg-surface-subtle"
      >
        <Header variant="subtle" />
        <Box paddingBlock="10">
          <Page.Block width="xl" gutters>
            <VStack gap="10">
              <TemaHero tema={props.tema} heroNav={props.heroNav} />
              <Box paddingInline={{ xs: "4", lg: "10" }}>
                <GpChipNavigation articles={articles} />

                <VStack gap="10" className="mt-10">
                  <ArticleView />
                </VStack>
              </Box>
            </VStack>
          </Page.Block>
        </Box>
      </Page>
    </>
  );
};

const WithPreview = lazy(() => import("@/preview"));

const Wrapper = (props: any) => {
  if (props?.preview) {
    return (
      <Suspense fallback={<GpPage {...props} />}>
        <WithPreview
          comp={GpPage}
          query={sanityQuery}
          props={props}
          params={{
            slug: props?.slug,
          }}
        />
      </Suspense>
    );
  }

  return <GpPage {...props} />;
};

export default Wrapper;
