import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import cl from "clsx";
import { groq } from "next-sanity";
import Link from "next/link";
import { GetStaticProps } from "next/types";
import { useState } from "react";
import Snowfall from "react-snowfall";
import {
  CompassIcon,
  ComponentIcon,
  PaletteIcon,
  PauseFillIcon,
  PlayFillIcon,
} from "@navikt/aksel-icons";
import {
  BodyLong,
  Box,
  Button,
  HGrid,
  Heading,
  Page,
  VStack,
  useClientLayoutEffect,
} from "@navikt/ds-react";
import FrontpageBlock, {
  BlocksT,
} from "@/cms/frontpage-blocks/FrontpageBlocks";
import Footer from "@/layout/footer/Footer";
import GpFrontpageCard from "@/layout/god-praksis-page/cards/GpFrontpageCard";
import Header from "@/layout/header/Header";
import { getClient } from "@/sanity/client.server";
import { contributorsAll } from "@/sanity/queries";
import { NextPageT } from "@/types";
import { userPrefersReducedMotion } from "@/utils";
import { IntroCards } from "@/web/IntroCards";
import { AkselCubeAnimated } from "@/web/aksel-cube/AkselCube";
import { PagePreview } from "@/web/preview/PagePreview";
import { SEO } from "@/web/seo/SEO";

type PageProps = NextPageT<{
  tema: {
    title: string;
    slug: { current: string };
    pictogram: SanityImageSource;
  }[];
  page: {
    title: string;
    god_praksis_intro: string;
    seo: { meta: string; image: string };
  };
  blocks?: BlocksT[];
}>;

/**
 * Using `count` with references in groq query causes infinite loop when previewing
 */
