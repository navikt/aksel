import { dateStr } from "@/components";
import { getDocumentsTmp, komponentQuery } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity-client";
import { Detail } from "@navikt/ds-react";
import { WithSidebar } from "components/layout/page-templates/WithSidebar";
import IntroSeksjon from "components/sanity-modules/IntroSeksjon";
import { BetaWarning } from "components/website-modules/BetaWarning";
import { StatusTag } from "components/website-modules/StatusTag";
import { PreviewSuspense } from "next-sanity/preview";
import Head from "next/head";
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
      <Head>
        <title>{page?.heading ? `${page?.heading} - Aksel` : "Aksel"}</title>
        <meta property="og:title" content={`${page.heading} - Aksel`} />
      </Head>
      <WithSidebar
        withToc
        sidebar={sidebar}
        pageType={{ type: "Komponenter", title: page?.heading }}
        intro={
          <Detail as="div" className="mt-2 flex items-center gap-3">
            <StatusTag showStable status={page?.status?.tag} />
            {`OPPDATERT ${dateStr(page?._updatedAt)}`}
          </Detail>
        }
        pageProps={page}
        variant="page"
      >
        {page?.status?.tag === "beta" && <BetaWarning />}
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
          query={komponentQuery}
          params={{
            slug: `komponenter/${props.slug.slice(0, 2).join("/")}`,
            type: "komponent_artikkel",
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
    paths: await getDocumentsTmp("komponent_artikkel").then((paths) =>
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
  const { page, sidebar } = await getClient().fetch(komponentQuery, {
    slug: `komponenter/${slug.slice(0, 2).join("/")}`,
    type: "komponent_artikkel",
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
