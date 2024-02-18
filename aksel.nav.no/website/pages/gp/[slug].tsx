import { groq } from "next-sanity";
import { GetStaticPaths, GetStaticProps } from "next/types";
import { useEffect } from "react";
import { PagePreview } from "@/draftmode/PagePreview";
import { getDraftClient } from "@/draftmode/client";
import { draftmodeToken, viewerToken } from "@/draftmode/token";
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

const GpPage = (props: PageProps["props"]) => {
  useEffect(() => {
    window.location.host === "aksel.nav.no" &&
      window.location.replace(`http://aksel.nav.no/404`);
  }, []);

  return (
    <>
      {/* TODO: Find out how we want to handle SEO for these pages */}
      <SEO
        title={props.tema.title ?? ""}
        /* description={page?.seo?.meta} */
        /* image={page?.seo?.image} */
      />
      <GodPraksisPage {...props} />
    </>
  );
};

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

export const getStaticProps: GetStaticProps = async ({
  params: { slug },
  draftMode = false,
}: {
  params: { slug: string };
  draftMode?: boolean;
}): Promise<PageProps> => {
  const client = getDraftClient({
    draftMode,
    token: draftMode ? draftmodeToken : viewerToken,
  });

  const { heroNav, tema, initialInnholdstype, initialUndertema, chipsDataAll } =
    await client.fetch<QueryResponse>(query, {
      slug,
    });

  const chipsData = groupByTema(chipsDataAll)[slug];

  return {
    props: {
      tema,
      heroNav: heroNav.filter((x) => x.hasRefs),
      initialArticles: groupArticles({ initialInnholdstype, initialUndertema }),
      slug,
      id: "",
      title: "",
      chipsData: groupByTema(chipsDataAll)[slug],
      draftMode,
      token: draftMode ? draftmodeToken : "",
    },
    notFound: !tema || !heroNav.some((nav) => nav.slug === slug) || !chipsData,
    revalidate: 60,
  };
};

export default function GPCategoryPage(props: PageProps["props"]) {
  return props.draftMode ? (
    <PagePreview
      query={query}
      props={props}
      params={{
        slug: props?.slug,
      }}
    >
      {(_props, loading) => {
        if (loading) {
          return <GpPage {...props} />;
        }
        return (
          <GpPage
            {..._props}
            heroNav={_props?.heroNav.filter((x) => x.hasRefs)}
            initialArticles={groupArticles({
              initialInnholdstype: _props?.initialInnholdstype,
              initialUndertema: _props?.initialUndertema,
            })}
            chipsData={groupByTema(_props?.chipsDataAll)[props?.slug]}
          />
        );
      }}
    </PagePreview>
  ) : (
    <GpPage {...props} />
  );
}
