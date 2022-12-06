import { TemaCard } from "@/components";
import { Footer } from "@/layout";
import { akselTema } from "@/lib";
import { getClient } from "@/sanity-client";
import { Heading } from "@navikt/ds-react";
import { Header } from "components/layout/header/Header";
import { PreviewSuspense } from "next-sanity/preview";
import Head from "next/head";
import React, { lazy } from "react";
import { AkselTemaT } from "..";

interface PageProps {
  temaer: AkselTemaT[];
  slug: string;
  preview: boolean;
}

const Page = ({ temaer: data }: PageProps): JSX.Element => {
  const filteredTemas = data.filter((x) => x.refCount > 0);
  return (
    <>
      <Head>
        <title>Temaer - Aksel</title>
        <meta property="og:title" content="Temaer - Aksel" />
        <meta
          name="description"
          content="Oversikt over alle tilgjengelige god praksis temaer"
        />
      </Head>
      <div className="bg-gray-50">
        <Header />
        <main
          tabIndex={-1}
          id="hovedinnhold"
          className="min-h-[80vh] bg-gray-100 focus:outline-none"
        >
          <div className="relative bg-white px-4 pt-8 pb-8 md:pt-12">
            <div className="dynamic-wrapper w-fit">
              <Heading
                level="1"
                size="xlarge"
                spacing
                className="algolia-index-lvl1"
              >
                Temaer
              </Heading>
            </div>
          </div>
          <div className="relative px-4 pt-8 pb-24">
            <div className="dynamic-wrapper">
              <div className="card-grid-3-1 mt-4">
                {filteredTemas.map((tema) => (
                  <TemaCard compact {...tema} key={tema._id} />
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

const WithPreview = lazy(() => import("../../components/WithPreview"));

const Wrapper = (props: any): JSX.Element => {
  if (props?.preview) {
    return (
      <PreviewSuspense fallback={<Page {...props} />}>
        <WithPreview comp={Page} query={akselTema} props={props} />
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
  const { temaer } = await getClient().fetch(akselTema);

  return {
    props: {
      temaer,
      slug: "/god-praksis",
      preview,
    },
    notFound: !temaer,
    revalidate: 60,
  };
};
