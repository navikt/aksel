import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import cl from "clsx";
import { groq } from "next-sanity";
import NextLink from "next/link";
import { GetStaticProps } from "next/types";
import {
  BodyLong,
  Box,
  Heading,
  Link,
  Page,
  Stack,
  VStack,
} from "@navikt/ds-react";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";
import Footer from "@/layout/footer/Footer";
import { GpCardGrid } from "@/layout/god-praksis-page/ArticleSections";
import GpArticleCard from "@/layout/god-praksis-page/cards/GpArticleCard";
import GpHeroCard from "@/layout/god-praksis-page/cards/GpHeroCard";
import IntroHero from "@/layout/god-praksis-page/hero/intro-hero/IntroHero";
import Header from "@/layout/header/Header";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity/client.server";
import { destructureBlocks } from "@/sanity/queries";
import { AkselGodPraksisLandingPageDocT, NextPageT } from "@/types";
import { AnimatedChevron } from "@/web/AnimatedChevron";
import { SEO } from "@/web/seo/SEO";

type GpTemaList = {
  page: AkselGodPraksisLandingPageDocT;
  tema: {
    title: string;
    description: string;
    slug: string;
    refCount: number;
    pictogram: SanityImageSource;
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
      && (^._id in undertema[]->tema._ref)] {
        heading,
        "slug": slug.current,
        "undertema": undertema[]->{title, "temaTitle": tema->title},
        "innholdstype": innholdstype->title,
        "views": *[_type == "article_views" && article_ref._ref == ^._id][0].views_month
      } | order(coalesce(views, -1) desc)[0...4]{
        heading,
        slug,
        undertema,
        innholdstype
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
  return (
    <>
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
        <Box
          paddingBlock="10"
          as="main"
          tabIndex={-1}
          id="hovedinnhold"
          className="animate-popUpPage focus:outline-none"
        >
          <Page.Block width="xl" gutters>
            <VStack gap="10">
              <IntroHero title="God praksis">
                {props.page.intro && (
                  <SanityBlockContent
                    isIngress
                    blocks={props.page.intro}
                    className="mt-4"
                  />
                )}
                <nav aria-label="Temavelger">
                  <Stack
                    className="mt-6"
                    gap={{ xs: "4", md: "6" }}
                    wrap
                    direction={{ xs: "column", md: "row" }}
                    as="ul"
                  >
                    {props.tema
                      .filter((x) => x.refCount > 0)
                      .map((tema) => (
                        <li key={tema.slug}>
                          <GpHeroCard
                            articleCount={tema.refCount}
                            href={`god-praksis/${tema.slug}`}
                            image={tema.pictogram}
                          >
                            {tema.title}
                          </GpHeroCard>
                        </li>
                      ))}
                  </Stack>
                </nav>
              </IntroHero>
              <Box paddingInline={{ xs: "4", lg: "10" }}>
                <VStack gap="12">
                  {props.tema
                    .filter((x) => x.refCount > 0)
                    .map((tema) => {
                      return (
                        <section
                          key={tema.slug}
                          aria-label={`Tema ${tema.title}`}
                        >
                          <Heading
                            level="2"
                            size="medium"
                            className={cl("text-aksel-heading", {
                              "mb-4": !tema.description,
                              "mb-2": tema.description,
                            })}
                          >
                            {tema.title}
                          </Heading>
                          {tema.description && (
                            <BodyLong className="mb-6">
                              {tema.description}
                            </BodyLong>
                          )}
                          <GpCardGrid>
                            {tema.articles.map((article) => (
                              <li key={article.slug}>
                                <GpArticleCard
                                  href={article.slug}
                                  innholdstype={article.innholdstype}
                                  undertema={
                                    article.undertema.find(
                                      (ut) => ut?.temaTitle === tema.title,
                                    )?.title
                                  }
                                >
                                  {article.heading}
                                </GpArticleCard>
                              </li>
                            ))}
                          </GpCardGrid>

                          <Link
                            href={`/god-praksis/${tema.slug}`}
                            as={NextLink}
                            className="group mt-4 w-fit text-deepblue-700"
                            onClick={() =>
                              umamiTrack("navigere", {
                                kilde: "god praksis forside",
                                url: `/god-praksis/${tema.slug}`,
                              })
                            }
                          >
                            <h3 className="flex items-center">
                              {`Alt fra ${tema.title} `}
                              <AnimatedChevron scale="inline" />
                            </h3>
                          </Link>
                        </section>
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

/**
 * To avoid infinite loop rendering caused by `count` in query, we avoid showing preview for this page.
 */
export default function GpFrontpage(props: PageProps["props"]) {
  return <GpPage {...props} />;
}
