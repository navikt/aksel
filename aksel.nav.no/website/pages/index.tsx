/* eslint-disable @next/next/no-img-element */
import { Footer } from "@/layout";
import { akselForsideQuery, SanityT, urlFor } from "@/lib";
import { getClient } from "@/sanity-client";
import { BodyLong, Heading } from "@navikt/ds-react";
import { ComponentIcon, PauseIcon, PlayIcon } from "@sanity/icons";
import cl from "clsx";
import { Header } from "components/layout/header/Header";
import ArtikkelCard from "components/sanity-modules/cards/ArtikkelCard";
import GodPraksisCard from "components/sanity-modules/cards/GodPraksisCard";
import AkselLink from "components/website-modules/AkselLink";
import { AkselCube } from "components/website-modules/cube";
import { LatestBloggposts } from "components/website-modules/LatestBloggs";
import { ToolCard } from "components/website-modules/ToolsCard";
import { PreviewSuspense } from "next-sanity/preview";
import Head from "next/head";
import Link from "next/link";
import { lazy, useEffect, useState } from "react";
import { logNav } from "../components";

function getPrefersReducedMotion() {
  const QUERY = "(prefers-reduced-motion: no-preference)";
  const mediaQueryList = window.matchMedia(QUERY);
  const prefersReducedMotion = !mediaQueryList.matches;
  return prefersReducedMotion;
}

