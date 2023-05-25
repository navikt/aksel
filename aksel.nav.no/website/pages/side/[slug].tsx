import { TableOfContents } from "@/components";
import { SanityBlockContent } from "@/sanity-block";
import { Heading } from "@navikt/ds-react";
import Footer from "components/layout/footer/Footer";
import { Header } from "components/layout/header/Header";
import { PreviewSuspense } from "next-sanity/preview";
import Head from "next/head";
import { GetServerSideProps } from "next/types";
import React, { lazy } from "react";
import { AkselStandaloneDocT, NextPageT, ResolveSlugT } from "@/types";
import NotFotfund from "../404";
import { destructureBlocks } from "@/sanity/queries";
import { getClient } from "@/sanity/client.server";

type PageProps = NextPageT<{ page: ResolveSlugT<AkselStandaloneDocT> }>;

export const query = `{
  "page": *[slug.current == $slug && _type == "aksel_standalone"] | order(_updatedAt desc)[0]
  {
    ...,
    "slug": slug.current,
    content[]{
      ...,
      ${destructureBlocks}
    }
  }
}`;

export const getServerSideProps: GetServerSideProps = async (
  context
): Promise<PageProps> => {
  const { page } = await getClient().fetch(query, {
    slug: `side/${context.params.slug}`,
  });

  return {
    props: {
      page,
      slug: context.params.slug as string,
      preview: context.preview ?? false,
      id: page?._id ?? "",
      title: page?.heading ?? "",
    },
    notFound: !page && !context.preview,
  };
};

/* Standalone-sider */
const Page = ({ page }: PageProps["props"]) => {
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

      <Header variant="subtle" />
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className="aksel-artikkel bg-surface-subtle pt-[8vw] pb-16 focus:outline-none sm:pb-32"
      >
        <div className="px-4">
          <div className="dynamic-wrapper-prose">
            <Heading level="1" size="xlarge" className="mt-1">
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
      <Footer />
    </>
  );
};

const WithPreview = lazy(() => import("../../components/WithPreview"));

const Wrapper = (props: any) => {
  if (props?.preview) {
    return (
      <PreviewSuspense fallback={<Page {...props} />}>
        <WithPreview
          comp={Page}
          query={query}
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
