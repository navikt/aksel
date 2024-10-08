import { groq } from "next-sanity";
import { GetServerSideProps } from "next/types";
import { useMemo } from "react";
import { Box, Page, VStack } from "@navikt/ds-react";
import Footer from "@/layout/footer/Footer";
import { ArticleSections } from "@/layout/god-praksis-page/ArticleSections";
import { GpChipNavigation } from "@/layout/god-praksis-page/chipnavigation/GpChipNavigation";
import TemaHero from "@/layout/god-praksis-page/hero/tema-hero/TemaHero";
import {
  GpSlugQueryResponse,
  ParsedGPArticle,
} from "@/layout/god-praksis-page/interface";
import Header from "@/layout/header/Header";
import { getClient } from "@/sanity/client.server";
import { NextPageT } from "@/types";
import { dateStr } from "@/utils";
import { SEO } from "@/web/seo/SEO";
import {
  ArticleSortOrder,
  getArticleSortOrder,
} from "../../components/utils/sort-by-cookie";

const sanityQuery = groq`
{
  "articles": *[_type == "aksel_artikkel" && defined(undertema) && $slug in undertema[]->tema->slug.current] | order(updateInfo.lastVerified desc) {
    _id,
    heading,
    "displayDate": updateInfo.lastVerified,
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
    },
    "image": pictogram,
  },
  "heroNav": *[_type == "gp.tema" && count(*[_type=="aksel_artikkel"
      && (^._id in undertema[]->tema._ref)]) > 0] | order(lower(title)){
    title,
    "slug": slug.current,
    "image": pictogram,
    "imageInverted": pictogramInverted,
  }
}
`;

type PageProps = NextPageT<
  GpSlugQueryResponse & { articleSortOrdering: ArticleSortOrder }
>;

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
      // Avoids having to format date clientside
      articles: await Promise.all(
        articles.map(async (a) => ({
          ...a,
          displayDate: await dateStr(a.displayDate),
        })),
      ),
      articleSortOrdering: getArticleSortOrder(ctx.req.cookies) ?? {},
      slug,
      preview,
      id: tema?._id ?? "",
      title: tema?.title ?? "",
    },
    notFound: !tema || articles.length === 0,
  };
};

const GpPage = (props: PageProps["props"]) => {
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
        .filter((article) => !!article.undertema)
        /* Makes sure sections always appear in the same order */
        .sort((a, b) => a.undertema.localeCompare(b.undertema)),
    [props.articles, props.tema.title],
  );

  return (
    <>
      <SEO
        title={props.tema?.title ?? ""}
        description={props.tema?.seo?.meta ?? props.tema.description}
        image={props.tema?.seo?.image}
      />
      <Page
        footer={<Footer />}
        footerPosition="belowFold"
        className="bg-surface-subtle"
      >
        <Header variant="subtle" />
        <Box
          paddingBlock="10"
          as="main"
          tabIndex={-1}
          id="hovedinnhold"
          className="animate-popUpPage focus:outline-none"
          key={props.tema?.title}
        >
          <Page.Block width="xl" gutters>
            <VStack gap="10">
              <TemaHero tema={props.tema} heroNav={props.heroNav} />
              <Box paddingInline={{ xs: "4", lg: "10" }}>
                <GpChipNavigation articles={articles} />

                <VStack gap="12" className="mt-10">
                  <ArticleSections
                    articles={articles}
                    undertemaList={props.tema.undertema}
                    tema={props.tema.title}
                    articleSortOrdering={props.articleSortOrdering}
                  />
                </VStack>
              </Box>
            </VStack>
          </Page.Block>
        </Box>
      </Page>
    </>
  );
};

/**
 * To avoid infinite loop rendering caused by `count` in query, we avoid showing preview for this page.
 */
export default function TemaPage(props: PageProps["props"]) {
  return <GpPage {...props} />;
}
