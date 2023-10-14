import { dateStr } from "@/components";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity/client.server";
import { getDocumentsTmp } from "@/sanity/interface";
import { destructureBlocks, sidebarQuery } from "@/sanity/queries";
import {
  AkselGrunnleggendeDocT,
  AkselSidebarT,
  ArticleListT,
  NextPageT,
  ResolveContributorsT,
  ResolveSlugT,
} from "@/types";
import { Detail } from "@navikt/ds-react";
import { WithSidebar } from "components/layout/WithSidebar";
import Footer from "components/layout/footer/Footer";
import { Header } from "components/layout/header/Header";
import IntroSeksjon from "components/sanity-modules/IntroSeksjon";
import { StatusTag } from "components/website-modules/StatusTag";
import { SEO } from "components/website-modules/seo/SEO";
import { GetStaticPaths, GetStaticProps } from "next/types";
import { Suspense, lazy } from "react";

type PageProps = NextPageT<{
  page: ResolveContributorsT<ResolveSlugT<AkselGrunnleggendeDocT>>;
  sidebar: AkselSidebarT;
  seo: any;
  refs: ArticleListT;
  publishDate: string;
}>;

export const query = `{
  "page": *[_type == "ds_artikkel" && slug.current == $slug] | order(_updatedAt desc)[0]
    {
      ...,
      "slug": slug.current,
      content[]{
        ...,
        ${destructureBlocks}
      },
  },
  "seo": *[_type == "komponenter_landingsside"][0].seo.image,
  ${sidebarQuery}
}`;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: await getDocumentsTmp("ds_artikkel").then((paths) =>
      paths.map((slug) => ({
        params: {
          slug: slug.split("/").filter((x) => x !== "grunnleggende"),
        },
      }))
    ),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({
  params: { slug },
  preview = false,
}: {
  params: { slug: string[] };
  preview?: boolean;
}): Promise<PageProps> => {
  const { page, sidebar, seo } = await getClient().fetch(query, {
    slug: `grunnleggende/${slug.slice(0, 2).join("/")}`,
    type: "ds_artikkel",
  });

  return {
    props: {
      page,
      slug: slug.slice(0, 2).join("/"),
      seo,
      sidebar,
      preview,
      title: page?.heading ?? "",
      id: page?._id ?? "",
      refs: [],
      publishDate: await dateStr(page?._updatedAt ?? page?._createdAt),
    },
    notFound: !page && !preview,
    revalidate: 60,
  };
};

const Page = ({ page, sidebar, seo, publishDate }: PageProps["props"]) => {
  return (
    <>
      <SEO
        title={page?.heading}
        description={page?.seo?.meta}
        image={page?.seo?.image ?? seo}
      />

      <Header />
      <WithSidebar
        sidebar={sidebar}
        pageType={{ type: "Grunnleggende", title: page?.heading }}
        intro={
          <Detail as="div">
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span>
                Oppdatert <time>{publishDate}</time>
              </span>
              <StatusTag showStable status={page?.status?.tag} />
            </div>
          </Detail>
        }
        pageProps={page}
        variant="page"
      >
        <IntroSeksjon node={page?.intro} />
        <SanityBlockContent blocks={page["content"]} />
      </WithSidebar>
      <Footer />
    </>
  );
};

const WithPreview = lazy(() => import("../../components/WithPreview"));

const Wrapper = (props: any) => {
  if (props?.preview) {
    return (
      <Suspense fallback={<Page {...props} />}>
        <WithPreview
          comp={Page}
          query={query}
          params={{
            slug: `grunnleggende/${props.slug}`,
            type: "ds_artikkel",
          }}
          props={props}
        />
      </Suspense>
    );
  }

  return <Page {...props} />;
};

export default Wrapper;
