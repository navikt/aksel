import { groq } from "next-sanity";
import { GetStaticProps } from "next/types";
import { Suspense, lazy, useEffect } from "react";
import GodPraksisPage from "@/layout/god-praksis-page/GodPraksisPage";
import { chipsDataForAllTema } from "@/layout/god-praksis-page/chips/dataTransforms";
import { groupArticles } from "@/layout/god-praksis-page/initial-load/group-articles";
import {
  chipsDataAllQuery,
  chipsDataAllQueryResponse,
  heroNavQuery,
  heroNavQueryResponse,
  initialGpMainPageArticles,
  initialGpMainPageArticlesResponse,
} from "@/layout/god-praksis-page/queries";
import { GpEntryPageProps } from "@/layout/god-praksis-page/types";
import { getClient } from "@/sanity/client.server";
import { NextPageT } from "@/types";
import { SEO } from "@/web/seo/SEO";

type PageProps = NextPageT<GpEntryPageProps>;

const query = groq`
{
  ${heroNavQuery},
  ${chipsDataAllQuery},
  ${initialGpMainPageArticles}
}
`;
type QueryResponse = heroNavQueryResponse &
  chipsDataAllQueryResponse &
  initialGpMainPageArticlesResponse;

export const getStaticProps: GetStaticProps = async ({
  preview = false,
}): Promise<PageProps> => {
  const { heroNav, initialInnholdstype, chipsDataAll } =
    await getClient().fetch<QueryResponse>(query);

  return {
    props: {
      tema: null,
      heroNav: heroNav.filter((x) => x.hasRefs),
      initialArticles: groupArticles({
        initialInnholdstype,
      }),
      preview,
      id: "",
      title: "",
      chipsData: chipsDataForAllTema(chipsDataAll),
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
      <GodPraksisPage {...props} />
    </>
  );
};

const WithPreview = lazy(() => import("@/preview"));

/**
 * TODO: Preview does not work atm because of funcitions used in getStaticProps
 */
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
