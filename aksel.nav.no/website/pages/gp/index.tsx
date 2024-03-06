import { groq } from "next-sanity";
import NextLink from "next/link";
import { GetStaticProps } from "next/types";
import { Suspense, lazy, useEffect } from "react";
import {
  BodyLong,
  Box,
  HGrid,
  Heading,
  Link,
  Page,
  Stack,
  VStack,
} from "@navikt/ds-react";
import Footer from "@/layout/footer/Footer";
import GpCompactCard from "@/layout/god-praksis-page/cards/CompactCard";
import GpHeroCard from "@/layout/god-praksis-page/cards/HeroCard";
import StaticHero from "@/layout/god-praksis-page/hero/StaticHero";
import Header from "@/layout/header/Header";
import { amplitudeLogNavigation } from "@/logging";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity/client.server";
import { destructureBlocks } from "@/sanity/queries";
import { AkselGodPraksisLandingPageDocT, NextPageT } from "@/types";
import { SEO } from "@/web/seo/SEO";

type GpTemaList = {
  page: AkselGodPraksisLandingPageDocT;
  tema: {
    title: string;
    description: string;
    slug: string;
    refCount: number;
    pictogram: any;
    articles: {
      heading: string;
      slug: string;
      undertema: { title: string; temaTitle: string }[];
      innholdstype: string;
    }[];
  }[];
};

type PageProps = NextPageT<GpTemaList>;

export const query = groq`
{
  "page": *[_type == "godpraksis_landingsside"][0]{
    ...,
    intro[]{
      ...,
      ${destructureBlocks}
    }
  },
  "tema": *[_type == "gp.tema"] | order(lower(title)){
    title,
    description,
    pictogram,
    "slug": slug.current,
    "refCount": count(*[_type=="aksel_artikkel"
      && (^._id in undertema[]->tema._ref)]),
    "articles": *[_type=="aksel_artikkel"
      && (^._id in undertema[]->tema._ref)]| order(publishedAt desc)[0...4] {
        heading,
        "slug": slug.current,
        "undertema": undertema[]->{title, "temaTitle": tema->title},
        "innholdstype": innholdstype->title
      },
  }
}
`;

export const getStaticProps: GetStaticProps = async ({
  preview = false,
}): Promise<PageProps> => {
  const { tema, page } = await getClient().fetch<GpTemaList>(query);

  return {
    props: {
      page,
      tema,
      preview,
      id: "godpraksis_landingsside_id1",
      title: "God praksis forside",
    },
    notFound: false,
    revalidate: 60,
  };
};

const GpPage = (props: PageProps["props"]) => {
  useEffect(() => {
    window.location.host === "aksel.nav.no" &&
      window.location.replace(`http://aksel.nav.no/404`);
  }, []);

  return (
    <>
      {/* TODO: Find out how we want to handle SEO for these pages */}
      <SEO
        title="God praksis"
        description={props.page?.seo?.meta}
        image={props.page?.seo?.image}
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
              <StaticHero title="God praksis">
                {props.page.intro && (
                  <SanityBlockContent
                    isIngress
                    blocks={props.page.intro}
                    className="mt-4"
                  />
                )}
                <Stack
                  className="mt-10"
                  gap={{ xs: "4", md: "6" }}
                  wrap
                  direction={{ xs: "column", md: "row" }}
                >
                  {props.tema
                    .filter((x) => x.refCount > 0)
                    .map((tema) => (
                      <GpHeroCard
                        key={tema.slug}
                        articleCount={tema.refCount}
                        href={`gp/${tema.slug}`}
                        image={tema.pictogram}
                      >
                        {tema.title}
                      </GpHeroCard>
                    ))}
                </Stack>
              </StaticHero>
              <Box paddingInline={{ xs: "4", lg: "10" }}>
                <VStack gap="10">
                  {props.tema
                    .filter((x) => x.refCount > 0)
                    .map((tema) => {
                      return (
                        <div key={tema.slug}>
                          <Link
                            href={`/gp/${tema.slug}`}
                            as={NextLink}
                            className="mb-2 text-aksel-heading"
                            onClick={(e) =>
                              amplitudeLogNavigation(
                                "link",
                                e.currentTarget.getAttribute("href"),
                              )
                            }
                          >
                            <Heading level="2" size="medium">
                              {tema.title}
                            </Heading>
                          </Link>
                          <BodyLong spacing>{tema.description}</BodyLong>
                          <HGrid
                            columns={{ xs: 1, md: 2 }}
                            gap={{ xs: "3", md: "6" }}
                          >
                            {tema.articles.map((article) => (
                              <GpCompactCard
                                key={article.slug}
                                href={`${article.slug}`.replace(
                                  "god-praksis",
                                  "gp",
                                )}
                                innholdstype={article.innholdstype}
                                undertema={
                                  article.undertema.find(
                                    (ut) => ut?.temaTitle === tema.title,
                                  )?.title
                                }
                              >
                                {article.heading}
                              </GpCompactCard>
                            ))}
                          </HGrid>

                          <Link
                            href={`/gp/${tema.slug}`}
                            as={NextLink}
                            className="mt-4"
                            onClick={(e) =>
                              amplitudeLogNavigation(
                                "gp-se-alle-link",
                                e.currentTarget.getAttribute("href"),
                              )
                            }
                          >
                            Se alle
                          </Link>
                        </div>
                      );
                    })}
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
        <WithPreview comp={GpPage} query={query} props={props} />
      </Suspense>
    );
  }

  return <GpPage {...props} />;
};

export default Wrapper;
