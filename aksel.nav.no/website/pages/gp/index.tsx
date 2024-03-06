import { groq } from "next-sanity";
import NextLink from "next/link";
import { GetStaticProps } from "next/types";
import { Suspense, lazy, useEffect } from "react";
import {
  BodyLong,
  Box,
  HGrid,
  HStack,
  Heading,
  Link,
  Page,
  VStack,
} from "@navikt/ds-react";
import Footer from "@/layout/footer/Footer";
import GpCompactCard from "@/layout/god-praksis-page/cards/CompactCard";
import GpHeroCard from "@/layout/god-praksis-page/cards/HeroCard";
import StaticHero from "@/layout/god-praksis-page/hero/StaticHero";
import Header from "@/layout/header/Header";
import { getClient } from "@/sanity/client.server";
import { NextPageT } from "@/types";
import { SEO } from "@/web/seo/SEO";

type GpTemaList = {
  tema: {
    title: string;
    description: string;
    slug: string;
    refCount: number;
    articles: { heading: string; slug: string }[];
  }[];
};

type PageProps = NextPageT<GpTemaList>;

export const query = groq`
{
  "tema": *[_type == "gp.tema"] | order(lower(title)){
    title,
    description,
    "slug": slug.current,
    "refCount": count(*[_type=="aksel_artikkel"
      && (^._id in undertema[]->tema._ref)]),
    "articles": *[_type=="aksel_artikkel"
      && (^._id in undertema[]->tema._ref)]| order(publishedAt desc)[0...4] {
        heading,
        "slug": slug.current,
      },
  }
}
`;

/**
 * TODO:
 * - hente ut faktiske undertema og innholdstype
 */
export const getStaticProps: GetStaticProps = async ({
  preview = false,
}): Promise<PageProps> => {
  const { tema } = await getClient().fetch<GpTemaList>(query);

  return {
    props: {
      tema,
      preview,
      id: "",
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
              <StaticHero
                title="God praksis"
                description="Mange som jobber med produktutvikling i NAV sitter på kunnskap og erfaring som er nyttig for oss alle. Det er god praksis som vi deler her."
              >
                <HStack gap="6" wrap>
                  {props.tema
                    .filter((x) => x.refCount > 0)
                    .map((tema) => (
                      <GpHeroCard
                        key={tema.slug}
                        articleCount={tema.refCount}
                        href={`gp/${tema.slug}`}
                      >
                        {tema.title}
                      </GpHeroCard>
                    ))}
                </HStack>
              </StaticHero>
              <Box paddingInline={{ xs: "4", lg: "10" }}>
                <VStack gap="10">
                  {props.tema
                    .filter((x) => x.refCount > 0)
                    .map((tema) => {
                      return (
                        <div key={tema.slug}>
                          <Heading
                            level="2"
                            size="medium"
                            className="text-aksel-heading"
                            spacing
                          >
                            {tema.title}
                          </Heading>
                          <BodyLong spacing>{tema.description}</BodyLong>
                          <HGrid
                            columns={{ xs: 1, md: 2 }}
                            gap={{ xs: "3", md: "6" }}
                          >
                            {tema.articles.map((article) => (
                              <GpCompactCard
                                key={article.slug}
                                href={`gp/artikkel/${article.slug}`}
                              >
                                {article.heading}
                              </GpCompactCard>
                            ))}
                          </HGrid>
                          <Link
                            href={`gp/${tema.slug}`}
                            as={NextLink}
                            className="mt-6"
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
