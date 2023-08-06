import { Footer } from "@/layout";
import { getClient } from "@/sanity/client.server";
import {
  AkselBloggDocT,
  AkselBloggFrontpageT,
  NextPageT,
  ResolveContributorsT,
  ResolveSlugT,
} from "@/types";
import { Heading } from "@navikt/ds-react";
import { Header } from "components/layout/header/Header";
import BloggCard from "components/sanity-modules/cards/BloggCard";
import { BloggAd } from "components/website-modules/BloggAd";
import { AkselCubeStatic } from "components/website-modules/cube";
import { LatestBloggposts } from "components/website-modules/blogg-page";
import Head from "next/head";
import { Suspense, lazy } from "react";
import NotFotfund from "../404";
import { urlFor } from "@/sanity/interface";
import { destructureBlocks, contributorsAll } from "@/sanity/queries";

type PageProps = NextPageT<{
  page: AkselBloggFrontpageT;
  bloggposts: ResolveContributorsT<ResolveSlugT<AkselBloggDocT>>[];
}>;

export const query = `*[_type == "blogg_landingsside"][0]{
  "page": {..., intro[]{...,${destructureBlocks}}},
  "bloggposts": *[_type == "aksel_blogg"] | order(_createdAt desc){
    seo,
    heading,
    ingress,
    publishedAt,
    _createdAt,
    _id,
    "slug": slug.current,
    ${contributorsAll}
  }
}`;

export const getStaticProps = async ({
  preview = false,
}: {
  preview?: boolean;
}): Promise<PageProps> => {
  const { bloggposts, page } = await getClient().fetch(query);

  return {
    props: {
      page,
      bloggposts,
      preview,
      title: "Forside Blogg",
      id: page?._id ?? "",
    },
    notFound: false,
    revalidate: 60,
  };
};

const Page = (props: PageProps["props"]) => {
  if (!props.bloggposts) {
    return <NotFotfund />;
  }

  const remainingPosts = props?.bloggposts?.slice(4, props?.bloggposts.length);

  return (
    <>
      <Head>
        <title>Produktbloggen - Aksel</title>
        <meta property="og:title" content="Produktbloggen - Aksel" />
        <meta
          name="description"
          content={props?.page?.seo?.meta ?? ""}
          key="desc"
        />
        <meta
          property="og:description"
          content={props?.page?.seo?.meta ?? ""}
          key="ogdesc"
        />
        <meta
          property="og:image"
          content={
            props?.page?.seo?.image
              ? urlFor(props?.page?.seo?.image)
                  .width(1200)
                  .height(630)
                  .fit("crop")
                  .quality(100)
                  .url()
              : ""
          }
          key="ogimage"
        />
      </Head>
      <div className="bg-[#FEFCE9]">
        <Header variant="blogg" />
        <main
          tabIndex={-1}
          id="hovedinnhold"
          className="relative min-h-[80vh] overflow-hidden focus:outline-none"
        >
          <AkselCubeStatic className="text-[#FFE78A] opacity-10" />
          <div className="mx-auto mb-40 grid w-full max-w-screen-2xl px-4 sm:px-6">
            <LatestBloggposts
              bloggs={props?.bloggposts}
              title="Blogg"
              intro={props?.page?.intro}
            />
            {/* Skriv for bloggen */}

            <BloggAd />
            {/* Flere blogger */}
            {remainingPosts && (
              <div>
                <Heading level="2" size="xlarge" className="text-deepblue-800">
                  Flere blogginnlegg
                </Heading>
                <ul className="mt-12 grid gap-x-3 gap-y-6 md:grid-cols-2 md:gap-x-6 md:gap-y-10 lg:grid-cols-3">
                  {remainingPosts.map((blog) => (
                    <BloggCard key={blog._id} blog={blog} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

const WithPreview = lazy(() => import("../../components/WithPreview"));

const Wrapper = (props: any) => {
  if (props?.preview) {
    return (
      <Suspense fallback={<Page {...props} />}>
        <WithPreview comp={Page} query={query} props={props} />
      </Suspense>
    );
  }

  return <Page {...props} />;
};

export default Wrapper;
