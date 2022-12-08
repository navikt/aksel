import { Footer } from "@/layout";
import { akselBloggPosts, SanityT } from "@/lib";
import { getClient } from "@/sanity-client";
import { Header } from "components/layout/header/Header";
import { LatestBlogs } from "components/website-modules/LatestBloggs";
import { PreviewSuspense } from "next-sanity/preview";
import Head from "next/head";
import { lazy } from "react";
import NotFotfund from "../404";

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
