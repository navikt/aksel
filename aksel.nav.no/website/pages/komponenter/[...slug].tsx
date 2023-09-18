import {
  ChangelogIcon,
  dateStr,
  FigmaIcon,
  GithubIcon,
  logAmplitudeEvent,
  YarnIcon,
} from "@/components";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity/client.server";
import { getDocumentsTmp } from "@/sanity/interface";
import { destructureBlocks, sidebarQuery } from "@/sanity/queries";
import {
  AkselKomponentDocT,
  AkselSidebarT,
  ArticleListT,
  NextPageT,
  ResolveContributorsT,
  ResolveSlugT,
} from "@/types";
import { BodyShort, Detail, Heading } from "@navikt/ds-react";
import Footer from "components/layout/footer/Footer";
import { Header } from "components/layout/header/Header";
import { WithSidebar } from "components/layout/WithSidebar";
import ComponentOverview from "components/sanity-modules/ComponentOverview";
import IntroSeksjon from "components/sanity-modules/IntroSeksjon";
import { SEO } from "components/website-modules/seo/SEO";
import { StatusTag } from "components/website-modules/StatusTag";
import { SuggestionBlock } from "components/website-modules/suggestionblock";
import { lazy, Suspense } from "react";
import NotFotfund from "../404";
import { GetStaticPaths, GetStaticProps } from "next/types";

const kodepakker = {
  "ds-react": {
    title: "@navikt/ds-react",
    git: "https://github.com/navikt/aksel/tree/main/%40navikt/core/react",
    changelog:
      "https://github.com/navikt/aksel/blob/main/%40navikt/core/react/CHANGELOG.md",
  },
  "ds-css": {
    title: "@navikt/ds-css",
    git: "https://github.com/navikt/aksel/tree/main/%40navikt/core/css",
    changelog:
      "https://github.com/navikt/aksel/blob/main/%40navikt/core/css/CHANGELOG.md",
  },
  "ds-tokens": {
    title: "@navikt/ds-tokens",
    git: "https://github.com/navikt/aksel/tree/main/%40navikt/core/tokens",
    changelog:
      "https://github.com/navikt/aksel/blob/main/%40navikt/core/tokens/CHANGELOG.md",
  },
  "ds-tailwind": {
    title: "@navikt/ds-tailwind",
    git: "https://github.com/navikt/aksel/tree/main/%40navikt/core/tailwind",
    changelog:
      "https://github.com/navikt/aksel/blob/main/%40navikt/core/tailwind/CHANGELOG.md",
  },
};

type PageProps = NextPageT<{
  page: ResolveContributorsT<ResolveSlugT<AkselKomponentDocT>>;
  sidebar: AkselSidebarT;
  seo: any;
  refs: ArticleListT;
  publishDate: string;
}>;

/**
 * "refs" må disables i preview da next-sanity sin
 * preview-funksjonalitet fører til en infinite loop som låser applikasjonen.
 * Dette er på grunn av av hele datasettet blir lastet inn i preview flere ganger som til slutt låser vinduet.
 */
export const query = `{
  "page": *[_type == "komponent_artikkel" && slug.current == $slug] | order(_updatedAt desc)[0]
    {
      ...,
      "slug": slug.current,
      linked_package {
        "title": @->title,
        "github_link": @->github_link,
        "status": @->status
      },
      intro{
        ...,
        body[]{
          ...,
        ${destructureBlocks}
        }
      },
      content[]{
        ...,
        ${destructureBlocks}
      },
  },
  "refs": select(
    $preview == "true" => [],
    $preview != "true" => *[_type == "komponent_artikkel" && count(*[references(^._id)][slug.current == $slug]) > 0][0...3]{
      _id,
      heading,
      "slug": slug,
      status
    }
  ),
  "seo": *[_type == "komponenter_landingsside"][0].seo.image,
  ${sidebarQuery}
}`;

export const getStaticPaths: GetStaticPaths = async () => {
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

export const getStaticProps: GetStaticProps = async ({
  params: { slug },
  preview = false,
}: {
  params: { slug: string[] };
  preview?: boolean;
}): Promise<PageProps> => {
  const { page, sidebar, refs, seo } = await getClient().fetch(query, {
    slug: `komponenter/${slug.slice(0, 2).join("/")}`,
    type: "komponent_artikkel",
    preview: "false",
  });

  return {
    props: {
      page: page,
      refs,
      slug: slug.slice(0, 2).join("/"),
      seo,
      sidebar,
      preview,
      title: page?.heading ?? "",
      id: page?._id ?? "",
      publishDate: await dateStr(page?._updatedAt ?? page?._createdAt),
    },
    notFound: !page && !preview,
    revalidate: 60,
  };
};

const Page = ({
  page,
  sidebar,
  refs,
  seo,
  publishDate,
}: PageProps["props"]) => {
  if (!page) {
    return <NotFotfund />;
  }

  const pack = page?.kodepakker?.length > 0 && kodepakker[page?.kodepakker[0]];

  const tag =
    page?.status?.tag === "beta"
      ? "komponent-beta"
      : page?.status?.tag === "new"
      ? "komponent-ny"
      : null;

  const unsafe = page?.status?.unsafe;
  const internal = page?.status?.internal;

  const Links = () => (
    <BodyShort
      as="span"
      size="small"
      className="text-text-subtle mt-4 flex flex-wrap gap-4"
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
  );

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
        pageType={{ type: "Komponenter", title: page?.heading }}
        pageProps={page}
        variant="page"
        intro={
          <Detail as="div">
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span>
                Oppdatert <time>{publishDate}</time>
              </span>
              {internal && <StatusTag status="internal" />}
              {page?.status?.tag !== "beta" && (
                <StatusTag showStable status={page?.status?.tag} />
              )}
            </div>
            <Links />
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
        {tag && (
          <SuggestionBlock
            variant={tag}
            unsafe={unsafe}
            reference={`<${page?.heading} />`}
          />
        )}
        <IntroSeksjon node={page?.intro} internal={internal} />
        {page?.status?.tag === "ready" && (
          <SuggestionBlock
            variant="komponent"
            reference={`<${page?.heading} />`}
          />
        )}
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
            slug: `komponenter/${props.slug}`,
            type: "komponent_artikkel",
            preview: "true",
          }}
          props={props}
        />
      </Suspense>
    );
  }

  return <Page {...props} />;
};

export default Wrapper;
