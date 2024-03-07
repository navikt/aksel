import { groq } from "next-sanity";
import { GetServerSideProps } from "next/types";
import { Suspense, lazy, useEffect } from "react";
import { SanityDocument } from "sanity";
import { getClient } from "@/sanity/client.server";
import { NextPageT } from "@/types";
import { SEO } from "@/web/seo/SEO";

const query = groq`
{
  "articles": *[_type == "aksel_artikkel" && defined(undertema) && $slug in undertema[]->tema->slug.current] | order(publishedAt desc) {
    _id,
    heading,
    publishedAt,
    description,
    "undertema": undertema[]->{title, "temaTitle": tema->title},
    "innholdstype": innholdstype->title,
    "slug": slug.current,
  },
  "tema": *[_type == "gp.tema" && slug.current == $slug][0]{
    ...,
    "slug": slug.current,
    "undertema": *[_type == "gp.tema.undertema" && tema->slug.current == $slug]{
      title,
      description
    }
  },
  "heroNav": *[_type == "gp.tema" && count(*[_type=="aksel_artikkel"
      && (^._id in undertema[]->tema._ref)]) > 0]{
    title,
    "slug": slug.current,
    "image": pictogram,
  }
}
`;

type QueryResponse = {
  tema: SanityDocument & {
    title: string;
    slug: string;
    description?: string;
    undertema: { title: string; description: string }[];
  };
  heroNav: {
    title: string;
    slug: string;
    image: any;
  }[];
  articles: {
    _id: string;
    heading: string;
    publishedAt: string;
    description;
    string;
    undertema: { title: string; temaTitle: string };
    innholdstype: string;
    slug: string;
  }[];
};

type PageProps = NextPageT<QueryResponse>;

export const getServerSideProps: GetServerSideProps = async (
  ctx,
): Promise<PageProps> => {
  const slug = ctx.params?.slug as string;
  const preview = !!ctx.preview;

  const { heroNav, tema, articles } = await getClient().fetch<QueryResponse>(
    query,
    {
      slug,
    },
  );

  return {
    props: {
      tema,
      heroNav,
      articles,
      slug,
      preview,
      id: tema._id ?? "",
      title: tema.title ?? "",
    },
    notFound: !tema || articles.length === 0,
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
      <div>hello</div>
      {/* <GodPraksisPage {...props} /> */}
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
