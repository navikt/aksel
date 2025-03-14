import { GetStaticPaths } from "next/types";
import { Detail } from "@navikt/ds-react";
import IntroSeksjon from "@/cms/intro-seksjon/IntroSeksjon";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { WithSidebar } from "@/layout/templates/WithSidebar";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity/client.server";
import { getDocuments } from "@/sanity/interface";
import { destructureBlocks, sidebarQuery } from "@/sanity/queries";
import {
  AkselGrunnleggendeDocT,
  ArticleListT,
  DesignsystemSidebarSectionT,
  NextPageT,
  ResolveContributorsT,
  ResolveSlugT,
  TableOfContentsT,
} from "@/types";
import { dateStr, generateSidebar, generateTableOfContents } from "@/utils";
import { StatusTag } from "@/web/StatusTag";
import { PagePreview } from "@/web/preview/PagePreview";
import { SEO } from "@/web/seo/SEO";
import NotFotfund from "../404";

type PageProps = NextPageT<{
  page: ResolveContributorsT<ResolveSlugT<AkselGrunnleggendeDocT>>;
  sidebar: DesignsystemSidebarSectionT;
  seo: any;
  refs: ArticleListT;
  publishDate: string;
  toc: TableOfContentsT;
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
  "seo": *[_type == "grunnleggende_landingsside"][0].seo.image,
  ${sidebarQuery}
}`;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: await getDocuments("ds_artikkel").then((paths) =>
      paths.map(({ slug }) => ({
        params: {
          slug: slug.split("/").filter((x) => x !== "grunnleggende"),
        },
      })),
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
      page,
      slug: slug.slice(0, 2).join("/"),
      seo,
      sidebar: generateSidebar(sidebar, "grunnleggende"),
      preview,
      title: page?.heading ?? "",
      id: page?._id ?? "",
      refs: [],
      publishDate: await dateStr(page?._updatedAt ?? page?._createdAt),
      toc: generateTableOfContents({
        type: "ds_artikkel",
        content: page?.content,
      }),
    },
    notFound: !page && !preview,
    revalidate: 60,
  };
};

const Page = ({ page, sidebar, seo, publishDate, toc }: PageProps["props"]) => {
  if (!page) {
    return <NotFotfund />;
  }

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
        toc={toc}
        pageType={{
          type: "grunnleggende",
          title: page?.heading,
          rootUrl: "/grunnleggende",
          rootTitle: "Grunnleggende",
        }}
        intro={
          <Detail as="div">
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span>
                Oppdatert <time>{publishDate}</time>
              </span>
              {page?.status?.tag && (
                <StatusTag showStable status={page?.status?.tag} />
              )}
            </div>
          </Detail>
        }
        pageProps={page}
        variant="page"
      >
        <IntroSeksjon node={page?.intro} />
        <SanityBlockContent blocks={page.content} />
      </WithSidebar>
      <Footer />
    </>
  );
};

export default function GrunnleggendePage(props: PageProps["props"]) {
  return props?.preview ? (
    <PagePreview
      query={query}
      props={props}
      params={{
        slug: `grunnleggende/${props.slug}`,
        type: "ds_artikkel",
      }}
    >
      {(previewProps, loading) => {
        if (loading) {
          return <Page {...props} />;
        }
        return (
          <Page
            {...previewProps}
            sidebar={generateSidebar(previewProps?.sidebar, "grunnleggende")}
            toc={generateTableOfContents({
              content: previewProps?.page?.content,
              type: "ds_artikkel",
            })}
          />
        );
      }}
    </PagePreview>
  ) : (
    <Page {...props} />
  );
}
