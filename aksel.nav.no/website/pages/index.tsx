/* eslint-disable @next/next/no-img-element */
import { Footer } from "@/layout";
import { akselForsideQuery, SanityT, urlFor } from "@/lib";
import { getClient } from "@/sanity-client";
import {
  CompassIcon,
  ComponentIcon,
  PaletteIcon,
  PauseIcon,
  PlayIcon,
} from "@navikt/aksel-icons";
import { Heading, Ingress } from "@navikt/ds-react";
import cl from "clsx";
import { Header } from "components/layout/header/Header";
import ArtikkelCard from "components/sanity-modules/cards/ArtikkelCard";
import GodPraksisCardSimple from "components/sanity-modules/cards/GodPraksisCardSimple";
import AkselLink from "components/website-modules/AkselLink";
import { AkselCube } from "components/website-modules/cube";
import { IntroCards } from "components/website-modules/IntroCards";
import { LatestBloggposts } from "components/website-modules/LatestBloggs";
import { ToolCard } from "components/website-modules/ToolsCard";
import { PrefersReducedMotion } from "components/website-modules/utils/prefers-reduced-motion";
import { PreviewSuspense } from "next-sanity/preview";
import Head from "next/head";
import { lazy, useEffect, useState } from "react";

const WithPreview = lazy(() => import("../components/WithPreview"));

