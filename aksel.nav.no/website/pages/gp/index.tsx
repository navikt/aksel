import { GetStaticProps } from "next/types";
import { Suspense, lazy } from "react";
import { Heading } from "@navikt/ds-react";
import GodPraksisPage from "@/layout/god-praksis-page/GodPraksisPage";
import Header from "@/layout/header/Header";
import { NextPageT } from "@/types";

type PageProps = NextPageT<{
  /* page: AkselGodPraksisLandingPageDocT;
  temaer: Array<AkselTemaT>; */
}>;

const query = ``;

export const getStaticProps: GetStaticProps = async ({
  preview = false,
}): Promise<PageProps> => {
  /* const { temaer, page, resent } = await getClient().fetch(query); */

  return {
    props: {
      slug: "/gp",
      preview,
      title: "Forside God praksis",
      id: "",
    },
    notFound: false,
    revalidate: 60,
  };
};

const GPPage = (/* props: PageProps["props"] */) => {
  return <GodPraksisPage />;

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
