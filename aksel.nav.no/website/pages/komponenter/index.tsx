import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity/client.server";
import {
  AkselLandingPageDocT,
  AkselSidebarT,
  ArticleListT,
  NextPageT,
} from "@/types";
import { logAmplitudeEvent } from "@/utils";
import { CodeIcon } from "@navikt/aksel-icons";
import { BodyShort, Heading, Ingress } from "@navikt/ds-react";
import cl from "clsx";
import {
  ChangelogIcon,
  FigmaIcon,
  GithubIcon,
  StorybookIcon,
  YarnIcon,
} from "components/assets";
import { WithSidebar } from "components/layout/WithSidebar";
import ComponentOverview from "components/sanity-modules/ComponentOverview";
import { IntroCards } from "components/website-modules/IntroCards";
import Head from "next/head";
import { Suspense, lazy } from "react";
import { komponentKategorier } from "../../sanity/config";
import { urlFor } from "@/sanity/interface";
import { sidebarQuery, landingPageQuery } from "@/sanity/queries";

function Links() {
  return (
    <BodyShort
      as="span"
      size="small"
      className="text-text-on-inverted mt-2 flex flex-wrap gap-4"
    >
      <a
        target="_blank"
        rel="noreferrer noopener"
        href="https://github.com/navikt/aksel/tree/main/%40navikt"
        className="hover:text-text-on-inverted focus:text-text-default focus:bg-border-focus-on-inverted flex items-center gap-1 underline hover:no-underline focus:no-underline focus:shadow-[0_0_0_2px_var(--a-border-focus-on-inverted)] focus:outline-none"
        onClick={() =>
          logAmplitudeEvent("link", {
            kilde: "intro-lenker ikonside",
            til: "github",
          })
        }
      >
        <GithubIcon /> Github
      </a>
      <a
        target="_blank"
        rel="noreferrer noopener"
        href="https://yarnpkg.com/package/@navikt/ds-react"
        className="hover:text-text-on-inverted focus:text-text-default focus:bg-border-focus-on-inverted flex items-center gap-1 underline hover:no-underline focus:no-underline focus:shadow-[0_0_0_2px_var(--a-border-focus-on-inverted)] focus:outline-none"
        onClick={() =>
          logAmplitudeEvent("link", {
            kilde: "intro-lenker ikonside",
            til: "yarn",
          })
        }
      >
        <YarnIcon />
        Yarn
      </a>
      <a
        target="_blank"
        rel="noreferrer noopener"
        href="/grunnleggende/kode/endringslogg"
        className="hover:text-text-on-inverted focus:text-text-default focus:bg-border-focus-on-inverted flex items-center gap-1 underline hover:no-underline focus:no-underline focus:shadow-[0_0_0_2px_var(--a-border-focus-on-inverted)] focus:outline-none"
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

      <a
        target="_blank"
        rel="noreferrer noopener"
        href="https://www.figma.com/@nav_aksel"
        className="hover:text-text-on-inverted focus:text-text-default focus:bg-border-focus-on-inverted flex items-center gap-1 underline hover:no-underline focus:no-underline focus:shadow-[0_0_0_2px_var(--a-border-focus-on-inverted)] focus:outline-none"
        onClick={() =>
          logAmplitudeEvent("link", {
            kilde: "intro-lenker ikonside",
            til: "figma",
          })
        }
      >
        <FigmaIcon /> Figma-community
      </a>
      <a
        target="_blank"
        rel="noreferrer noopener"
        href="/storybook"
        className="hover:text-text-on-inverted focus:text-text-default focus:bg-border-focus-on-inverted group flex items-center gap-1 underline hover:no-underline focus:no-underline focus:shadow-[0_0_0_2px_var(--a-border-focus-on-inverted)] focus:outline-none"
        onClick={() =>
          logAmplitudeEvent("link", {
            kilde: "intro-lenker ikonside",
            til: "storybook",
          })
        }
      >
        <StorybookIcon className="mr-1 " /> Storybook
      </a>
    </BodyShort>
  );
}

type PageProps = NextPageT<{
  page: AkselLandingPageDocT;
  sidebar: AkselSidebarT;
  links: ArticleListT;
}>;

export const query = `{${sidebarQuery}, ${landingPageQuery(
  "komponenter"
)}, "links": *[_type == "komponent_artikkel" && defined(kategori)]{_id,heading,"slug": slug,status,kategori}}`;

export const getStaticProps = async ({
  preview = false,
}: {
  preview?: boolean;
}): Promise<PageProps> => {
  const { sidebar, page, links } = await getClient().fetch(query, {
    type: "komponent_artikkel",
  });

  return {
    props: {
      page,
      sidebar,
      links,
      slug: "/komponenter",
      preview,
      title: "",
      id: page?._id ?? "",
    },
    revalidate: 60,
    notFound: false,
  };
};

const Page = ({ page, sidebar, links }: PageProps["props"]) => {
  return (
    <>
      <Head>
        <title>Komponenter</title>
        <meta property="og:title" content="Komponenter" />
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
              : ""
          }
          key="ogimage"
        />
      </Head>
      <WithSidebar
        sidebar={sidebar}
        pageType={{ type: "Komponenter", title: "Komponenter" }}
        intro={
          <Ingress className="text-text-on-action">
            {page?.intro}
            <Links />
          </Ingress>
        }
        pageProps={page}
      >
        <IntroCards
          links={[
            {
              title: "Kom i gang med Kode",
              desc: "Intro til alle kodepakkene våre",
              icon: CodeIcon,
              href: "/grunnleggende/introduksjon/kom-i-gang-med-kodepakkene",
            },
            {
              title: "Kom i gang med Figma",
              desc: "Hvordan bruke Figma-bibliotekene våre",
              icon: FigmaIcon,
              href: "/grunnleggende/introduksjon/kom-i-gang-med-figma",
            },
            {
              title: "Forslag til nye komponenter",
              desc: "Opprett et github-issue",
              icon: GithubIcon,
              href: `https://github.com/navikt/aksel/issues/new?labels=forespørsel+🥰%2Ckomponenter+🧩&template=update-component.yml&title=%5BInnspill+til+komponent%5D%3A+`,
            },
          ]}
          className="grid-cols-1 pb-8 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
          variant="komponentside"
        />
        {komponentKategorier
          .filter(
            (kat) => links?.filter((x) => x.kategori === kat.value).length > 0
          )
          .map((kat, i) => (
            <div
              key={i}
              className={cl({ "pb-8": i + 1 < komponentKategorier.length })}
            >
              <Heading
                level="2"
                size="large"
                spacing
                className="text-deepblue-800 scoll-mt-20"
                id={kat.value}
              >
                {kat.title}
              </Heading>
              <div>
                {page?.[`ingress_${kat.value}`] && (
                  <Ingress className="mb-4 only:mb-7">
                    {page[`ingress_${kat.value}`]}
                  </Ingress>
                )}
                {page?.[`intro_${kat.value}`] && (
                  <SanityBlockContent blocks={page[`intro_${kat.value}`]} />
                )}
              </div>
              <ComponentOverview
                node={links.filter((x) => x.kategori === kat.value)}
              />
            </div>
          ))}
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
          props={props}
          params={{
            type: "komponent_artikkel",
          }}
        />
      </Suspense>
    );
  }

  return <Page {...props} />;
};

export default Wrapper;
