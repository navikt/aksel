import { groq } from "next-sanity";
import { GetServerSideProps } from "next/types";
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
  GpTemaT,
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
  "tema": *[_type == "gp.tema" && slug.current == $slug][0]{
    ...,
    "slug": slug.current,
    "undertema": *[_type == "gp.tema.undertema" && tema->slug.current == $slug && count(*[_type == "aksel_artikkel" && references(^._id)]) > 0]{
      title,
      description
    }
  },
  "articles": *[_type == "aksel_artikkel" && $slug in undertema[]->tema->slug.current] | order(publishedAt desc) {
    heading,
    ingress ,
    "undertema": undertema[]->title,
    "innholdstype": innholdstype->title,
    "slug": slug.current
  }
}
`;

export const getServerSideProps: GetServerSideProps = async (
  ctx
): Promise<PageProps> => {
  const {
    heroNav,
    tema,
    innholdstype,
    articles,
  }: HeroNavT & GpTemaT & GpInnholdstypeT & GpArticleListT =
    await getClient().fetch(query, {
      slug: ctx.params.slug,
    });

  return {
    props: {
      views: [
        {
          title: "Siste",
          articles,
        },
      ],
      tema,
      heroNav: heroNav.filter((x) => x.refs?.length > 0),
      innholdstype: innholdstype.filter((x) => x.refs?.length > 0),
      slug: ctx.params.slug as string,
      preview: ctx.preview ?? false,
      id: "",
      title: "",
    },
    notFound: !tema || !heroNav.some((nav) => nav.slug === ctx.params.slug),
  };
};

const GpPage = (props: PageProps["props"]) => {
  return (
    <>
      <SEO
        title={props.tema.title ?? ""}
        /* description={page?.seo?.meta} */
        /* image={page?.seo?.image} */
      />
      <GodPraksisPage {...props} type="tema-page" />
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
        />
      </Suspense>
    );
  }

  return <GpPage {...props} />;
};

export default Wrapper;
