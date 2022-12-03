import {
  DsCard,
  DsFrontpageFooterIllustration,
  DsFrontpageIllustration,
  PagePropsContext,
} from "@/components";
import { Footer } from "@/layout";
import { DsFrontPageCardT, dsFrontpageQuery, SanityT } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity-client";
import { BodyLong, Heading } from "@navikt/ds-react";
import { Header } from "components/layout/header/Header";
import { PreviewSuspense } from "next-sanity/preview";
import Head from "next/head";
import { lazy } from "react";

const Page = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Komponenter</title>
        <meta property="og:title" content="Komponenter" />
        <meta
          name="description"
          content="Komponenter fra designsystemet til NAV"
        />
      </Head>
      <Header />
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className="bg-surface relative flex justify-center focus:outline-none"
      >
        <div className="min-h-screen-header flex w-full">Komponenter</div>
      </main>
      <Footer variant="aksel" />
    </>
  );
};

const WithPreview = lazy(() => import("../../components/WithPreview"));

const Wrapper = (props: any): JSX.Element => {
  if (props?.preview) {
    return (
      <PreviewSuspense fallback={<Page {...props} />}>
        <WithPreview comp={Page} query={dsFrontpageQuery} props={props} />
      </PreviewSuspense>
    );
  }

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
      slug: "/designsystem",
      preview,
    },
    revalidate: 60,
  };
};
