/* eslint-disable @next/next/no-img-element */
import { BloggCard, logNav, TemaCard } from "@/components";
import { AkselHeader, Footer } from "@/layout";
import { SanityT, urlFor } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { Next } from "@navikt/ds-icons";
import { BodyLong, Detail, Heading, Link } from "@navikt/ds-react";
import cl from "classnames";
import Head from "next/head";
import NextLink from "next/link";
import { akselForsideQuery } from "@/lib";
import { PreviewSuspense } from "next-sanity/preview";
import { lazy, useEffect, useState } from "react";
import { getClient } from "@/sanity-client";
import Snowfall from "react-snowfall";

const portalkort = [
  {
    title: "Designsystemet",
    description: "Åpen for alle",
    href: "/designsystem",
    icon: (
      <svg
        className="h-7 w-7"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        focusable="false"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M6 42v-7.8l9.7-9.7-8.95-9a3.03 3.03 0 0 1-.9-2.1 3.03 3.03 0 0 1 .9-2.1l4.5-4.55a3.03 3.03 0 0 1 2.1-.9 3.07 3.07 0 0 1 2.15.9l9 9 9.85-9.85c.17-.17.33-.28.5-.33.17-.04.35-.07.55-.07.2 0 .38.03.55.08.17.04.33.15.5.32l5.65 5.65c.17.17.28.33.33.5.05.17.07.35.07.55 0 .2-.02.38-.07.55a1.2 1.2 0 0 1-.33.5l-9.85 9.85 9 9a3.07 3.07 0 0 1 .9 2.15 3.03 3.03 0 0 1-.9 2.1l-4.5 4.45a3.03 3.03 0 0 1-2.1.9 3.03 3.03 0 0 1-2.1-.9l-9-8.95L13.8 42H6Zm11.85-19.65 4.5-4.5-3.65-3.65-2.4 2.4-2.1-2.1 2.4-2.4-3.2-3.2-4.5 4.5 8.95 8.95Zm16.7 16.75 4.5-4.5-3.2-3.2-2.4 2.4-2.1-2.1 2.4-2.4-3.65-3.65-4.5 4.5 8.95 8.95ZM9 39h3.5l20.75-20.75-3.5-3.5L9 35.5V39Zm26.35-22.85 3.5-3.5-3.5-3.5-3.5 3.5 3.5 3.5Z"
        />
      </svg>
    ),
  },
  {
    title: "Identitet",
    description: "Åpen for alle",
    href: "https://identitet.nav.no/",
    icon: (
      <svg
        className="h-7 w-7"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        focusable="false"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M19.25 27.4 21.05 21.65 16.3 17.95H22.1L24 12L25.85 17.95H31.7L26.95 21.65L28.7 27.4L24 23.85ZM12.2 46V30.8Q9.95 28.45 8.975 25.65Q8 22.85 8 20Q8 13.2 12.6 8.6Q17.2 4 24 4Q30.8 4 35.4 8.6Q40 13.2 40 20Q40 22.85 39.025 25.65Q38.05 28.45 35.8 30.8V46L24 42.05ZM24 33Q29.45 33 33.225 29.225Q37 25.45 37 20Q37 14.55 33.225 10.775Q29.45 7 24 7Q18.55 7 14.775 10.775Q11 14.55 11 20Q11 25.45 14.775 29.225Q18.55 33 24 33ZM15.2 41.8 24 39.05 32.8 41.8V33.25Q30.8 34.7 28.5 35.35Q26.2 36 24 36Q21.8 36 19.5 35.35Q17.2 34.7 15.2 33.25ZM24 37.5Q24 37.5 24 37.5Q24 37.5 24 37.5Q24 37.5 24 37.5Q24 37.5 24 37.5Z"
        />
      </svg>
    ),
  },
  {
    title: "Security Playbook",
    description: "Åpen for alle",
    href: "https://sikkerhet.nav.no/",
    icon: (
      <svg
        className="h-7 w-7"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        focusable="false"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M24 44Q17 42.25 12.5 35.875Q8 29.5 8 21.9V10L24 4L40 10V21.9Q40 29.5 35.5 35.875Q31 42.25 24 44ZM24 40.9Q29.3 39.15 32.775 34.475Q36.25 29.8 36.85 24H24V7.25L11 12.1V21.9Q11 22.5 11.025 22.925Q11.05 23.35 11.15 24H24Z"
        />
      </svg>
    ),
  },
  {
    title: "Etterlevelse",
    description: "Kun for ansatte",
    href: "https://etterlevelse.intern.nav.no/",
    icon: (
      <svg
        className="h-7 w-7"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        focusable="false"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M17.3 45 13.5 38.5 5.95 36.95 6.8 29.6 2 24 6.8 18.45 5.95 11.1 13.5 9.55 17.3 3 24 6.1 30.7 3 34.55 9.55 42.05 11.1 41.2 18.45 46 24 41.2 29.6 42.05 36.95 34.55 38.5 30.7 45 24 41.9ZM24 24ZM21.85 30.65 33.2 19.4 30.95 17.35 21.85 26.35 17.1 21.4 14.8 23.65ZM18.65 41.05 24 38.8 29.5 41.05 32.85 36.05 38.7 34.55 38.1 28.6 42.15 24 38.1 19.3 38.7 13.35 32.85 11.95 29.4 6.95 24 9.2 18.5 6.95 15.15 11.95 9.3 13.35 9.9 19.3 5.85 24 9.9 28.6 9.3 34.65 15.15 36.05Z"
        />
      </svg>
    ),
  },
];

