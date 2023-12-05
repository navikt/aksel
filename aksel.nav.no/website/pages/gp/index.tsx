import { groq } from "next-sanity";
import { GetServerSideProps } from "next/types";
import { Suspense, lazy } from "react";
import GodPraksisPage from "@/layout/god-praksis-page/GodPraksisPage";
import { GpPageContext } from "@/layout/god-praksis-page/context";
import {
  heroNavQuery,
  innholdstypeQuery,
} from "@/layout/god-praksis-page/queries";
import {
  GpArticleListT,
  GpFrontPageProps,
  GpInnholdstypeT,
  HeroNavT,
} from "@/layout/god-praksis-page/types";
import { getClient } from "@/sanity/client.server";
import { NextPageT } from "@/types";
import { SEO } from "@/web/seo/SEO";

type PageProps = NextPageT<GpFrontPageProps>;

const query = groq`
{
  ${heroNavQuery},
  ${innholdstypeQuery},
  "articles": *[_type == "aksel_artikkel" && defined(undertema)] {
    heading,
    ingress ,
    "undertema": undertema[]->title,
    "innholdstype": innholdstype->title,
    slug
  }
}
`;

export const getServerSideProps: GetServerSideProps = async (
  ctx
): Promise<PageProps> => {
  const {
    heroNav,
    articles,
    innholdstype,
  }: GpArticleListT & HeroNavT & GpInnholdstypeT = await getClient().fetch(
    query
  );

  return {
    props: {
      articles,
      heroNav,
      innholdstype,
      preview: ctx.preview ?? false,
      id: "",
      title: "",
    },
    notFound: false,
  };
};

const GpPage = (props: PageProps["props"]) => {
  return (
    <GpPageContext.Provider value={{ ...props, type: "frontpage" }}>
      <SEO
        title="God praksis"
        /* description={page?.seo?.meta} */
        /* image={page?.seo?.image} */
      />
      <GodPraksisPage articles={props.articles} />
    </GpPageContext.Provider>
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