const query = groq`*[_type == "aksel_forside"][0]{
  "page": {
    ...,
  },
  "tema": select(
    $preview == "true" => *[_type == "gp.tema"] | order(lower(title)),
    $preview != "true" => *[_type == "gp.tema" && count(*[_type=="aksel_artikkel"
      && (^._id in undertema[]->tema._ref)]) > 0] | order(lower(title))
  ),
  blocks[]{
    ...,
    _type == "nytt_fra_aksel"=>{
      highlights[]->{
        ...,
        "content": null,
        ${contributorsAll},
        "tema": undertema[]->tema->title,
      },
      "curatedResent": {
        "bloggposts": *[_type == "aksel_blogg" && !(_id in ^.highlights[]._ref)] | order(_createdAt desc)[0...4]{
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
        "artikler": select(
          $preview == "true" => *[_type == "aksel_artikkel" && defined(publishedAt) && !(_id in ^.highlights[]._ref)] | order(publishedAt desc)[0...8]{
            _type,
            _id,
            heading,
            _createdAt,
            _updatedAt,
            publishedAt,
            "slug": slug.current,
            "tema": undertema[]->tema->title,
            ingress,
            seo,
            ${contributorsAll}
          },
          $preview != "true" => *[_type == "aksel_artikkel" && defined(publishedAt) && !(_id in ^.highlights[]._ref) && count(*[references(^._id)]) > 0] | order(publishedAt desc)[0...8]{
            _type,
            _id,
            heading,
            _createdAt,
            _updatedAt,
            publishedAt,
            "slug": slug.current,
            "tema": undertema[]->tema->title,
            ingress,
            seo,
            ${contributorsAll}
          }
        ),
        "komponenter": *[_type in ["komponent_artikkel", "ds_artikkel", "templates_artikkel"] && defined(publishedAt) && !(_id in ^.highlights[]._ref)] | order(publishedAt desc)[0...7]{
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

export const getStaticProps: GetStaticProps = async ({
  preview = false,
}: {
  preview?: boolean;
}): Promise<PageProps> => {
  const client = getClient();

  const {
    page = null,
    tema = null,
    blocks = null,
  } = await client.fetch(query, {
    preview: "false",
  });

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

const Forside = ({ page, tema, blocks }: PageProps["props"]) => {
  const [pause, setPause] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useClientLayoutEffect(() => {
    const disableAnimations =
      navigator.userAgent.indexOf("Safari") !== -1 &&
      navigator.userAgent.indexOf("Chrome") === -1;

    setReducedMotion(userPrefersReducedMotion() || disableAnimations);
    const data = localStorage.getItem("pause-animations");
    if (disableAnimations) {
      setPause(true);
      return;
    }
    setPause(JSON.parse(data ?? "false"));
  }, []);

  return (
    <Page
      footer={<Footer />}
      footerPosition="belowFold"
      contentBlockPadding="none"
      className={cl(
        "header-animated-bg relative overflow-hidden bg-violet-200",
        { "animation-stop": pause },
      )}
    >
      <SEO
        title="Aksel"
        description={
          page?.seo?.meta ??
          "En samling ressurser fra ulike fagdisipliner som hjelper oss å skape bedre, universelt tilgjengelige og sammenhengende produkter i Nav."
        }
        image={page?.seo?.image}
      />
      <Header />
      <main tabIndex={-1} id="hovedinnhold" className="focus:outline-none">
        <div className="bg-violet-600 py-4 text-center text-xl text-white">
          <Link
            href="/darkside"
            target="_blank"
            className="rounded p-1 underline hover:decoration-2 focus:shadow-focus-inverted focus:outline-none"
          >
            Vi er trenger testere for darkmode og theming!
          </Link>
        </div>
        {!pause && (
          <div aria-hidden>
            <Snowfall
              style={{ zIndex: 1 }}
              color="rgba(230, 241, 248, 0.9)"
              speed={reducedMotion || pause ? [0, 0] : [0.1, 0.2]}
              wind={reducedMotion || pause ? [0, 0] : [-0.2, 0.2]}
              snowflakeCount={600}
            />
          </div>
        )}
        <div className="z-20 pb-28">
          <div className="relative mx-auto mb-12 mt-20 grid w-full place-items-center px-4 text-center sm:mt-36 sm:max-w-[632px] sm:px-6">
            <Heading
              level="1"
              size="xlarge"
              className="leading-[1.2] text-deepblue-700 sm:text-[3.5rem]"
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

        <Box background="surface-subtle" paddingBlock="0 32">
          {/* God praksis */}

          <Page.Block
            width="2xl"
            gutters
            className="-translate-y-48 sm:-translate-y-32"
          >
            <HGrid columns="1fr" gap="16">
              <Box
                background="surface-default"
                borderWidth="1"
                borderColor="border-subtle"
                borderRadius="xlarge"
                paddingBlock={{ xs: "12", sm: "16" }}
                paddingInline={{ xs: "4", sm: "12" }}
                className="relative"
              >
                <VStack gap="12">
                  {!reducedMotion && (
                    <Button
                      variant="tertiary-neutral"
                      size="small"
                      className="absolute right-2 top-2"
                      icon={
                        pause ? (
                          <PlayFillIcon title="Start animasjon" />
                        ) : (
                          <PauseFillIcon title="Stopp animasjon" />
                        )
                      }
                      onClick={() => {
                        setPause(!pause);
                        localStorage.setItem(
                          "pause-animations",
                          JSON.stringify(!pause),
                        );
                      }}
                    />
                  )}
                  <Box paddingInline={{ xs: "2", sm: "6" }}>
                    <Heading
                      level="2"
                      size="xlarge"
                      className="text-deepblue-700"
                      spacing
                    >
                      God praksis
                    </Heading>
                    <BodyLong size="large" className="max-w-3xl">
                      {page?.god_praksis_intro ??
                        "Alle som jobber med produktutvikling i Nav sitter på kunnskap og erfaring som er nyttig for andre. Derfor deler vi god praksis med hverandre her."}
                    </BodyLong>
                  </Box>

                  <ul className="grid gap-x-8 md:grid-cols-2 xl:grid-cols-3">
                    {tema.map((t) => (
                      <GpFrontpageCard
                        key={t.title}
                        href={`/god-praksis/${t.slug.current}`}
                        image={t.pictogram}
                      >
                        {t.title}
                      </GpFrontpageCard>
                    ))}
                  </ul>
                </VStack>
              </Box>
              {/* Kept commented here in case we want to show future questionnaires from uxtweaks */}
              {/* <UxTweaks
                href="https://study.uxtweak.com/treetest/..."
                length={3}
              /> */}

              {blocks && (
                <Box paddingInline={{ xs: "2", lg: "18" }}>
                  <FrontpageBlock blocks={blocks} />
                </Box>
              )}
            </HGrid>
          </Page.Block>
        </Box>
      </main>
    </Page>
  );
};

export default function HomePage(props: PageProps["props"]) {
  return props?.preview ? (
    <PagePreview query={query} props={props} params={{ preview: "true" }}>
      {(previewProps) => <Forside {...previewProps} />}
    </PagePreview>
  ) : (
    <Forside {...props} />
  );
}
