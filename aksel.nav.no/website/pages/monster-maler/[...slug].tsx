import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity/client.server";
import { getDocumentsTmp } from "@/sanity/interface";
import { destructureBlocks, sidebarQuery } from "@/sanity/queries";
import {
  AkselSidebarT,
  AkselTemplatesDocT,
  ArticleListT,
  CodeExampleSchemaT,
  NextPageT,
  ResolveContributorsT,
  ResolveSlugT,
} from "@/types";
import { Detail, Heading } from "@navikt/ds-react";
import Footer from "components/layout/footer/Footer";
import { Header } from "components/layout/header/Header";
import IntroSeksjon from "components/sanity-modules/intro-seksjon/IntroSeksjon";
import { StatusTag } from "components/website-modules/StatusTag";
import { AkselTable, AkselTableRow } from "components/website-modules/Table";
import { SEO } from "components/website-modules/seo/SEO";
import { GetStaticPaths, GetStaticProps } from "next/types";
import { Suspense, lazy } from "react";
import NotFotfund from "../404";
import { WithSidebar } from "components/layout/templates/WithSidebar";
import { dateStr } from "@/utils";

type PageProps = NextPageT<{
  page: ResolveContributorsT<ResolveSlugT<AkselTemplatesDocT>>;
  sidebar: AkselSidebarT;
  seo: any;
  refs: ArticleListT;
  publishDate: string;
}>;

const query = `{
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

  const metadata: CodeExampleSchemaT["metadata"] = page.content.find(
    (x) => x._type === "kode_eksempler"
  )?.dir?.metadata;

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

        {metadata && metadata.changelog && (
          <>
            <Heading
              tabIndex={-1}
              id="changelog"
              level="2"
              size="large"
              className="max-w-text text-deepblue-800 mb-4 mt-12 scroll-mt-20 focus:outline-none"
            >
              Endringer
            </Heading>
            <AkselTable
              th={[
                { text: "Dato" },
                { text: "Versjon" },
                { text: "Endringer" },
              ]}
            >
              {metadata.changelog
                .sort((a, b) => a.version - b.version)
                .map((log) => (
                  <AkselTableRow
                    key={log.version}
                    tr={[
                      { text: log.date },
                      { text: log.version },
                      { text: log.description },
                    ]}
                  />
                ))}
            </AkselTable>
          </>
        )}
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
