import { vercelStegaCleanAll } from "@sanity/client/stega";
import cl from "clsx";
import { GetStaticProps } from "next/types";
import { CodeIcon } from "@navikt/aksel-icons";
import { BodyLong, BodyShort, Heading } from "@navikt/ds-react";
import {
  ChangelogIcon,
  FigmaIcon,
  GithubIcon,
  StorybookIcon,
  YarnIcon,
} from "@/assets/Icons";
import ComponentOverview from "@/cms/component-overview/ComponentOverview";
import { PagePreview } from "@/draftmode/PagePreview";
import { getDraftClient } from "@/draftmode/client";
import { draftmodeToken, viewerToken } from "@/draftmode/token";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { WithSidebar } from "@/layout/templates/WithSidebar";
import { AmplitudeEvents, amplitude } from "@/logging";
import { SanityBlockContent } from "@/sanity-block";
import { landingPageQuery, sidebarQuery } from "@/sanity/queries";
import {
  AkselLandingPageDocT,
  ArticleListT,
  NextPageT,
  SidebarT,
} from "@/types";
import { generateSidebar } from "@/utils";
import { IntroCards } from "@/web/IntroCards";
import { SEO } from "@/web/seo/SEO";
import { komponentKategorier } from "../../sanity/config";

type PageProps = NextPageT<{
  page: AkselLandingPageDocT;
  sidebar: SidebarT;
  links: ArticleListT;
}>;

const Page = ({ page, sidebar, links }: PageProps["props"]) => {
  return (
    <>
      <SEO
        title="Komponenter"
        description={page?.seo?.meta}
        image={page?.seo?.image}
      />
      <Header />
      <WithSidebar
        sidebar={sidebar}
        pageType={{
          type: "komponenter",
          title: "Komponenter",
          rootUrl: "/komponenter",
          rootTitle: "Komponenter",
        }}
        intro={
          <BodyLong size="large" className="text-text-on-action">
            {page?.intro}
            <Links />
          </BodyLong>
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
            (kat) => links?.filter((x) => x.kategori === kat.value).length > 0,
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
                className="scoll-mt-20 text-deepblue-800"
                id={kat.value}
              >
                {kat.title}
              </Heading>
              <div>
                {page?.[`ingress_${kat.value}`] && (
                  <BodyLong size="large" className="mb-4 only:mb-7">
                    {page[`ingress_${kat.value}`]}
                  </BodyLong>
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
      <Footer />
    </>
  );
};

function Links() {
  return (
    <BodyShort
      as="span"
      size="small"
      className="mt-2 flex flex-wrap gap-4 text-text-on-inverted"
    >
      <a
        target="_blank"
        rel="noreferrer noopener"
        href="https://github.com/navikt/aksel/tree/main/%40navikt"
        className="flex items-center gap-1 underline hover:text-text-on-inverted hover:no-underline focus:bg-border-focus-on-inverted focus:text-text-default focus:no-underline focus:shadow-[0_0_0_2px_var(--a-border-focus-on-inverted)] focus:outline-none"
        onClick={() =>
          amplitude.track(AmplitudeEvents.link, {
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
        className="flex items-center gap-1 underline hover:text-text-on-inverted hover:no-underline focus:bg-border-focus-on-inverted focus:text-text-default focus:no-underline focus:shadow-[0_0_0_2px_var(--a-border-focus-on-inverted)] focus:outline-none"
        onClick={() =>
          amplitude.track(AmplitudeEvents.link, {
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
        className="flex items-center gap-1 underline hover:text-text-on-inverted hover:no-underline focus:bg-border-focus-on-inverted focus:text-text-default focus:no-underline focus:shadow-[0_0_0_2px_var(--a-border-focus-on-inverted)] focus:outline-none"
        onClick={() =>
          amplitude.track(AmplitudeEvents.link, {
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
        className="flex items-center gap-1 underline hover:text-text-on-inverted hover:no-underline focus:bg-border-focus-on-inverted focus:text-text-default focus:no-underline focus:shadow-[0_0_0_2px_var(--a-border-focus-on-inverted)] focus:outline-none"
        onClick={() =>
          amplitude.track(AmplitudeEvents.link, {
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
        className="group flex items-center gap-1 underline hover:text-text-on-inverted hover:no-underline focus:bg-border-focus-on-inverted focus:text-text-default focus:no-underline focus:shadow-[0_0_0_2px_var(--a-border-focus-on-inverted)] focus:outline-none"
        onClick={() =>
          amplitude.track(AmplitudeEvents.link, {
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

export const query = `{${sidebarQuery}, ${landingPageQuery(
  "komponenter",
)}, "links": *[_type == "komponent_artikkel" && defined(kategori)]{_id,heading,"slug": slug,status,kategori, "sidebarindex": sidebarindex}}`;

export const getStaticProps: GetStaticProps = async ({
  draftMode = false,
}: {
  draftMode?: boolean;
}): Promise<PageProps> => {
  const client = getDraftClient({
    draftMode,
    token: draftMode ? draftmodeToken : viewerToken,
  });

  const { sidebar, page, links } = await client.fetch(query, {
    type: "komponent_artikkel",
  });

  return {
    props: {
      page,
      sidebar: generateSidebar(sidebar, "komponenter"),
      links,
      slug: "/komponenter",
      title: "",
      id: page?._id ?? "",
      draftMode,
      token: draftMode ? draftmodeToken : "",
    },
    revalidate: 60,
    notFound: false,
  };
};

export default function KomponentFrontpage(props: PageProps["props"]) {
  return props.draftMode ? (
    <PagePreview
      query={query}
      props={props}
      params={{
        type: "komponent_artikkel",
      }}
    >
      {(_props, loading) => {
        if (loading) {
          return <Page {...props} />;
        }
        return (
          <Page
            {..._props}
            sidebar={generateSidebar(_props.sidebar, "komponenter")}
            links={vercelStegaCleanAll(_props?.links)}
          />
        );
      }}
    </PagePreview>
  ) : (
    <Page {...props} />
  );
}
