import { LayoutPicker } from "@/components";
import { Footer } from "@/layout";
import { getDocumentsTmp, grunnleggendeQuery } from "@/lib";
import { getClient } from "@/sanity-client";
import { Header } from "components/layout/header/Header";
import { Sidebar } from "components/layout/sidebar/Sidebar";
import { PreviewSuspense } from "next-sanity/preview";
import { lazy } from "react";
import NotFotfund from "../404";

const Page = ({
  page,
  sidebar,
}: {
  slug?: string[];
  page: any;
  sidebar: any;
  preview: boolean;
}): JSX.Element => {
  if (!page) {
    return <NotFotfund />;
  }

  return (
    <>
      <Header />
      <div className="bg-bg-default flex w-full flex-col items-center">
        <div className="flex w-full max-w-screen-2xl">
          <Sidebar kategori="Grunnleggende" links={sidebar} />
          <div className="relative w-full">
            <main
              tabIndex={-1}
              id="hovedinnhold"
              className="min-h-screen-header md:max-w-screen-sidebar relative w-full focus:outline-none"
            >
              <LayoutPicker title="Aksel" data={page} />
            </main>
          </div>
        </div>
        <Footer variant="ds" />
      </div>
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
          query={grunnleggendeQuery}
          params={{
            slug: `grunnleggende/${props.slug.slice(0, 2).join("/")}`,
            type: "ds_artikkel",
          }}
          props={props}
        />
      </PreviewSuspense>
    );
  }

  return <Page {...props} />;
};

export default Wrapper;

export const getStaticPaths = async (): Promise<{
  fallback: string;
  paths: { params: { slug: string[] } }[];
}> => {
  return {
    paths: await getDocumentsTmp("ds_artikkel").then((paths) =>
      paths.map((slug) => ({
        params: {
          slug: slug.split("/").filter((x) => x !== "komponenter"),
        },
      }))
    ),
    fallback: "blocking",
  };
};

export const getStaticProps = async ({
  params: { slug },
  preview = false,
}: {
  params: { slug: string[] };
  preview?: boolean;
}) => {
  const { page, sidebar } = await getClient().fetch(grunnleggendeQuery, {
    slug: `grunnleggende/${slug.slice(0, 2).join("/")}`,
    type: "ds_artikkel",
  });

  return {
    props: {
      page: page,
      slug,
      sidebar,
      preview,
    },
    notFound: !page && !preview,
    revalidate: 60,
  };
};
