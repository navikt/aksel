import { getActiveHeading, LayoutPicker, PagePropsContext } from "@/components";
import { DsHeader, DsSidebar, Footer } from "@/layout";
import { SanityT, dsSlugQuery, getDsPaths, validateDsPath } from "@/lib";
import { getClient } from "@/sanity-client";
import { PreviewSuspense } from "next-sanity/preview";
import { lazy } from "react";
import NotFotfund from "../404";

const WithPreview = lazy(() => import("../../components/WithPreview"));

const Page = ({
  page,
  navigation,
  ...rest
}: {
  slug?: string[];
  page: any;
  navigation: SanityT.Schema.ds_navigation;
  preview: boolean;
}): JSX.Element => {
  if (!page) {
    return <NotFotfund />;
  }

  return (
    <PagePropsContext.Provider
      value={{
        pageProps: {
          ...rest,
          page: page,
          navigation,
          activeHeading: getActiveHeading(navigation, page?.slug) ?? null,
        },
      }}
    >
      <DsHeader />
      <div className="bg-bg-default flex w-full flex-col items-center">
        <div className="flex w-full max-w-screen-2xl">
          <DsSidebar />
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
    </PagePropsContext.Provider>
  );
};

const Wrapper = (props: any): JSX.Element => {
  if (props?.preview) {
    return (
      <PreviewSuspense fallback={<Page {...props} />}>
        <WithPreview
          comp={Page}
          query={dsSlugQuery}
          params={{ slug: `designsystem/${props.slug.slice(0, 2).join("/")}` }}
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
    paths: await getDsPaths().then((paths) =>
      paths.map((slug) => ({
        params: {
          slug: slug.filter((x) => x !== "designsystem"),
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
  const { page, navigation } = await getClient().fetch(dsSlugQuery, {
    slug: `designsystem/${slug.slice(0, 2).join("/")}`,
  });

  return {
    props: {
      page: page,
      slug,
      navigation: navigation,
      preview,
    },
    notFound: !(page && validateDsPath(page, slug)) && !preview,
    revalidate: 60,
  };
};