const Forside = ({ page, tema, bloggs, resent }: PageProps): JSX.Element => {
  const [pause, setPause] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const disableAnimations =
      navigator.userAgent.indexOf("Safari") !== -1 &&
      navigator.userAgent.indexOf("Chrome") === -1;

    setReducedMotion(PrefersReducedMotion() || disableAnimations);
    const data = localStorage.getItem("pause-animations");
    if (disableAnimations) {
      setPause(true);
      setPause(true);
      return;
    }
    setPause(JSON.parse(data) ?? false);
  }, []);

  const validatedTema = tema.filter((t) => {
    return (
      t?.title &&
      t?.slug &&
      t?.pictogram &&
      t?.seksjoner.find((s) => !!s?.sider.find((s) => s?._ref))
    );
  });

  return (
    <>
      <Head>
        <title>Aksel - NAV</title>
        <meta property="og:title" content="Aksel - NAV" key="ogtitle" />
        <meta
          name="description"
          content={
            page?.seo?.meta ??
            "En samling ressurser fra ulike fagdisipliner som hjelper oss å skape bedre, universelt tilgjengelige og sammenhengende produkter i NAV."
          }
          key="desc"
        />
        <meta
          property="og:description"
          content={
            page?.seo?.meta ??
            "En samling ressurser fra ulike fagdisipliner som hjelper oss å skape bedre, universelt tilgjengelige og sammenhengende produkter i NAV."
          }
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

      <div
        className={cl(
          "header-animated-bg relative max-w-[100vw] overflow-hidden bg-violet-200",
          { "animation-stop": pause }
        )}
      >
        <Header />

        <main tabIndex={-1} id="hovedinnhold" className="focus:outline-none">
          <div className="z-20 pb-28">
            <div className="centered-layout relative mb-12 mt-20 grid max-w-xs place-items-center text-center sm:mt-36 sm:max-w-[600px]">
              <Heading
                level="1"
                size="xlarge"
                className="text-deepblue-700 leading-[1.2] sm:text-[3.5rem]"
              >
                Aksel hjelper team å lage digitale produkter
              </Heading>
              <AkselCube />
            </div>

            <IntroCards
              links={[
                {
                  title: "Komponenter",
                  desc: "Bibliotekene Core og Interne flater",
                  icon: ComponentIcon,
                  href: "/komponenter",
                },
                {
                  title: "Design Tokens",
                  desc: "Farger, spacing, shadows, etc.",
                  icon: PaletteIcon,
                  href: "/grunnleggende/styling/design-tokens",
                },
                {
                  title: "Ikoner",
                  desc: "Alle ikonene våre",
                  icon: CompassIcon,
                  href: "/ikoner",
                },
              ]}
              className="centered-layout mb-40 max-w-md grid-cols-1 sm:mb-36 md:max-w-screen-lg md:grid-cols-3"
            />
          </div>
          <div className="bg-surface-subtle min-h-96  relative pb-72  md:pb-40">
            <div className="centered-layout grid max-w-screen-2xl">
              {/* God praksis */}
              <div className="bg-surface-default ring-border-subtle mx-auto w-full -translate-y-32 rounded-2xl px-4 py-12 ring-1 sm:px-12 sm:py-20">
                {!reducedMotion && (
                  <button
                    className="focus-visible:shadow-focus absolute top-2 right-2 grid h-11 w-11 place-items-center rounded-xl text-2xl focus:outline-none focus-visible:ring-2"
                    onClick={() => {
                      setPause(!pause);
                      localStorage.setItem(
                        "pause-animations",
                        JSON.stringify(!pause)
                      );
                    }}
                  >
                    {pause ? (
                      <>
                        <PlayIcon aria-hidden />
                        <span className="sr-only">Start animasjon</span>
                      </>
                    ) : (
                      <>
                        <PauseIcon aria-hidden />
                        <span className="sr-only">Stopp animasjon</span>
                      </>
                    )}
                  </button>
                )}
                <div>
                  <Heading
                    level="2"
                    size="xlarge"
                    className="text-deepblue-700 mb-6"
                  >
                    God praksis
                  </Heading>
                  {page?.god_praksis_intro && (
                    <Ingress className="max-w-3xl">
                      {page.god_praksis_intro}
                    </Ingress>
                  )}
                </div>
                <ul className="mt-12 grid gap-x-8 md:grid-cols-2 xl:grid-cols-3">
                  {validatedTema.map((t) => (
                    <GodPraksisCardSimple key={t._id} node={t} />
                  ))}
                </ul>
              </div>

              <div className="-mt-12">
                <Heading level="3" size="medium" className="text-deepblue-800">
                  Nylige artikler
                </Heading>
                <div className="card-grid-3-1 my-6">
                  {resent.map((art: any) => (
                    <ArtikkelCard
                      level="4"
                      variant="tema"
                      {...art}
                      key={art._id}
                    />
                  ))}
                </div>
                <AkselLink href="/god-praksis/artikler">
                  Utforsk alle artikler i god praksis
                </AkselLink>
              </div>
            </div>
          </div>
          <div className="bg-surface-default relative pb-36">
            <div className="centered-layout -translate-y-1/2">
              <ToolCard />
            </div>
            <div className="centered-layout -mt-16 grid max-w-screen-2xl md:mt-8 ">
              <LatestBloggposts
                bloggs={bloggs}
                title="Siste fra bloggen"
                variant="forside"
                level="2"
              />
              <AkselLink href="/produktbloggen">
                Les flere blogginnlegg
              </AkselLink>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

const Page = (props: PageProps): JSX.Element => {
  if (props?.preview) {
    return (
      <PreviewSuspense fallback={<Forside {...props} />}>
        <WithPreview comp={Forside} query={akselForsideQuery} props={props} />
      </PreviewSuspense>
    );
  }

  return <Forside {...props} />;
};

interface PageProps {
  tema: SanityT.Schema.aksel_tema[];
  bloggs: Partial<
    SanityT.Schema.aksel_blogg & {
      slug: string;
      contributors?: { title?: string }[];
    }
  >[];
  page: {
    title: string;
    god_praksis_intro: string;
    seo: { meta: string; image: string };
  };
  resent: SanityT.Schema.aksel_artikkel &
    {
      slug: string;
      tema: string[];
      contributors?: { title?: string }[];
    }[];
  slug: string;
  preview: boolean;
}

export const getStaticProps = async ({
  preview = false,
}: {
  preview?: boolean;
}) => {
  const client = getClient();

  const {
    page = null,
    bloggs = null,
    tema = null,
    resent = null,
  } = await client.fetch(akselForsideQuery);

  return {
    props: {
      tema,
      bloggs,
      page,
      resent,
      slug: "/",
      preview,
      id: page?._id ?? "",
    },
    revalidate: 60,
  };
};

export default Page;
