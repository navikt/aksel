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
  GpInnholdstypeT,
  GpTemaPageProps,
  GpTemaT,
  HeroNavT,
} from "@/layout/god-praksis-page/types";
import { getClient } from "@/sanity/client.server";
import { NextPageT } from "@/types";
import { SEO } from "@/web/seo/SEO";

type PageProps = NextPageT<GpTemaPageProps>;

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
  }
}
`;

export const getServerSideProps: GetServerSideProps = async (
  ctx
): Promise<PageProps> => {
  const { heroNav, tema, innholdstype }: HeroNavT & GpTemaT & GpInnholdstypeT =
    await getClient().fetch(query, {
      slug: ctx.params.slug,
    });

  return {
    props: {
      tema,
      heroNav,
      innholdstype,
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
    <GpPageContext.Provider value={{ ...props, type: "tema-page" }}>
      <SEO
        title={props.tema.title ?? ""}
        /* description={page?.seo?.meta} */
        /* image={page?.seo?.image} */
      />
      <GodPraksisPage
        articles={[]}
        heroNav={props.heroNav}
        tema={props.tema}
        innholdstype={props.innholdstype}
      />
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