const introcards = [
  {
    title: "Komponenter",
    desc: "Bibliotekene Core og Interne flater",
    icon: ComponentIcon,
    href: "/komponenter",
  },
  {
    title: "Design Tokens",
    desc: "Farger, spacing, shadows, etc.",
    icon: (props) => (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M12 3L19.7942 7.5V16.5L12 21L4.20576 16.5V7.5L12 3Z"
          stroke="#262626"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 15L12 21"
          stroke="#262626"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.7942 7.5L14.598 10.5"
          stroke="#262626"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.40196 10.5L4.2058 7.50001"
          stroke="#262626"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="12.0001"
          cy="11.9999"
          r="3"
          stroke="#262626"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    href: "/grunnleggende/styling/design-tokens",
  },
  {
    title: "Ikoner",
    desc: "Alle ikonene våre",
    icon: (props) => (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <circle cx="12" cy="12" r="9" stroke="#262626" strokeWidth="1.5" />
        <path
          d="M10.5793 10.2254L15.8339 9.59481L13.4206 13.7748L8.16602 14.4054L10.5793 10.2254Z"
          stroke="#262626"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
    href: "/grunnleggende/staesj/ikoner",
  },
];

const IntroCards = () => {
  return (
    <ul className="centered-layout xs:mb-36 mb-40 grid w-full max-w-screen-md grid-cols-2 gap-4 md:gap-6">
      {introcards.map(({ icon: Icon, title, desc, href }) => (
        <li key={title} className="grid">
          <Link href={href} passHref>
            <a
              className="focus-visible:shadow-focus bg-surface-default hover:shadow-small hover:ring-border-subtle group z-10 rounded-lg p-4 hover:ring-1 focus:outline-none"
              onClick={(e) =>
                logNav(
                  "intro-kort",
                  window.location.pathname,
                  e.currentTarget.getAttribute("href")
                )
              }
            >
              <span className="xs:flex items-center gap-2">
                <Icon aria-hidden className="shrink-0 text-2xl" role="img" />
                <span className="text-xl font-semibold group-hover:underline">
                  {title}
                </span>
              </span>
              <div className="text-text-subtle mt-2">{desc}</div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

const GetStarted = ({
  links,
  togglePause,
}: {
  links: { title: string; slug: string }[];
  togglePause: (x: boolean) => void;
}) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    const disableAnimations =
      navigator.userAgent.indexOf("Safari") !== -1 &&
      navigator.userAgent.indexOf("Chrome") === -1;

    setReducedMotion(getPrefersReducedMotion() || disableAnimations);
    const data = localStorage.getItem("pause-animations");
    if (disableAnimations) {
      setPause(true);
      togglePause(true);
      return;
    }
    setPause(JSON.parse(data) ?? false);
    togglePause(JSON.parse(data) ?? false);
  }, [togglePause]);

  return (
    <div className="bg-deepblue-700 text-text-on-action relative mx-auto w-full max-w-screen-lg -translate-y-1/2 rounded-2xl py-12 px-2">
      <Heading size="xlarge" level="2" className="text-center">
        Kom i gang
      </Heading>
      <ul
        style={{
          gridTemplateColumns: `repeat(${links.length}, minmax(0, 1fr))`,
        }}
        className="xs:grid mx-auto mt-6 flex w-fit flex-col place-items-center justify-evenly gap-4 md:gap-8"
      >
        {links.map((x) => (
          <li key={x.title}>
            <AkselLink href={`/${x.slug}`} inverted>
              {x.title}
            </AkselLink>
          </li>
        ))}
      </ul>
      {!reducedMotion && (
        <button
          className="focus-visible:ring-border-focus-on-inverted absolute top-2 right-2 grid h-11 w-11 place-items-center rounded text-2xl focus:outline-none focus-visible:ring-2"
          onClick={() => {
            setPause(!pause);
            togglePause(!pause);
            localStorage.setItem("pause-animations", JSON.stringify(!pause));
          }}
        >
          {pause ? (
            <>
              <PlayIcon aria-hidden role="img" />
              <span className="sr-only">Start animasjon</span>
            </>
          ) : (
            <>
              <PauseIcon aria-hidden role="img" />
              <span className="sr-only">Stopp animasjon</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

const WithPreview = lazy(() => import("../components/WithPreview"));

const Forside = ({
  page,
  tema,
  bloggs,
  resent,
  komigang,
  temaCount,
}: PageProps): JSX.Element => {
  const [pause, setPause] = useState(false);

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
          "header-animated-bg relative max-w-[100vw] overflow-hidden bg-[#DCCAF3]",
          { "animation-stop": pause }
        )}
      >
        <Header variant="transparent" />

        <main tabIndex={-1} id="hovedinnhold" className="focus:outline-none">
          <div className="z-20 pb-8">
            <div className="centered-layout xs:mt-36 xs:mb-18 xs:max-w-screen-xs relative mb-16 mt-20 grid max-w-xs place-items-center text-center">
              <Heading
                level="1"
                size="xlarge"
                className="text-deepblue-800 xs:text-[3.5rem] leading-[1.2]"
              >
                {page.title}
              </Heading>
              <AkselCube />
            </div>

            <IntroCards />
          </div>
          <div className="bg-surface-subtle min-h-96 relative pb-72 md:pb-40">
            <div className="centered-layout grid max-w-screen-2xl">
              <GetStarted links={komigang} togglePause={setPause} />
              {/* God praksis */}
              <div className="mx-auto">
                <Heading
                  level="2"
                  size="xlarge"
                  className="text-deepblue-800 xs:text-[3.25rem] mb-8 text-center"
                >
                  God praksis
                </Heading>
                {page?.god_praksis_intro && (
                  <BodyLong className="text-center">
                    {page.god_praksis_intro}
                  </BodyLong>
                )}
              </div>
              <ul className="card-grid-2-1 mx-auto mt-16 max-w-5xl">
                {tema.map((t) => (
                  <GodPraksisCard key={t._id} node={t} />
                ))}
              </ul>
              <div className="mx-auto mt-8">
                <AkselLink href="/god-praksis">
                  {`Utforsk alle ${temaCount} tema i god praksis`}
                </AkselLink>
              </div>
              <div className="mt-20">
                <Heading level="3" size="medium">
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

export interface AkselTemaT extends SanityT.Schema.aksel_tema {
  refCount: number;
}

interface PageProps {
  tema: AkselTemaT[];
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
  komigang: {
    title: string;
    slug: string;
  }[];
  temaCount: number;
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
    komigang = null,
    temaCount = 0,
  } = await client.fetch(akselForsideQuery);

  return {
    props: {
      tema,
      bloggs,
      page,
      resent,
      komigang,
      temaCount,
      slug: "/",
      preview,
      id: page?._id ?? "",
    },
    revalidate: 60,
  };
};

export default Page;
