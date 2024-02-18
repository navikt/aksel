import { groq } from "next-sanity";
import { GetStaticProps } from "next/types";
import { useEffect } from "react";
import { PagePreview } from "@/draftmode/PagePreview";
import { getDraftClient } from "@/draftmode/client";
import { draftmodeToken, viewerToken } from "@/draftmode/token";
import GodPraksisPage from "@/layout/god-praksis-page/GodPraksisPage";
import { chipsDataForAllTema } from "@/layout/god-praksis-page/chips/dataTransforms";
import { groupArticles } from "@/layout/god-praksis-page/initial-load/group-articles";
import {
  GpEntryPageProps,
  chipsDataAllQuery,
  chipsDataAllQueryResponse,
  heroNavQuery,
  heroNavQueryResponse,
  initialGpMainPageArticles,
  initialGpMainPageArticlesResponse,
} from "@/layout/god-praksis-page/interface";
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

export const getStaticProps: GetStaticProps = async ({
  draftMode = false,
}): Promise<PageProps> => {
  const client = getDraftClient({
    draftMode,
    token: draftMode ? draftmodeToken : viewerToken,
  });

  const { heroNav, initialInnholdstype, chipsDataAll } =
    await client.fetch<QueryResponse>(query);

  return {
    props: {
      tema: null,
      heroNav: heroNav.filter((x) => x.hasRefs),
      initialArticles: groupArticles({
        initialInnholdstype,
      }),
      id: "",
      title: "",
      chipsData: chipsDataForAllTema(chipsDataAll),
      draftMode,
      token: draftMode ? draftmodeToken : "",
    },
    notFound: false,
    revalidate: 60,
  };
};

export default function GPFrontpage(props: PageProps["props"]) {
  return props.draftMode ? (
    <PagePreview query={query} props={props}>
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
            })}
            chipsData={chipsDataForAllTema(_props?.chipsDataAll)}
          />
        );
      }}
    </PagePreview>
  ) : (
    <GpPage {...props} />
  );
}
