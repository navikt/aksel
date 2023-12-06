import { groq } from "next-sanity";
import { GetStaticPaths, GetStaticProps } from "next/types";
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
import { getGpTema } from "@/sanity/interface";
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
  "articles": *[_type == "aksel_artikkel" && $slug in undertema[]->tema->slug.current][0...9] | order(publishedAt desc) {
    heading,
    ingress ,
    "undertema": undertema[]->title,
    "innholdstype": innholdstype->title,
    "slug": slug.current
  }
}
`;

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
  const {
    heroNav,
    tema,
    innholdstype,
    articles,
  }: HeroNavT & GpTemaT & GpInnholdstypeT & GpArticleListT =
    await getClient().fetch(query, {
      slug,
    });

  return {
    props: {
      articles,
      tema,
      heroNav: heroNav.filter((x) => x.hasRefs),
      innholdstype: innholdstype.filter((x) => x.hasRefs),
      slug,
      preview,
      id: "",
      title: "",
    },
    notFound: !tema || !heroNav.some((nav) => nav.slug === slug),
    revalidate: 60,
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
        />
      </Suspense>
    );
  }

  return <GpPage {...props} />;
};

export default Wrapper;
