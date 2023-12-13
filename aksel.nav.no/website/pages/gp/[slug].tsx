import { groq } from "next-sanity";
import { GetStaticPaths, GetStaticProps } from "next/types";
import { Suspense, lazy } from "react";
import GodPraksisPage from "@/layout/god-praksis-page/GodPraksisPage";
import { groupByTema } from "@/layout/god-praksis-page/chips/dataTransforms";
import { groupArticles } from "@/layout/god-praksis-page/initial-load/group-articles";
import {
  chipsDataAllQuery,
  chipsDataAllQueryResponse,
  heroNavQuery,
  heroNavQueryResponse,
  initialTemaPageArticles,
  initialTemaPageArticlesResponse,
  temaQuery,
  temaQueryResponse,
} from "@/layout/god-praksis-page/queries";
import { GpEntryPageProps } from "@/layout/god-praksis-page/types";
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
      }))
    ),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({
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
    notFound: !tema || !heroNav.some((nav) => nav.slug === slug),
    revalidate: 60,
  };
};

const GpPage = (props: PageProps["props"]) => {
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

const WithPreview = lazy(() => import("@/preview"));

/**
 * TODO:
 * - Preview does not work atm because of
 * ```heroNav: heroNav.filter((x) => x.hasRefs),
      chipsInnholdstype: chipsInnholdstype.find((x) => x.slug === slug).types,
      chipsUndertema: chipsUndertema
        .filter((c) => c.tema === slug)
        .map((c) => ({ title: c.title, count: c.count })),
      initialArticles: groupArticles({ initialInnholdstype, initialUndertema }),
      ```
      Where data is resolves in initialProps
 */
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
        />
      </Suspense>
    );
  }

  return <GpPage {...props} />;
};

export default Wrapper;
