import { groq } from "next-sanity";
import { GetServerSideProps } from "next/types";
import { Suspense, lazy } from "react";
import GodPraksisPage from "@/layout/god-praksis-page/GodPraksisPage";
import { heroNavQuery } from "@/layout/god-praksis-page/queries";
import { GpTemaT, HeroNavT } from "@/layout/god-praksis-page/types";
import { getClient } from "@/sanity/client.server";
import { NextPageT } from "@/types";

type PageProps = NextPageT<HeroNavT & GpTemaT>;

const query = groq`
{
  ${heroNavQuery},
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
  const { heroNav, tema }: HeroNavT & GpTemaT = await getClient().fetch(query, {
    slug: ctx.params.slug,
  });

  return {
    props: {
      tema,
      heroNav,
      slug: ctx.params.slug as string,
      preview: ctx.preview ?? false,
      id: "",
      title: "",
    },
    notFound: !tema || !heroNav.some((nav) => nav.slug === ctx.params.slug),
  };
};

const GPPage = ({ heroNav, tema }: PageProps["props"]) => {
  return <GodPraksisPage articles={[]} heroNav={heroNav} tema={tema} />;
};

const WithPreview = lazy(() => import("@/preview"));

const Wrapper = (props: any) => {
  if (props?.preview) {
    return (
      <Suspense fallback={<GPPage {...props} />}>
        <WithPreview comp={GPPage} query={query} props={props} />
      </Suspense>
    );
  }

  return <GPPage {...props} />;
};

export default Wrapper;
