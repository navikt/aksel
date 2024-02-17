import { GetStaticProps } from "next/types";
import { Heading } from "@navikt/ds-react";
import BloggCard from "@/cms/cards/BloggCard";
import { PagePreview } from "@/draftmode/PagePreview";
import { getDraftClient } from "@/draftmode/client";
import { draftmodeToken, viewerToken } from "@/draftmode/token";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { contributorsAll, destructureBlocks } from "@/sanity/queries";
import {
  AkselBloggDocT,
  AkselBloggFrontpageT,
  NextPageT,
  ResolveContributorsT,
  ResolveSlugT,
} from "@/types";
import { BloggAd } from "@/web/BloggAd";
import { AkselCubeStatic } from "@/web/aksel-cube/AkselCube";
import { LatestBloggposts } from "@/web/blogg-page/BloggPage";
import { SEO } from "@/web/seo/SEO";
import NotFotfund from "../404";

type PageProps = NextPageT<{
  page: AkselBloggFrontpageT;
  bloggposts: ResolveContributorsT<ResolveSlugT<AkselBloggDocT>>[];
}>;

const Page = (props: PageProps["props"]) => {
  if (!props.bloggposts) {
    return <NotFotfund />;
  }

  const remainingPosts = props?.bloggposts?.slice(3, props?.bloggposts.length);

  return (
    <>
      <SEO
        title="Produktbloggen"
        description={props?.page?.seo?.meta}
        image={props?.page?.seo?.image}
      />

      <div className="bg-amber-50">
        <Header variant="blogg" />
        <main
          tabIndex={-1}
          id="hovedinnhold"
          className="relative overflow-hidden focus:outline-none"
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

const query = `*[_type == "blogg_landingsside"][0]{
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

export const getStaticProps: GetStaticProps = async ({
  draftMode = false,
}): Promise<PageProps> => {
  const client = getDraftClient({
    draftMode,
    token: draftMode ? draftmodeToken : viewerToken,
  });

  const { bloggposts, page } = await client.fetch(query);

  return {
    props: {
      page,
      bloggposts,
      preview: draftMode,
      title: "Forside Blogg",
      id: page?._id ?? "",
      draftMode,
      token: draftMode ? draftmodeToken : "",
    },
    notFound: false,
    revalidate: 60,
  };
};

export default function Home(props: PageProps["props"]) {
  return props.draftMode ? (
    <PagePreview query={query} props={props}>
      {(_props) => <Page {..._props} />}
    </PagePreview>
  ) : (
    <Page {...props} />
  );
}
