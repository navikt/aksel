import { Footer } from "@/layout";
import { SanityT, akselBloggPosts, urlFor } from "@/lib";
import { getClient } from "@/sanity-client";
import { BodyLong, BodyShort, Heading, Link } from "@navikt/ds-react";
import { Header } from "components/layout/header/Header";
import { PreviewSuspense } from "next-sanity/preview";
import Head from "next/head";
import React, { lazy } from "react";
import NotFotfund from "../404";
import Image from "next/image";
import NextLink from "next/link";
import { dateStr } from "@/utils";
import { LatestBlogs } from "components/website-modules/LatestBloggs";

const Page = (props: PageProps): JSX.Element => {
  if (!props.bloggposts) {
    return <NotFotfund />;
  }

  return (
    <>
      <Head>
        <title>Produktbloggen - Aksel</title>
        <meta property="og:title" content="Produktbloggen - Aksel" />
      </Head>
      <div className="bg-surface-warning-subtle">
        <Header variant="blogg" />
        <main
          tabIndex={-1}
          id="hovedinnhold"
          className="min-h-[80vh] focus:outline-none"
        >
          <div className="xs:px-4 mx-auto grid w-full max-w-screen-xl gap-6 px-6">
            <LatestBlogs bloggs={props?.bloggposts} title="Blogg" />
          </div>
        </main>
        {/* <main
          tabIndex={-1}
          id="hovedinnhold"
          className="min-h-[80vh] bg-gray-100 focus:outline-none"
        >
          <div className="relative bg-white px-4 pt-8 pb-8 md:pt-12">
            <div className="dynamic-wrapper-2xl w-fit">
              <Heading
                level="1"
                size="xlarge"
                spacing
                className="algolia-index-lvl1"
              >
                Produktbloggen
              </Heading>
            </div>
          </div>
          <div className="relative px-4 pt-8 pb-24">
            <div className="dynamic-wrapper-2xl w-fit">
              <div className="mt-4 grid gap-2 divide-y divide-gray-300">
                {props.bloggposts.map((blog) => (
                  <BloggCard key={blog._id} blog={blog} />
                ))}
              </div>
            </div>
          </div>
        </main> */}
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
        <WithPreview comp={Page} query={akselBloggPosts} props={props} />
      </PreviewSuspense>
    );
  }

  return <Page {...props} />;
};

export default Wrapper;

export type AkselBloggPage = Partial<
  SanityT.Schema.aksel_blogg & {
    slug: string;
    contributors?: { title?: string }[];
  }
>;

interface PageProps {
  bloggposts: AkselBloggPage[];
  preview: boolean;
}

interface StaticProps {
  props: PageProps;
  notFound: boolean;
  revalidate: number;
}

export const getStaticProps = async ({
  preview = false,
}: {
  preview?: boolean;
}): Promise<StaticProps | { notFound: true }> => {
  const { bloggposts } = await getClient().fetch(akselBloggPosts);

  return {
    props: {
      bloggposts,
      preview,
    },
    notFound: !bloggposts && !preview,
    revalidate: 60,
  };
};