const Portaler = () => {
  const logPortalCard = (e) =>
    logNav(
      "portal-kort",
      window.location.pathname,
      e.currentTarget.getAttribute("href")
    );

  return (
    <div className="mt-12 md:mt-4">
      <Heading
        level="2"
        size="xsmall"
        className="uppercase tracking-widest text-white"
      >
        Snarveier
      </Heading>
      <nav aria-label="Side-snarveier">
        <ul className="mt-2 grid grid-flow-row gap-x-6 md:grid-cols-2 lg:grid-cols-1">
          {portalkort.map((x, y) => (
            <li
              key={x.title}
              className={cl("border-gray-400/20 py-2", {
                "border-t-0  md:border-t lg:border-t-0": y === 0,
                "border-t ": y > 0,
              })}
            >
              <NextLink href={x.href} passHref>
                <a
                  onClick={(e) => logPortalCard(e)}
                  className="focus-visible:shadow-focus-inverted group flex items-center gap-2 py-1 focus:outline-none md:w-auto xl:gap-3"
                >
                  <div className="group-hover:text-deepblue-900 relative grid aspect-square w-12 shrink-0 place-items-center rounded-full bg-blue-400 text-white group-hover:bg-white">
                    {x.icon}
                  </div>
                  <div className="pr-8 text-white">
                    <Heading
                      level="3"
                      size="xsmall"
                      className="group-hover:underline"
                    >
                      {x.title}
                    </Heading>
                    <Detail size="small" className="text-deepblue-100/95">
                      {x.description}
                    </Detail>
                  </div>
                  <Next className="ml-auto shrink-0 opacity-80" aria-hidden />
                </a>
              </NextLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

const WithPreview = lazy(() => import("../components/WithPreview"));

const Forside = ({
  prinsipp_1,
  tekster,
  temaer,
  bloggs,
}: PageProps): JSX.Element => {
  const [xmas, setXmas] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setXmas(true), 10000);

    return () => {
      clearTimeout(t);
      setXmas(false);
    };
  }, []);

  const hasPrinsipp1 =
    prinsipp_1 &&
    prinsipp_1?.hovedside &&
    prinsipp_1?.vis &&
    prinsipp_1?.undersider.length ===
      prinsipp_1.undersider.filter((x) => !!x).length;

  const filteredTemas = temaer.filter((x) => x.refCount > 0);

  return (
    <>
      <Head>
        <title>Aksel - NAV</title>
        <meta property="og:title" content="Aksel - NAV" key="ogtitle" />
        <meta
          property="og:description"
          content={
            tekster?.seo?.meta ??
            "En samling ressurser fra ulike fagdisipliner som hjelper oss å skape bedre, universelt tilgjengelige og sammenhengende produkter i NAV."
          }
          key="ogdesc"
        />
        <meta
          property="og:image"
          content={
            tekster?.seo?.image
              ? urlFor(tekster?.seo?.image)
                  .width(1200)
                  .height(630)
                  .fit("crop")
                  .url()
              : ""
          }
          key="ogimage"
        />
      </Head>

      <div className="bg-deepblue-900">
        <AkselHeader variant="forside" />
        <main tabIndex={-1} id="hovedinnhold" className="focus:outline-none">
          <div className="bg-deepblue-900 from-deepblue-900 via-deepblue-900/50 to-deepblue-700 relative bg-gradient-to-b px-4 pt-16 pb-24 text-white">
            {xmas && (
              <div aria-hidden>
                <Snowfall
                  color="rgba(230, 241, 248, 0.3)"
                  speed={[0.2, 1.0]}
                  snowflakeCount={100}
                  style={{ height: "120%" }}
                  radius={[0.5, 2.0]}
                />
              </div>
            )}
            <div className="dynamic-wrapper">
              <div className="gap-6 lg:grid lg:grid-cols-3">
                <div className="max-w-prose pr-6 lg:col-span-2">
                  <Heading level="1" size="xlarge">
                    {tekster.title}
                  </Heading>
                  <div className="text-deepblue-100/95 mt-6">
                    <SanityBlockContent blocks={tekster.beskrivelse} />
                  </div>
                </div>
                <Portaler />
              </div>
            </div>
          </div>

          {/* Temaseksjon */}
          {filteredTemas && filteredTemas.length > 0 && (
            <section className="bg-deepblue-50 relative px-4 pt-16 pb-24">
              {/* Separator */}
              <svg
                className="absolute inset-x-0 top-0 w-full"
                viewBox="0 0 100 12"
                focusable="false"
                aria-hidden="true"
              >
                <polygon
                  points="0,0 100,0 0,12"
                  className="fill-deepblue-700"
                ></polygon>
              </svg>
              <div className="dynamic-wrapper relative z-10 -mt-16">
                <Heading
                  level="2"
                  size="small"
                  className="text-text-on-inverted uppercase"
                >
                  Temaer
                </Heading>
                <div className="card-grid-3-1 mt-4">
                  {/* Temakort */}
                  {filteredTemas.slice(0, 7).map((tema) => (
                    <TemaCard {...tema} key={tema._id} />
                  ))}
                </div>
                {filteredTemas.length > 6 && (
                  <NextLink href="/god-praksis">
                    <a className="text-text-default hover:text-deepblue-700 mt-6 inline-block underline hover:no-underline">
                      Utforsk alle temaer
                    </a>
                  </NextLink>
                )}
              </div>
            </section>
          )}

          {/* Prinsipper */}
          {hasPrinsipp1 && (
            <section className="bg-deepblue-50 px-4 pt-0 pb-32 lg:pt-12">
              <div className="dynamic-wrapper relative z-10">
                <div className="lg:grid lg:grid-flow-row-dense lg:gap-x-8">
                  <div className="lg:order-1 lg:col-start-2 lg:row-start-1 lg:-mb-8 lg:-mt-12">
                    <img
                      className="mx-auto max-w-xs sm:w-full lg:mx-auto lg:max-w-md"
                      src="/images/prinsipper.webp"
                      width="800"
                      alt=""
                    />
                  </div>
                  <div className="self-end">
                    <div className="max-w-prose">
                      <h2 className="mt-4 text-2xl font-semibold tracking-tight lg:mt-auto lg:text-4xl">
                        Prinsipper for brukeropplevelse
                      </h2>
                      <SanityBlockContent
                        className="mt-3"
                        blocks={prinsipp_1?.beskrivelse}
                      />
                    </div>

                    <div className="mt-8 flex flex-wrap gap-2 lg:max-w-4xl lg:gap-3">
                      {prinsipp_1.undersider.map((x) => (
                        <NextLink
                          href={`/${x.slug.current}`}
                          passHref
                          key={x.slug.current}
                        >
                          <a className="hover:bg-deepblue-200/60 focus-visible:shadow-focus flex w-full items-center justify-between gap-4 rounded-md bg-white px-6 py-4 leading-tight shadow hover:shadow-md focus:outline-none sm:w-auto">
                            <span className="font-semibold">{x.heading}</span>{" "}
                            <Next
                              className="-mr-1 sm:hidden"
                              aria-hidden
                              aria-label="Gå til siden"
                            />{" "}
                          </a>
                        </NextLink>
                      ))}
                    </div>
                    <Link
                      className="mt-6 inline-block text-gray-800"
                      href={`/${prinsipp_1.hovedside.slug.current}`}
                    >
                      Utforsk alle prinsippene
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}

          <section className="relative bg-white px-4 pb-24">
            {/* Separator */}
            <svg
              className="absolute inset-x-0 top-0 w-full"
              viewBox="0 0 100 12"
              focusable="false"
              aria-hidden="true"
            >
              <polygon
                points="0,0 100,0 0,12"
                className="fill-deepblue-50"
              ></polygon>
            </svg>

            <div className="dynamic-wrapper relative z-10">
              <div className="gap-6 2xl:grid 2xl:grid-cols-3 2xl:items-start">
                {/* Redaksjons-kort */}
                <div className="mx-auto grid max-w-lg  rounded-lg shadow 2xl:sticky 2xl:top-24">
                  <div className="bg-deepblue-700 rounded-t-lg px-6 py-6 text-white">
                    <Heading size="medium" level="2">
                      Aksel trenger deg!
                    </Heading>
                    <BodyLong className="mt-1 max-w-prose">
                      Vi trenger hjelp med å lage innhold til Aksel. Har du
                      ideer, mulighet til å skrive eller lurer på noe om
                      produktutvikling?
                    </BodyLong>
                  </div>
                  <a
                    className="bg-deepblue-300/60 hover:bg-deepblue-200 focus-visible:shadow-focus group flex items-center justify-between rounded-b-lg px-6 py-4 leading-snug hover:underline focus:outline-none focus-visible:rounded-lg"
                    href="https://nav-it.slack.com/archives/C0370ADS0HX"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>
                      Ta kontakt med{" "}
                      <span className="font-semibold">#aksel</span> på Slack
                    </span>
                  </a>
                </div>
                {/* Blogg */}
                {bloggs && bloggs.length > 0 && (
                  <div className="order-1 mt-16 xl:pl-12 2xl:col-span-2 2xl:mt-44">
                    <Heading
                      level="2"
                      size="xsmall"
                      className="uppercase tracking-widest"
                    >
                      Blogg
                    </Heading>
                    <div className="mt-1 divide-y divide-gray-200">
                      {/* Blogg-kort */}
                      {bloggs.slice(0, 7).map((blog) => (
                        <BloggCard key={blog._id} blog={blog} />
                      ))}
                    </div>
                    {bloggs?.length > 6 && (
                      <NextLink href="/produktbloggen" passHref>
                        <a
                          className="text-text-default hover:text-deepblue-700 mt-6 inline-block underline hover:no-underline"
                          href="#"
                        >
                          Flere bloggposter
                        </a>
                      </NextLink>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>

        <Footer variant="aksel" />
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
  temaer: AkselTemaT[];
  bloggs: Partial<
    SanityT.Schema.aksel_blogg & {
      slug: string;
      contributors?: { title?: string }[];
    }
  >[];
  tekster: SanityT.Schema.vk_frontpage;
  prinsipp_1: {
    beskrivelse?: SanityT.Schema.riktekst_enkel;
    vis: boolean;
    hovedside: { heading: string; slug: { current: string } };
    undersider: { heading: string; slug: { current: string } }[];
  };
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
    tekster = null,
    prinsipp_1 = null,
    bloggs = null,
    temaer = null,
  } = await client.fetch(akselForsideQuery);

  return {
    props: {
      temaer,
      prinsipp_1,
      bloggs,
      tekster,
      slug: "/",
      preview,
    },
    revalidate: 60,
  };
};

export default Page;
