import { GetStaticPaths } from "next/types";
import { Suspense, lazy } from "react";
import { Detail, Heading } from "@navikt/ds-react";
import IntroSeksjon from "@/cms/intro-seksjon/IntroSeksjon";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { WithSidebar } from "@/layout/templates/WithSidebar";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity/client.server";
import { getDocuments } from "@/sanity/interface";
import { destructureBlocks, sidebarQuery } from "@/sanity/queries";
import {
  AkselTemplatesDocT,
  ArticleListT,
  CodeExampleSchemaT,
  NextPageT,
  ResolveContributorsT,
  ResolveSlugT,
  SidebarT,
  TableOfContentsT,
} from "@/types";
import { dateStr, generateSidebar, generateTableOfContents } from "@/utils";
import { StatusTag } from "@/web/StatusTag";
import { AkselTable, AkselTableRow } from "@/web/Table";
import { SEO } from "@/web/seo/SEO";
import { SuggestionBlockGhPages } from "@/web/suggestionblock/SuggestionBlock.GhPages";
import NotFotfund from "../404";

type PageProps = NextPageT<{
  page: ResolveContributorsT<ResolveSlugT<AkselTemplatesDocT>>;
  sidebar: SidebarT;
  seo: any;
  refs: ArticleListT;
  publishDate: string;
  toc: TableOfContentsT;
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
    paths: await getDocuments("templates_artikkel").then((paths) =>
      paths.map(({ slug }) => ({
        params: {
          slug: slug.split("/").filter((x) => x !== "monster-maler"),
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
    slug: `monster-maler/${slug.slice(0, 2).join("/")}`,
    type: "templates_artikkel",
  });

  return {
    props: {
      page,
      slug: slug.slice(0, 2).join("/"),
      seo,
      sidebar: generateSidebar(sidebar, "templates"),
      preview,
      title: page?.heading ?? "",
      id: page?._id ?? "",
      refs: [],
      publishDate: await dateStr(page?._updatedAt ?? page?._createdAt),
      toc: generateTableOfContents({
        content: page?.content,
        type: "templates_artikkel",
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

  const metadata: CodeExampleSchemaT["metadata"] = page.content.find(
    (x) => x._type === "kode_eksempler",
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
        toc={toc}
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
              {page?.status?.tag && (
                <StatusTag showStable status={page?.status?.tag} />
              )}
            </div>
          </Detail>
        }
        pageProps={page}
        variant="page"
      >
        {page.gh_discussions && (
          <SuggestionBlockGhPages reference={page.gh_discussions} />
        )}
        <IntroSeksjon node={page?.intro} />
        <SanityBlockContent blocks={page["content"]} />

        {metadata && metadata.changelog && (
          <>
            <Heading
              tabIndex={-1}
              id="changelog"
              level="2"
              size="large"
              className="mb-4 mt-12 max-w-text scroll-mt-20 text-deepblue-800 focus:outline-none"
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

const WithPreview = lazy(() => import("@/preview"));

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
          resolvers={[
            {
              key: "sidebar",
              dataKeys: ["sidebar"],
              cb: (v) => generateSidebar(v[0], "templates"),
            },
            {
              key: "toc",
              dataKeys: ["page.content", "page.intro"],
              cb: (v) =>
                generateTableOfContents({
                  content: v[0],
                  type: "templates_artikkel",
                  intro: !!v[1],
                }),
            },
          ]}
        />
      </Suspense>
    );
  }

  return <Page {...props} />;
};

export default Wrapper;
