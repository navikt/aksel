import { dateStr } from "@/components";
import { getDocumentsTmp, grunnleggendeQuery, urlFor } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity-client";
import { Detail } from "@navikt/ds-react";
import { WithSidebar } from "components/layout/page-templates/WithSidebar";
import IntroSeksjon from "components/sanity-modules/IntroSeksjon";
import { StatusTag } from "components/website-modules/StatusTag";
import { PreviewSuspense } from "next-sanity/preview";
import Head from "next/head";
import { lazy } from "react";
import NotFotfund from "../404";

const Page = ({
  page,
  sidebar,
  seo,
}: {
  slug?: string[];
  page: any;
  sidebar: any;
  seo: any;
  preview: boolean;
}): JSX.Element => {
  if (!page) {
    return <NotFotfund />;
  }

  const date = page?.updateInfo?.lastVerified
    ? page?.updateInfo?.lastVerified
    : page?.publishedAt
    ? page.publishedAt
    : page._updatedAt;

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
          <Detail as="div" className="mt-2 flex items-center gap-3">
            <StatusTag showStable status={page?.status?.tag} />
            {`OPPDATERT ${dateStr(date)}`}
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
}) => {
  const { page, sidebar, seo } = await getClient().fetch(grunnleggendeQuery, {
    slug: `grunnleggende/${slug.slice(0, 2).join("/")}`,
    type: "ds_artikkel",
  });

  return {
    props: {
      page: page,
      slug,
      seo,
      sidebar,
      preview,
      title: page?.heading ?? "",
    },
    notFound: !page && !preview,
    revalidate: 60,
  };
};
