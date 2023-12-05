import { groq } from "next-sanity";
import { GetServerSideProps } from "next/types";
import { Suspense, lazy } from "react";
import { Heading } from "@navikt/ds-react";
import GodPraksisPage from "@/layout/god-praksis-page/GodPraksisPage";
import { heroNavQuery } from "@/layout/god-praksis-page/queries";
import { GpArticleListT, HeroNavT } from "@/layout/god-praksis-page/types";
import Header from "@/layout/header/Header";
import { getClient } from "@/sanity/client.server";
import { NextPageT } from "@/types";

type PageProps = NextPageT<GpArticleListT & HeroNavT>;

const query = groq`
{
  ${heroNavQuery},
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
  const { heroNav, articles } = await getClient().fetch(query);

  return {
    props: {
      articles,
      heroNav,
      preview: ctx.preview ?? false,
      id: "",
      title: "",
    },
    notFound: false,
  };
};

const GPPage = ({ articles, heroNav }: PageProps["props"]) => {
  return <GodPraksisPage articles={articles} heroNav={heroNav} />;

  return (
    <>
      {/* <SEO
        title="God praksis"
        description={page?.seo?.meta}
        image={page?.seo?.image}
      /> */}

      <div className="bg-surface-subtle relative overflow-hidden">
        <Header variant="transparent" />
        <main tabIndex={-1} id="hovedinnhold" className=" focus:outline-none">
          <div className="mx-auto mb-40 grid w-full max-w-screen-2xl px-4 pt-20 sm:px-6">
            <Heading
              level="1"
              size="xlarge"
              className="text-deepblue-800 mb-4 text-5xl"
            >
              God praksis
            </Heading>
            {/* {page.intro && <SanityBlockContent isIngress blocks={page.intro} />} */}
          </div>
        </main>
      </div>
    </>
  );
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
