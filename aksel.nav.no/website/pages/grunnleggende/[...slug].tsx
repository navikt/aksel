import { dateStr } from "@/components";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity/client.server";
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
import IntroSeksjon from "components/sanity-modules/IntroSeksjon";
import { StatusTag } from "components/website-modules/StatusTag";
import Head from "next/head";
import { Suspense, lazy } from "react";
import NotFotfund from "../404";
import { getDocumentsTmp, urlFor } from "@/sanity/interface";
import { destructureBlocks, sidebarQuery } from "@/sanity/queries";

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

export const getStaticPaths = async (): Promise<{
  fallback: string;
  paths: { params: { slug: string[] } }[];
}> => {
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

export const getStaticProps = async ({
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
      page: page,
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
  if (!page) {
    return <NotFotfund />;
  }

  return (
    <>
      <Head>
        <title>{page?.heading ? `${page?.heading} - Aksel` : "Aksel"}</title>
        <meta property="og:title" content={`${page.heading} - Aksel`} />
        <meta name="description" content={page?.seo?.meta ?? ""} key="desc" />
        <meta
          property="og:description"
          content={page?.seo?.meta ?? ""}
          key="ogdesc"
        />
        <meta
          property="og:image"
          content={
            page?.seo?.image
              ? urlFor(page?.seo?.image)
                  .width(1200)
                  .height(630)
                  .fit("crop")
                  .quality(100)
                  .url()
              : seo
              ? urlFor(seo).width(1200).height(630).fit("crop").url()
              : ""
          }
          key="ogimage"
        />
      </Head>
      <WithSidebar
        withToc
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
