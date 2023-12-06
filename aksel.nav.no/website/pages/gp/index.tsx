import { groq } from "next-sanity";
import { GetStaticProps } from "next/types";
import { Suspense, lazy } from "react";
import GodPraksisPage from "@/layout/god-praksis-page/GodPraksisPage";
import {
  heroNavQuery,
  innholdstypeQuery,
} from "@/layout/god-praksis-page/queries";
import {
  GpArticleListT,
  GpEntryPageProps,
  GpInnholdstypeT,
  HeroNavT,
} from "@/layout/god-praksis-page/types";
import { getClient } from "@/sanity/client.server";
import { NextPageT } from "@/types";
import { SEO } from "@/web/seo/SEO";

type PageProps = NextPageT<GpEntryPageProps>;

const query = groq`
{
  ${heroNavQuery},
  ${innholdstypeQuery},
  "articles": *[_type == "aksel_artikkel" && defined(undertema)] | order(publishedAt desc){
    heading,
    ingress ,
    "undertema": undertema[]->title,
    "innholdstype": innholdstype->title,
    "slug": slug.current
  }
}
`;

export const getStaticProps: GetStaticProps = async ({
  preview = false,
}): Promise<PageProps> => {
  const {
    heroNav,
    articles,
    innholdstype,
  }: GpArticleListT & HeroNavT & GpInnholdstypeT = await getClient().fetch(
    query
  );

  return {
    props: {
      tema: null,
      views: [
        {
          title: "Siste",
          articles,
        },
      ],
      heroNav: heroNav.filter((x) => x.hasRefs),
      innholdstype: innholdstype.filter((x) => x.hasRefs),
      preview,
      id: "",
      title: "",
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
          resolvers={[
            {
              key: "views",
              dataKeys: ["articles"],
              cb: (v) => {
                return [
                  {
                    title: "Siste",
                    articles: v[0],
                  },
                ];
              },
            },
            {
              key: "articles",
              dataKeys: ["articles"],
              cb: () => {
                return undefined;
              },
            },
          ]}
        />
      </Suspense>
    );
  }

  return <GpPage {...props} />;
};

export default Wrapper;
