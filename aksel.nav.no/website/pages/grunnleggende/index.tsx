import { Footer } from "@/layout";
import { Header } from "components/layout/header/Header";
import { PreviewSuspense } from "next-sanity/preview";
import Head from "next/head";
import { lazy } from "react";

const Page = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Grunnleggende</title>
        <meta property="og:title" content="Grunnleggende" />
        <meta
          name="description"
          content="Grunnelegende deler fra designsystemet til NAV"
        />
      </Head>
      <Header />
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className="bg-surface relative flex justify-center focus:outline-none"
      >
        <div className="min-h-screen-header flex w-full">Grunnleggende</div>
      </main>
      <Footer />
    </>
  );
};

/* const WithPreview = lazy(() => import("../../components/WithPreview")); */

const Wrapper = (props: any): JSX.Element => {
  /* if (props?.preview) {
    return (
      <PreviewSuspense fallback={<Page {...props} />}>
        <WithPreview comp={Page} query={dsFrontpageQuery} props={props} />
      </PreviewSuspense>
    );
  } */

  return <Page {...props} />;
};

export default Wrapper;

export const getStaticProps = async ({
  preview = false,
}: {
  preview?: boolean;
}) => {
  /* const { page } = await getClient().fetch(dsFrontpageQuery); */

  return {
    props: {
      /* page: page, */
      slug: "/grunnleggende",
      preview,
    },
    revalidate: 60,
  };
};
