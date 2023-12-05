import omit from "lodash/omit";
import { groq } from "next-sanity";
import { GetServerSideProps } from "next/types";
import { Suspense, lazy } from "react";
import { Heading } from "@navikt/ds-react";
import GodPraksisPage from "@/layout/god-praksis-page/GodPraksisPage";
import Header from "@/layout/header/Header";
import { getClient } from "@/sanity/client.server";

const query = groq`
{
  "tema": *[_type == "gp.tema" && count(*[references(^._id)]) > 0]{
    "undertemaValidation": *[references(^._id) && _type == "gp.tema.undertema"]{
      "nArticles": count(*[references(^._id)])
    },
    title,
    description,
  },
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
): Promise<any> => {
  const results = await getClient().fetch(query);

  const temaList = results.tema.filter((_tema) =>
    _tema.undertemaValidation.some((underTema) => underTema.nArticles > 0)
  );

  return {
    props: {
      results: results.articles,
      tema: temaList.map((tema) => omit(tema, ["undertemaValidation"])),
      preview: ctx.preview ?? false,
      id: "",
      title: "",
    },
    notFound: false,
  };
};

const GPPage = ({ results }) => {
  return <GodPraksisPage results={results} />;

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
