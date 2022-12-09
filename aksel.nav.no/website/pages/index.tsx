/* eslint-disable @next/next/no-img-element */
import { Footer } from "@/layout";
import { akselForsideQuery, SanityT, urlFor } from "@/lib";
import { getClient } from "@/sanity-client";
import { NextFilled } from "@navikt/ds-icons";
import { Heading } from "@navikt/ds-react";
import { ComponentIcon, DownloadIcon, TokenIcon } from "@sanity/icons";
import { Header } from "components/layout/header/Header";
import { LatestBloggposts } from "components/website-modules/LatestBloggs";
import { ToolCard } from "components/website-modules/ToolsCard";
import { PreviewSuspense } from "next-sanity/preview";
import Head from "next/head";
import Link from "next/link";
import { lazy } from "react";
import Snowfall from "react-snowfall";

const introcards = [
  {
    title: "Komponenter",
    desc: "Bibliotekene Core, NAV.no, Interne flater",
    icon: ComponentIcon,
    href: "#",
  },
  {
    title: "Styling",
    desc: "Tokens for farger, spacing, shadows, etc.",
    icon: TokenIcon,
    href: "#",
  },
  {
    title: "Stæsj",
    desc: "Last ned font og ikoner",
    icon: DownloadIcon,
    href: "#",
  },
  /* {
    title: "Verktøy",
    desc: "NAVs digitale verktøy",
    icon: ControlsIcon,
    href: "#",
  }, */
];

const IntroCards = () => {
  return (
    <div className="centered-layout mb-72 grid w-full max-w-screen-md grid-cols-2  gap-6">
      {introcards.map(({ icon: Icon, title, desc, href }) => (
        <Link href={href} passHref>
          <a
            key={title}
            className="focus-visible:shadow-focus bg-surface-default hover:shadow-small hover:ring-border-subtle group rounded-lg p-4 hover:ring-1 focus:outline-none"
          >
            <span className="xs:flex items-center gap-2">
              <Icon aria-hidden className="shrink-0 text-2xl" />
              <span className="text-xl font-semibold group-hover:underline">
                {title}
              </span>
            </span>
            <div className="text-text-subtle mt-2">{desc}</div>
          </a>
        </Link>
      ))}
    </div>
  );
};

const GetStarted = () => {
  return (
    <div className="bg-deepblue-700 text-text-on-action mx-auto w-full max-w-screen-lg -translate-y-1/2 rounded-2xl py-12 px-2">
      <Heading size="xlarge" level="2" className="text-center">
        Kom i gang
      </Heading>
      <div className="xs:flex-row mx-auto mt-6 flex w-fit flex-col justify-center gap-4 md:gap-8">
        <Link href="#" passHref>
          <a className="focus-visible:text-text-default flex items-center gap-[6px] text-xl underline hover:no-underline focus:outline-none focus-visible:bg-blue-200 focus-visible:shadow-[0_0_0_2px_var(--a-blue-200)]">
            Produktleder
            <NextFilled aria-hidden className="h-6 w-6" />
          </a>
        </Link>
        <Link href="#" passHref>
          <a className="focus-visible:text-text-default flex items-center gap-[6px] text-xl underline hover:no-underline focus:outline-none focus-visible:bg-blue-200 focus-visible:shadow-[0_0_0_2px_var(--a-blue-200)]">
            Utvikler
            <NextFilled aria-hidden className="h-6 w-6" />
          </a>
        </Link>
        <Link href="#" passHref>
          <a className="focus-visible:text-text-default flex items-center gap-[6px] text-xl underline hover:no-underline focus:outline-none focus-visible:bg-blue-200 focus-visible:shadow-[0_0_0_2px_var(--a-blue-200)]">
            Designer <NextFilled aria-hidden className="h-6 w-6" />
          </a>
        </Link>
      </div>
    </div>
  );
};

const WithPreview = lazy(() => import("../components/WithPreview"));

const Forside = ({ tekster, temaer, bloggs }: PageProps): JSX.Element => {
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

      <div className="bg-[#DCCAF3]">
        <Header variant="transparent" />
        <main tabIndex={-1} id="hovedinnhold" className="focus:outline-none">
          <div className="centered-layout xs:mt-36 xs:mb-32 mb-16 mt-20 grid max-w-screen-sm place-items-center text-center">
            <Heading
              level="1"
              size="xlarge"
              className="text-deepblue-800 xs:text-[3.25rem]"
            >
              {tekster.title}
            </Heading>
          </div>

          <IntroCards />
          <div aria-hidden>
            <Snowfall
              color="rgba(0, 52, 83, 0.4)"
              speed={[0.2, 1.0]}
              snowflakeCount={160}
              radius={[0.5, 2.0]}
              style={{ height: "140%" }}
            />
          </div>
          <div className="bg-surface-subtle min-h-96 relative">
            <div className="centered-layout grid max-w-screen-2xl">
              <GetStarted />
            </div>
          </div>
          <div className="bg-surface-default relative pb-36">
            <div className="centered-layout -translate-y-1/2">
              <ToolCard />
            </div>
            <div className="centered-layout grid max-w-screen-2xl ">
              <LatestBloggposts
                bloggs={bloggs}
                title="Siste fra bloggen"
                variant="forside"
              />
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
  temaer: AkselTemaT[];
  bloggs: Partial<
    SanityT.Schema.aksel_blogg & {
      slug: string;
      contributors?: { title?: string }[];
    }
  >[];
  tekster: SanityT.Schema.vk_frontpage;
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
    bloggs = null,
    temaer = null,
  } = await client.fetch(akselForsideQuery);

  return {
    props: {
      temaer,
      bloggs,
      tekster,
      slug: "/",
      preview,
    },
    revalidate: 60,
  };
};

export default Page;
