import { GetStaticProps } from "next/types";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { getClient } from "@/sanity/client.server";
import { contributorsAll, destructureBlocks } from "@/sanity/queries";
import {
  AkselBloggDocT,
  AkselBloggFrontpageT,
  NextPageT,
  ResolveContributorsT,
  ResolveSlugT,
} from "@/types";
import { LatestBloggposts } from "@/web/blogg-page/BloggPage";
import { BloggList } from "@/web/blogg-page/parts/BloggList";
import { PagePreview } from "@/web/preview/PagePreview";
import { SEO } from "@/web/seo/SEO";
import NotFotfund from "../404";

type PageProps = NextPageT<{
  page: AkselBloggFrontpageT;
  bloggposts: ResolveContributorsT<ResolveSlugT<AkselBloggDocT>>[];
}>;

export const query = `*[_type == "blogg_landingsside"][0]{
  "page": {..., intro[]{...,${destructureBlocks}}},
  "bloggposts": *[_type == "aksel_blogg"] | order(publishedAt desc, _createdAt desc){
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
          <div className="mx-auto mb-40 grid w-full max-w-screen-2xl px-4 sm:px-6">
            <LatestBloggposts
              bloggs={props?.bloggposts}
              title="Produktbloggen"
              intro={props?.page?.intro}
            />

            {/* Flere blogger */}
            {remainingPosts && (
              <ul className="mt-8 grid gap-12 md:grid-cols-2">
                {remainingPosts.map((blogg) => (
                  <BloggList blogg={blogg} key={blogg._id} />
                ))}
              </ul>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default function Home(props: PageProps["props"]) {
  return props.preview ? (
    <PagePreview query={query} props={props}>
      {(previewProps) => <Page {...previewProps} />}
    </PagePreview>
  ) : (
    <Page {...props} />
  );
}
