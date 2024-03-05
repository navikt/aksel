import { groq } from "next-sanity";
import { GetStaticPaths } from "next/types";
import { Suspense, lazy, useEffect } from "react";
import GodPraksisPage from "@/layout/god-praksis-page/GodPraksisPage";
import { groupByTema } from "@/layout/god-praksis-page/chips/dataTransforms";
import { groupArticles } from "@/layout/god-praksis-page/initial-load/group-articles";
import {
  GpEntryPageProps,
  chipsDataAllQuery,
  chipsDataAllQueryResponse,
  heroNavQuery,
  heroNavQueryResponse,
  initialTemaPageArticles,
  initialTemaPageArticlesResponse,
  temaQuery,
  temaQueryResponse,
} from "@/layout/god-praksis-page/interface";
import { getClient } from "@/sanity/client.server";
import { getGpTema } from "@/sanity/interface";
import { NextPageT } from "@/types";
import { SEO } from "@/web/seo/SEO";

type PageProps = NextPageT<GpEntryPageProps>;

const query = groq`
{
  ${heroNavQuery},
  ${temaQuery},
  ${chipsDataAllQuery},
  ${initialTemaPageArticles},
}
`;
type QueryResponse = chipsDataAllQueryResponse &
  heroNavQueryResponse &
  temaQueryResponse &
  initialTemaPageArticlesResponse;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: await getGpTema().then((paths) =>
      paths.map(({ path }) => ({
        params: {
          slug: path,
        },
      })),
    ),
    fallback: "blocking",
  };
};

export const getStaticProps = async ({
  params: { slug },
  preview = false,
}: {
  params: { slug: string };
  preview?: boolean;
}): Promise<PageProps> => {
  const { heroNav, tema, initialInnholdstype, initialUndertema, chipsDataAll } =
    await getClient().fetch<QueryResponse>(query, {
      slug,
    });

  const chipsData = groupByTema(chipsDataAll)[slug];

  return {
    props: {
      tema,
      heroNav: heroNav.filter((x) => x.hasRefs),
      initialArticles: groupArticles({ initialInnholdstype, initialUndertema }),
      slug,
      preview,
      id: "",
      title: "",
      chipsData: groupByTema(chipsDataAll)[slug],
    },
    notFound: !tema || !heroNav.some((nav) => nav.slug === slug) || !chipsData,
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
        title={props.tema?.title ?? ""}
        /* description={page?.seo?.meta} */
        /* image={page?.seo?.image} */
      />
      <GodPraksisPage {...props} />
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
          params={{
            slug: props?.slug,
          }}
          resolvers={[
            {
              key: "heroNav",
              dataKeys: ["heroNav"],
              cb: (v) => v[0]?.filter((x) => x.hasRefs),
            },
            {
              key: "initialArticles",
              dataKeys: ["initialInnholdstype", "initialUndertema"],
              cb: (v) =>
                groupArticles({
                  initialInnholdstype: v[0],
                  initialUndertema: v[1],
                }),
            },
            {
              key: "chipsData",
              dataKeys: ["chipsDataAll"],
              cb: (v) => groupByTema(v[0])[props?.slug],
            },
          ]}
        />
      </Suspense>
    );
  }

  return <GpPage {...props} />;
};

export default Wrapper;
