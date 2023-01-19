import {
  ChangelogIcon,
  dateStr,
  FigmaIcon,
  GithubIcon,
  logAmplitudeEvent,
  YarnIcon,
} from "@/components";
import { getDocumentsTmp, komponentQuery, urlFor } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity-client";
import { BodyShort, Detail, Heading } from "@navikt/ds-react";
import { WithSidebar } from "components/layout/page-templates/WithSidebar";
import ComponentOverview from "components/sanity-modules/component-overview";
import IntroSeksjon from "components/sanity-modules/IntroSeksjon";
import { StatusTag } from "components/website-modules/StatusTag";
import { SuggestionBlock } from "components/website-modules/SuggestionBlock";
import { PreviewSuspense } from "next-sanity/preview";
import Head from "next/head";
import { lazy } from "react";
import NotFotfund from "../404";

const kodepakker = {
  "ds-react": {
    title: "@navikt/ds-react",
    git: "https://github.com/navikt/Designsystemet/tree/master/%40navikt/core/react",
    changelog:
      "https://github.com/navikt/Designsystemet/blob/master/%40navikt/core/react/CHANGELOG.md",
  },
  "ds-css": {
    title: "@navikt/ds-css",
    git: "https://github.com/navikt/Designsystemet/tree/master/%40navikt/core/css",
    changelog:
      "https://github.com/navikt/Designsystemet/blob/master/%40navikt/core/css/CHANGELOG.md",
  },
  "ds-react-internal": {
    title: "@navikt/ds-react-internal",
    git: "https://github.com/navikt/Designsystemet/tree/master/%40navikt/internal/react",
    changelog:
      "https://github.com/navikt/Designsystemet/blob/master/%40navikt/internal/react/CHANGELOG.md",
  },
  "ds-css-internal": {
    title: "@navikt/ds-css-internal",
    git: "https://github.com/navikt/Designsystemet/tree/master/%40navikt/internal/css",
    changelog:
      "https://github.com/navikt/Designsystemet/blob/master/%40navikt/internal/css/CHANGELOG.md",
  },
  "ds-icons": {
    title: "@navikt/ds-reaciconst",
    git: "https://github.com/navikt/Designsystemet/tree/master/%40navikt/icons",
    changelog:
      "https://github.com/navikt/Designsystemet/blob/master/%40navikt/icons/CHANGELOG.md",
  },
  "ds-tokens": {
    title: "@navikt/ds-tokens",
    git: "https://github.com/navikt/Designsystemet/tree/master/%40navikt/core/tokens",
    changelog:
      "https://github.com/navikt/Designsystemet/blob/master/%40navikt/core/tokens/CHANGELOG.md",
  },
  "ds-tailwind": {
    title: "@navikt/ds-tailwind",
    git: "https://github.com/navikt/Designsystemet/tree/master/%40navikt/core/tailwind",
    changelog:
      "https://github.com/navikt/Designsystemet/blob/master/%40navikt/core/tailwind/CHANGELOG.md",
  },
};

const Page = ({
  page,
  sidebar,
  refs,
  seo,
}: {
  slug?: string[];
  page: any;
  refs: any[];
  sidebar: any;
  seo: any;
  preview: boolean;
}): JSX.Element => {
  if (!page) {
    return <NotFotfund />;
  }

  const pack = page?.kodepakker?.length > 0 && kodepakker[page?.kodepakker[0]];

  const date = page?.updateInfo?.lastVerified
    ? page?.updateInfo?.lastVerified
    : page?.publishedAt
    ? page.publishedAt
    : page._updatedAt;

  const tag =
    page?.status?.tag === "beta"
      ? "komponent-beta"
      : page?.status?.tag === "new"
      ? "komponent-ny"
      : null;

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
              ? urlFor(seo)
                  .width(1200)
                  .height(630)
                  .fit("crop")
                  .quality(100)
                  .url()
              : ""
          }
          key="ogimage"
        />
      </Head>
      <WithSidebar
        withToc
        sidebar={sidebar}
        pageType={{ type: "Komponenter", title: page?.heading }}
        pageProps={page}
        variant="page"
        intro={
          <Detail as="div" className="mt-2 flex items-center gap-3">
            <StatusTag showStable status={page?.status?.tag} />
            {`OPPDATERT ${dateStr(date)}`}
          </Detail>
        }
        footer={
          refs &&
          refs.length > 0 && (
            <div className="mt-10">
              <Heading
                level="2"
                size="large"
                id="relaterte-komponenter"
                className="text-deepblue-800 mb-6 scroll-m-20"
              >
                Relaterte komponenter
              </Heading>
              <ComponentOverview node={refs} />
            </div>
          )
        }
      >
        <BodyShort
          as="span"
          size="small"
          className="text-text-subtle mb-6 flex flex-wrap gap-4"
        >
          {pack && (
            <>
              <a
                target="_blank"
                rel="noreferrer noopener"
                href={pack.git}
                className="hover:text-text-default focus:text-text-on-inverted focus:shadow-focus flex items-center gap-1 underline hover:no-underline focus:bg-blue-800 focus:no-underline focus:outline-none"
                onClick={() =>
                  logAmplitudeEvent("link", {
                    kilde: "intro-lenker komponenter",
                    til: "github",
                  })
                }
              >
                <GithubIcon /> Github
              </a>
              <a
                target="_blank"
                rel="noreferrer noopener"
                href={`https://yarnpkg.com/package/${pack.title}`}
                className="hover:text-text-default focus:text-text-on-inverted focus:shadow-focus flex items-center gap-1 underline hover:no-underline focus:bg-blue-800 focus:no-underline focus:outline-none"
                onClick={() =>
                  logAmplitudeEvent("link", {
                    kilde: "intro-lenker komponenter",
                    til: "yarn",
                  })
                }
              >
                <YarnIcon />
                Yarn
              </a>
            </>
          )}

          {page.figma_link && (
            <a
              target="_blank"
              rel="noreferrer noopener"
              href={page.figma_link}
              className="hover:text-text-default focus:text-text-on-inverted focus:shadow-focus flex items-center gap-1 underline hover:no-underline focus:bg-blue-800 focus:no-underline focus:outline-none"
              onClick={() =>
                logAmplitudeEvent("link", {
                  kilde: "intro-lenker komponenter",
                  til: "figma",
                })
              }
            >
              <FigmaIcon /> Figma
            </a>
          )}
          {pack && (
            <>
              <a
                target="_blank"
                rel="noreferrer noopener"
                href={pack.changelog}
                className="hover:text-text-default focus:text-text-on-inverted focus:shadow-focus flex items-center gap-1 underline hover:no-underline focus:bg-blue-800 focus:no-underline focus:outline-none"
                onClick={() =>
                  logAmplitudeEvent("link", {
                    kilde: "intro-lenker komponenter",
                    til: "endringslogg",
                  })
                }
              >
                <ChangelogIcon />
                Endringslogg
              </a>
            </>
          )}
        </BodyShort>
        {tag && <SuggestionBlock variant={tag} />}
        <IntroSeksjon node={page?.intro} />
        {page?.status?.tag === "ready" && (
          <SuggestionBlock variant="komponent" />
        )}
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
            preview: "true",
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
  const { page, sidebar, refs, seo } = await getClient().fetch(komponentQuery, {
    slug: `komponenter/${slug.slice(0, 2).join("/")}`,
    type: "komponent_artikkel",
    preview: "false",
  });

  return {
    props: {
      page: page,
      refs,
      slug,
      seo,
      sidebar,
      preview,
    },
    notFound: !page && !preview,
    revalidate: 60,
  };
};
