import GodPraksisCardSimple from "@/cms/cards/GodPraksisCardSimple";
import FrontpageBlock, {
  BlocksT,
} from "@/cms/frontpage-blocks/FrontpageBlocks";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { getClient } from "@/sanity/client.server";
import { contributorsAll } from "@/sanity/queries";
import { AkselTemaT, NextPageT } from "@/types";
import { userPrefersReducedMotion } from "@/utils";
import { IntroCards } from "@/web/IntroCards";
import { AkselCubeAnimated } from "@/web/aksel-cube/AkselCube";
import { SEO } from "@/web/seo/SEO";
import {
  CompassIcon,
  ComponentIcon,
  PaletteIcon,
  PauseFillIcon,
  PlayFillIcon,
} from "@navikt/aksel-icons";
import { BodyLong, Heading } from "@navikt/ds-react";
import cl from "clsx";
import { GetStaticProps } from "next/types";
import { Suspense, lazy, useEffect, useState } from "react";

type PageProps = NextPageT<{
  tema: Array<AkselTemaT>;
  page: {
    title: string;
    god_praksis_intro: string;
    seo: { meta: string; image: string };
  };
  blocks?: BlocksT[];
}>;

export const getStaticProps: GetStaticProps = async ({
  preview = false,
}: {
  preview?: boolean;
}): Promise<PageProps> => {
  const client = getClient();

  const { page = null, tema = null, blocks = null } = await client.fetch(query);

  return {
    props: {
      tema,
      page,
      blocks,
      slug: "/",
      preview,
      id: page?._id ?? "",
      title: "Forsiden",
    },
    revalidate: 600,
    notFound: false,
  };
};

const query = `*[_type == "aksel_forside"][0]{
  "page": {
    ...,
  },
  "tema": *[_type == "aksel_tema" && defined(seksjoner[].sider[])],
  blocks[]{
    ...,
    _type == "nytt_fra_aksel"=>{
      highlights[]->{
        ...,
        "content": null,
        ${contributorsAll},
        "tema": tema[]->title,
      },
      "curatedResent": {
        "bloggposts": *[_type == "aksel_blogg" && !(_id in ^.highlights[]._ref)] | order(_createdAt desc)[0...2]{
          _type,
          _id,
          heading,
          _createdAt,
          _updatedAt,
          publishedAt,
          "slug": slug.current,
          ingress,
          seo,
          ${contributorsAll}
        },
        "artikler": *[_type == "aksel_artikkel" && defined(publishedAt) && !(_id in ^.highlights[]._ref)] | order(publishedAt desc)[0...4]{
          _type,
          _id,
          heading,
          _createdAt,
          _updatedAt,
          publishedAt,
          "slug": slug.current,
          "tema": tema[]->title,
          ingress,
          seo,
          ${contributorsAll}
        },
        "komponenter": *[_type in ["komponent_artikkel", "ds_artikkel", "templates_artikkel"] && defined(publishedAt) && !(_id in ^.highlights[]._ref)] | order(publishedAt desc)[0...3]{
          _type,
          _id,
          heading,
          "slug": slug.current,
          status,
          kategori,
          _createdAt,
          _updatedAt,
          publishedAt,
          seo,
          ${contributorsAll}
        },
      },
    }
  }
}`;

const Forside = ({ page, tema, blocks }: PageProps["props"]) => {
  const [pause, setPause] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const disableAnimations =
      navigator.userAgent.indexOf("Safari") !== -1 &&
      navigator.userAgent.indexOf("Chrome") === -1;

    setReducedMotion(userPrefersReducedMotion() || disableAnimations);
    const data = localStorage.getItem("pause-animations");
    if (disableAnimations) {
      setPause(true);
      setPause(true);
      return;
    }
    setPause(JSON.parse(data) ?? false);
  }, []);

  const validatedTema = tema
    .filter(
      (t) =>
        t?.title &&
        t?.slug &&
        t?.pictogram &&
        t?.seksjoner.some((seksjon) =>
          seksjon?.sider.some((side: any) => side?._ref)
        )
    )
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <>
      <SEO
        title="Aksel"
        description={
          page?.seo?.meta ??
          "En samling ressurser fra ulike fagdisipliner som hjelper oss å skape bedre, universelt tilgjengelige og sammenhengende produkter i NAV."
        }
        image={page?.seo?.image}
      />
      <div
        className={cl(
          "header-animated-bg relative max-w-[100vw] overflow-hidden bg-violet-200",
          { "animation-stop": pause }
        )}
      >
        <Header />

        <main tabIndex={-1} id="hovedinnhold" className="focus:outline-none">
          <div className="z-20 pb-28">
            <div className="relative mx-auto mb-12 mt-20 grid w-full place-items-center px-4 text-center sm:mt-36 sm:max-w-[632px] sm:px-6">
              <Heading
                level="1"
                size="xlarge"
                className="text-deepblue-700 leading-[1.2] sm:text-[3.5rem]"
              >
                Aksel gjør det enklere å lage digitale produkter
              </Heading>
              <AkselCubeAnimated />
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
              className="mx-auto mb-40 w-full max-w-md grid-cols-1 px-4 sm:mb-36 sm:px-6 md:max-w-screen-lg md:grid-cols-3"
              variant="forside"
            />
          </div>

          <div className="bg-surface-subtle min-h-96 relative pb-20">
            <div className="mx-auto grid w-full max-w-screen-2xl px-4 sm:px-6">
              {/* God praksis */}
              <div className="bg-surface-default ring-border-subtle mx-auto w-full -translate-y-48 rounded-2xl px-4 py-12 ring-1 sm:-translate-y-32 sm:px-12 sm:py-20">
                {!reducedMotion && (
                  <button
                    className="focus-visible:shadow-focus text-text-subtle hover:text-text-default absolute right-2 top-2 grid h-11 w-11 place-items-center rounded-xl text-2xl focus:outline-none focus-visible:ring-2"
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
                        <PlayFillIcon aria-hidden />
                        <span className="sr-only">Start animasjon</span>
                      </>
                    ) : (
                      <>
                        <PauseFillIcon aria-hidden />
                        <span className="sr-only">Stopp animasjon</span>
                      </>
                    )}
                  </button>
                )}
                <div className="px-2 sm:px-6">
                  <Heading
                    level="2"
                    size="xlarge"
                    className="text-deepblue-700 mb-6"
                  >
                    God praksis
                  </Heading>
                  {page?.god_praksis_intro && (
                    <BodyLong size="large" className="max-w-3xl">
                      {page.god_praksis_intro}
                    </BodyLong>
                  )}
                </div>
                <ul className="mt-12 grid gap-x-8 md:grid-cols-2 xl:grid-cols-3">
                  {validatedTema.map((t) => (
                    <GodPraksisCardSimple key={t._id} node={t} />
                  ))}
                </ul>
              </div>

              <div className="-mt-24 sm:-mt-12">
                <FrontpageBlock blocks={blocks} />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

const WithPreview = lazy(() => import("@/preview"));

const Page = (props: PageProps["props"]) => {
  if (props?.preview) {
    return (
      <Suspense fallback={<Forside {...props} />}>
        <WithPreview comp={Forside} query={query} props={props} />
      </Suspense>
    );
  }

  return <Forside {...props} />;
};

export default Page;
