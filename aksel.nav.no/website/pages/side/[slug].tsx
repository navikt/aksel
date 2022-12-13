import { Feedback, TableOfContents } from "@/components";
import { akselStandaloneBySlug, SanityT } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity-client";
import { Heading } from "@navikt/ds-react";
import Footer from "components/layout/footer/Footer";
import Header from "components/layout/header/AkselHeader";
import { PreviewSuspense } from "next-sanity/preview";
import Head from "next/head";
import { GetServerSideProps } from "next/types";
import React, { lazy } from "react";
import NotFotfund from "../404";

const Page = ({
  page,
}: {
  slug?: string;
  page: SanityT.Schema.aksel_standalone;
  preview: boolean;
}): JSX.Element => {
  if (!page) {
    return <NotFotfund />;
  }

  if (!page.content || !page.heading) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{`${page?.heading} - Aksel`}</title>
        <meta
          property="og:title"
          content={`${page?.heading} - Aksel`}
          key="ogtitle"
        />
      </Head>

      <Header />
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className="aksel-artikkel xs:pb-32 bg-gray-50 pt-[8vw] pb-16 focus:outline-none"
      >
        <div className="px-4">
          <div className="dynamic-wrapper-prose">
            <Heading
              level="1"
              size="xlarge"
              className="algolia-index-lvl1 mt-1"
            >
              {page.heading}
            </Heading>
          </div>
        </div>
        <div className="mt-12">
          <TableOfContents changedState={page?.content ?? []} hideToc />
          <div className="mt-8 px-4">
            <SanityBlockContent
              className="dynamic-wrapper-prose"
              blocks={page?.content ?? []}
              variant="aksel"
            />
          </div>
        </div>
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
        <WithPreview
          comp={Page}
          query={akselStandaloneBySlug}
          props={props}
          params={{
            slug: `side/${props.slug}`,
          }}
        />
      </PreviewSuspense>
    );
  }

  return <Page {...props} />;
};

export default Wrapper;

interface StaticProps {
  props: {
    page: SanityT.Schema.aksel_standalone;
    slug: string;
    preview: boolean;
    validUser?: boolean;
    id: string;
  };
  notFound: boolean;
}

export const getServerSideProps: GetServerSideProps = async (
  context
): Promise<StaticProps | { notFound: true }> => {
  const { page } = await getClient().fetch(akselStandaloneBySlug, {
    slug: `side/${context.params.slug}`,
  });

  return {
    props: {
      page,
      slug: context.params.slug as string,
      preview: context.preview ?? false,
      id: page?._id ?? "",
    },
    notFound: !page && !context.preview,
  };
};
