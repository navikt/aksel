import { GetStaticPaths } from "next/types";
import { BodyShort, Detail, Heading } from "@navikt/ds-react";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";
import { ChangelogIcon, FigmaIcon, GithubIcon, YarnIcon } from "@/assets/Icons";
import ComponentOverview from "@/cms/component-overview/ComponentOverview";
import IntroSeksjon from "@/cms/intro-seksjon/IntroSeksjon";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { WithSidebar } from "@/layout/templates/WithSidebar";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity/client.server";
import { getDocuments } from "@/sanity/interface";
import { destructureBlocks, sidebarQuery } from "@/sanity/queries";
import {
  AkselKomponentDocT,
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
import { SuggestionBlock } from "@/web/suggestionblock/SuggestionBlock";
import NotFotfund from "../404";

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
  sidebar: DesignsystemSidebarSectionT;
  seo: any;
  refs: ArticleListT;
  publishDate: string;
  toc: TableOfContentsT;
}>;

/**
 * "refs" må disables i preview da next-sanity sin
 * preview-funksjonalitet fører til en infinite loop som låser applikasjonen.
 * Dette er på grunn av av hele datasettet blir lastet inn i preview flere ganger som til slutt låser vinduet.
 */
const query = `{
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
    paths: await getDocuments("komponent_artikkel").then((paths) =>
      paths.map(({ slug }) => ({
        params: {
          slug: slug.split("/").filter((x) => x !== "komponenter"),
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
  const { page, sidebar, refs, seo } = await getClient().fetch(query, {
    slug: `komponenter/${slug.slice(0, 2).join("/")}`,
    type: "komponent_artikkel",
    preview: "false",
  });

  return {
    props: {
      page,
      refs,
      slug: slug.slice(0, 2).join("/"),
      seo,
      sidebar: generateSidebar(sidebar, "komponenter"),
      preview,
      title: page?.heading ?? "",
      id: page?._id ?? "",
      publishDate: await dateStr(page?._updatedAt ?? page?._createdAt),
      toc: generateTableOfContents({
        content: page?.content,
        type: "komponent_artikkel",
        intro: !!page?.intro,
      }),
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
  toc,
}: PageProps["props"]) => {
  if (!page) {
    return <NotFotfund />;
  }

  const pack =
    page?.kodepakker &&
    page?.kodepakker?.length > 0 &&
    kodepakker[page?.kodepakker[0]];

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
      className="mt-4 flex flex-wrap gap-4 text-text-subtle"
    >
      {pack && (
        <>
          <a
            target="_blank"
            rel="noreferrer noopener"
            href={pack.git}
            className="flex items-center gap-1 underline hover:text-text-default hover:no-underline focus:bg-blue-800 focus:text-text-on-inverted focus:no-underline focus:shadow-focus focus:outline-none"
            onClick={() =>
              umamiTrack("navigere", {
                kilde: "komponent-header",
                url: pack.git,
              })
            }
          >
            <GithubIcon /> Github
          </a>
          <a
            target="_blank"
            rel="noreferrer noopener"
            href={`https://yarnpkg.com/package/${pack.title}`}
            className="flex items-center gap-1 underline hover:text-text-default hover:no-underline focus:bg-blue-800 focus:text-text-on-inverted focus:no-underline focus:shadow-focus focus:outline-none"
            onClick={() =>
              umamiTrack("navigere", {
                kilde: "komponent-header",
                url: `https://yarnpkg.com/package/${pack.title}`,
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
          className="flex items-center gap-1 underline hover:text-text-default hover:no-underline focus:bg-blue-800 focus:text-text-on-inverted focus:no-underline focus:shadow-focus focus:outline-none"
          onClick={() =>
            umamiTrack("navigere", {
              kilde: "komponent-header",
              url: page.figma_link,
            })
          }
        >
          <FigmaIcon /> Figma
        </a>
      )}
      {pack && (
        <a
          target="_blank"
          rel="noreferrer noopener"
          href={pack.changelog}
          className="flex items-center gap-1 underline hover:text-text-default hover:no-underline focus:bg-blue-800 focus:text-text-on-inverted focus:no-underline focus:shadow-focus focus:outline-none"
          onClick={() =>
            umamiTrack("navigere", {
              kilde: "komponent-header",
              url: pack.changelog,
            })
          }
        >
          <ChangelogIcon />
          Endringslogg
        </a>
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
        toc={toc}
        pageType={{
          type: "komponenter",
          title: page?.heading,
          rootUrl: "/komponenter",
          rootTitle: "Komponenter",
        }}
        pageProps={page}
        variant="page"
        intro={
          <Detail as="div">
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span>
                Oppdatert <time>{publishDate}</time>
              </span>
              {internal && <StatusTag status="internal" />}
              {page?.status?.tag !== "beta" && page?.status?.tag && (
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
                className="mb-6 scroll-m-20 text-deepblue-800"
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
        {page?.status?.tag === "ready" && !page?.hide_feedback && (
          <SuggestionBlock
            variant="komponent"
            reference={`<${page?.heading} />`}
          />
        )}
        <SanityBlockContent blocks={page.content} />
      </WithSidebar>
      <Footer />
    </>
  );
};

export default function KomponentSider(props: PageProps["props"]) {
  return props.preview ? (
    <PagePreview
      query={query}
      props={props}
      params={{
        slug: `komponenter/${props.slug}`,
        type: "komponent_artikkel",
        preview: "true",
      }}
    >
      {(previewProps, loading) => {
        if (loading) {
          return <Page {...props} />;
        }
        return (
          <Page
            {...previewProps}
            sidebar={generateSidebar(previewProps.sidebar, "komponenter")}
            toc={generateTableOfContents({
              content: previewProps?.page?.content,
              type: "komponent_artikkel",
              intro: !!previewProps?.page?.intro,
            })}
          />
        );
      }}
    </PagePreview>
  ) : (
    <Page {...props} />
  );
}
