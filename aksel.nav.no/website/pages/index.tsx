/* eslint-disable @next/next/no-img-element */
import { Footer } from "@/layout";
import { akselForsideQuery, SanityT, urlFor } from "@/lib";
import { getClient } from "@/sanity-client";
import { ComponentIcon, PauseIcon, PlayIcon } from "@navikt/aksel-icons";
import { BodyLong, Heading } from "@navikt/ds-react";
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
        width="25"
        height="25"
        {...props}
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.43701 12.5C5.43701 7.94365 9.13066 4.25 13.687 4.25C15.2739 4.25 16.4265 4.57516 17.3491 5.17306C18.2711 5.77061 19.0319 6.6847 19.7603 7.98893C20.2701 9.23986 20.4558 11.0729 19.1409 12.2863C18.6392 12.7493 18.012 12.982 17.3192 13.2391L17.3189 13.2393L17.3181 13.2396L17.3177 13.2397C17.2103 13.2796 17.1013 13.32 16.991 13.362C16.6196 13.5033 16.1837 13.6826 15.843 13.9598C15.4601 14.2712 15.187 14.7148 15.187 15.3125C15.187 15.7706 15.294 16.175 15.5132 16.5199C15.7288 16.859 16.02 17.089 16.3057 17.2548C16.5851 17.417 16.8886 17.5343 17.1497 17.6302C17.2102 17.6524 17.2682 17.6734 17.3244 17.6938L17.3247 17.6939C17.5288 17.7678 17.7074 17.8326 17.8824 17.9104C18.0341 17.9778 18.2347 18.2218 18.199 18.6447C18.1669 19.0253 17.9217 19.5564 17.1694 19.9814C16.1123 20.4743 14.9329 20.75 13.687 20.75C9.13066 20.75 5.43701 17.0563 5.43701 12.5ZM13.687 2.75C8.30224 2.75 3.93701 7.11522 3.93701 12.5C3.93701 17.8848 8.30224 22.25 13.687 22.25C15.1673 22.25 16.5725 21.9196 17.8311 21.3278C17.8463 21.3207 17.8613 21.313 17.876 21.3048C19.0194 20.6701 19.6136 19.7207 19.6937 18.7707C19.7706 17.8595 19.3524 16.9222 18.4916 16.5396C18.2631 16.4381 18.0201 16.3502 17.8105 16.2744L17.8102 16.2743L17.809 16.2738C17.7595 16.2559 17.712 16.2387 17.6669 16.2222C17.4112 16.1282 17.2155 16.0486 17.0589 15.9577C16.9087 15.8704 16.8273 15.791 16.7792 15.7153C16.7347 15.6454 16.687 15.5294 16.687 15.3125C16.687 15.2352 16.6995 15.1966 16.7895 15.1234C16.9218 15.0158 17.1463 14.9078 17.5245 14.7639C17.6117 14.7307 17.7061 14.6962 17.8063 14.6597C18.4827 14.4126 19.4192 14.0706 20.1581 13.3887C22.1944 11.5095 21.7328 8.82247 21.1293 7.37404C21.1186 7.34823 21.1064 7.32304 21.0928 7.2986C20.2923 5.85597 19.3781 4.70059 18.1649 3.9143C16.9434 3.12266 15.4886 2.75 13.687 2.75ZM17.6898 8.82978C16.8896 8.61536 16.0671 9.09024 15.8527 9.89044C15.6383 10.6906 16.1131 11.5131 16.9133 11.7276C17.7135 11.942 18.536 11.4671 18.7505 10.6669C18.9649 9.8667 18.49 9.04419 17.6898 8.82978ZM8.6083 7.94928C8.82271 7.14908 9.64522 6.6742 10.4454 6.88862C11.2456 7.10303 11.7205 7.92553 11.5061 8.72573C11.2917 9.52593 10.4692 10.0008 9.66896 9.78639C8.86876 9.57198 8.39388 8.74947 8.6083 7.94928ZM14.7147 5.44428C13.9145 5.22987 13.092 5.70474 12.8776 6.50494C12.6632 7.30514 13.138 8.12764 13.9382 8.34206C14.7384 8.55647 15.5609 8.0816 15.7754 7.2814C15.9898 6.4812 15.5149 5.65869 14.7147 5.44428Z"
          fill="#262626"
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
    href: "/ikoner",
  },
];

const IntroCards = () => {
  return (
    <ul className="centered-layout mb-40 grid w-full max-w-screen-md grid-cols-2 gap-4 sm:mb-36 md:gap-6">
      {introcards.map(({ icon: Icon, title, desc, href }) => (
        <li key={title} className="grid">
          <Link
            href={href}
            passHref
            className="focus-visible:shadow-focus bg-surface-default hover:shadow-small hover:ring-border-subtle group z-10 rounded-lg p-4 hover:ring-1 focus:outline-none"
            onClick={(e) =>
              logNav(
                "intro-kort",
                window.location.pathname,
                e.currentTarget.getAttribute("href")
              )
            }
          >
            <span className="items-center gap-2 sm:flex">
              <Icon aria-hidden className="shrink-0 text-2xl" role="img" />
              <span className="text-xl font-semibold group-hover:underline">
                {title}
              </span>
            </span>
            <div className="text-text-subtle mt-2">{desc}</div>
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
        className="mx-auto mt-6 flex w-fit flex-col place-items-center justify-evenly gap-4 sm:grid md:gap-8"
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
            <div className="centered-layout sm:mb-18 relative mb-16 mt-20 grid max-w-xs place-items-center text-center sm:mt-36 sm:max-w-[648px]">
              <Heading
                level="1"
                size="xlarge"
                className="text-deepblue-800 leading-[1.2] sm:text-[3.5rem]"
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
                  className="text-deepblue-800 mb-8 text-center sm:text-[3.25rem]"
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
