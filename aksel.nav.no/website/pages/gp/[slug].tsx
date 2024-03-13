import { groq } from "next-sanity";
import { GetServerSideProps } from "next/types";
import { Suspense, lazy, useEffect, useMemo } from "react";
import { Box, Page, VStack } from "@navikt/ds-react";
import Footer from "@/layout/footer/Footer";
import { ArticleView } from "@/layout/god-praksis-page/ArticleView";
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
      // Avoids having to format date clientside
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

const GpPage = (props: PageProps["props"]) => {
  useEffect(() => {
    window.location.host === "aksel.nav.no" &&
      window.location.replace(`http://aksel.nav.no/404`);
  }, []);

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

  return (
    <>
      <SEO
        title={props.tema?.title ?? ""}
        description={props.tema?.seo?.meta}
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
          className="focus:outline-none"
        >
          <Page.Block width="xl" gutters>
            <VStack gap="10">
              <TemaHero tema={props.tema} heroNav={props.heroNav} />
              <Box paddingInline={{ xs: "4", lg: "10" }}>
                <GpChipNavigation articles={articles} />

                <VStack gap="10" className="mt-10">
                  <ArticleView
                    articles={articles}
                    undertemaList={props.tema.undertema}
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
