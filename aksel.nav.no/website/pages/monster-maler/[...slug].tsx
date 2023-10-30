import { dateStr } from "@/components";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity/client.server";
import { getDocumentsTmp } from "@/sanity/interface";
import { destructureBlocks, sidebarQuery } from "@/sanity/queries";
import {
  AkselSidebarT,
  AkselTemplatesDocT,
  ArticleListT,
  NextPageT,
  ResolveContributorsT,
  ResolveSlugT,
} from "@/types";
import { Detail } from "@navikt/ds-react";
import { WithSidebar } from "components/layout/WithSidebar";
import Footer from "components/layout/footer/Footer";
import { Header } from "components/layout/header/Header";
import IntroSeksjon from "components/sanity-modules/intro-seksjon/IntroSeksjon";
import { StatusTag } from "components/website-modules/StatusTag";
import { SEO } from "components/website-modules/seo/SEO";
import { GetStaticPaths, GetStaticProps } from "next/types";
import { Suspense, lazy } from "react";
import NotFotfund from "../404";

type PageProps = NextPageT<{
  page: ResolveContributorsT<ResolveSlugT<AkselTemplatesDocT>>;
  sidebar: AkselSidebarT;
  seo: any;
  refs: ArticleListT;
  publishDate: string;
}>;

export const query = `{
  "page": *[_type == "templates_artikkel" && slug.current == $slug] | order(_updatedAt desc)[0]
    {
      ...,
      "slug": slug.current,
      content[]{
        ...,
        ${destructureBlocks}
      },
  },
  "seo": *[_type == "templates_landingsside"][0].seo.image,
  ${sidebarQuery}
}`;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: await getDocumentsTmp("templates_artikkel").then((paths) =>
      paths.map((slug) => ({
        params: {
          slug: slug.split("/").filter((x) => x !== "monster-maler"),
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
    slug: `monster-maler/${slug.slice(0, 2).join("/")}`,
    type: "templates_artikkel",
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
        pageType={{
          type: "templates",
          title: page?.heading,
          rootUrl: "/monster-maler",
          rootTitle: "Mønster og Maler",
        }}
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
            slug: `monster-maler/${props.slug}`,
            type: "templates_artikkel",
          }}
          props={props}
        />
      </Suspense>
    );
  }

  return <Page {...props} />;
};

export default Wrapper;
