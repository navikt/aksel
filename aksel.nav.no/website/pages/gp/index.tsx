import { groq } from "next-sanity";
import { GetStaticProps } from "next/types";
import { Suspense, lazy, useEffect } from "react";
import { Box, HStack, Page, VStack } from "@navikt/ds-react";
import Footer from "@/layout/footer/Footer";
import GpHeroCard from "@/layout/god-praksis-page/cards/HeroCard";
import StaticHero from "@/layout/god-praksis-page/hero/StaticHero";
import { groupArticles } from "@/layout/god-praksis-page/initial-load/group-articles";
import { initialGpMainPageArticles } from "@/layout/god-praksis-page/interface";
import Header from "@/layout/header/Header";
import { getClient } from "@/sanity/client.server";
import { NextPageT } from "@/types";
import { SEO } from "@/web/seo/SEO";

type GpTemaList = {
  temaList: { title: string; slug: string; refCount: number }[];
};

type PageProps = NextPageT<GpTemaList>;

const query = groq`
{
  ${initialGpMainPageArticles}
}
`;
type QueryResponse = GpTemaList;

export const testQ = groq`
{
  "temaList": *[_type == "gp.tema"] | order(lower(title)){
    title,
    "slug": slug.current,
    "refCount": count(*[_type=="aksel_artikkel"
      && (^._id in undertema[]->tema._ref)])
  }
}
`;

export const getStaticProps: GetStaticProps = async ({
  preview = false,
}): Promise<PageProps> => {
  const { temaList } = await getClient().fetch<QueryResponse>(testQ);

  return {
    props: {
      temaList,
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
                  {props.temaList.map((tema) => (
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
          query={query}
          props={props}
          resolvers={[
            {
              key: "heroNav",
              dataKeys: ["heroNav"],
              cb: (v) => v[0]?.filter((x) => x.hasRefs),
            },
            {
              key: "initialArticles",
              dataKeys: ["initialInnholdstype"],
              cb: (v) =>
                groupArticles({
                  initialInnholdstype: v[0],
                }),
            },
            {
              key: "chipsData",
              dataKeys: ["chipsDataAll"],
              cb: (v) => chipsDataForAllTema(v[0]),
            },
          ]}
        />
      </Suspense>
    );
  }

  return <GpPage {...props} />;
};

export default Wrapper;
