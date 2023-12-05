import { groq } from "next-sanity";
import { GetStaticProps } from "next/types";
import { Suspense, lazy } from "react";
import { Heading } from "@navikt/ds-react";
import GodPraksisPage from "@/layout/god-praksis-page/GodPraksisPage";
import Header from "@/layout/header/Header";
import { getClient } from "@/sanity/client.server";

const query = groq`
*[_type == "aksel_artikkel" && defined(undertema)] {
  heading, 
  ingress ,
  "undertema": undertema[]->title,
  "innholdstype": innholdstype->title
}
`;

export const getStaticProps: GetStaticProps = async (): Promise<any> => {
  /* const { temaer, page, resent } = await getClient().fetch(query); */

  const results = await getClient().fetch(query);

  return {
    props: {
      results,
    },
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
