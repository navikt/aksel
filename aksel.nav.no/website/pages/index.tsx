import cl from "clsx";
import { GetStaticProps } from "next/types";
import { useState } from "react";
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
import GodPraksisCardSimple from "@/cms/cards/GodPraksisCardSimple";
import FrontpageBlock, {
  BlocksT,
} from "@/cms/frontpage-blocks/FrontpageBlocks";
import { PagePreview } from "@/draftmode/PagePreview";
import { getDraftClient } from "@/draftmode/client";
import { draftmodeToken, viewerToken } from "@/draftmode/token";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { contributorsAll } from "@/sanity/queries";
import { AkselTemaT, NextPageT } from "@/types";
import { userPrefersReducedMotion } from "@/utils";
import { IntroCards } from "@/web/IntroCards";
import { UxTweaks } from "@/web/Uxtweaks";
import { AkselCubeAnimated } from "@/web/aksel-cube/AkselCube";
import { SEO } from "@/web/seo/SEO";

type PageProps = NextPageT<{
  tema: AkselTemaT[];
  page: {
    title: string;
    god_praksis_intro: string;
    seo: { meta: string; image: string };
  };
  blocks?: BlocksT[];
}>;

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
    setPause(JSON.parse(data) ?? false);
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
          "En samling ressurser fra ulike fagdisipliner som hjelper oss å skape bedre, universelt tilgjengelige og sammenhengende produkter i NAV."
        }
        image={page?.seo?.image}
      />
      <Header />
      <main tabIndex={-1} id="hovedinnhold" className="focus:outline-none">
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
                        "Alle som jobber med produktutvikling i NAV sitter på kunnskap og erfaring som er nyttig for andre. Derfor deler vi god praksis med hverandre her."}
                    </BodyLong>
                  </Box>

                  <ul className="grid gap-x-8 md:grid-cols-2 xl:grid-cols-3">
                    {tema.map((t) => (
                      <GodPraksisCardSimple key={t._id} node={t} />
                    ))}
                  </ul>
                </VStack>
              </Box>
              <UxTweaks
                href="https://study.uxtweak.com/treetest/onFDOBRUT19G3KNNNa7DD"
                length={3}
              />

              <Box paddingInline={{ xs: "2", lg: "18" }}>
                <FrontpageBlock blocks={blocks} />
              </Box>
            </HGrid>
          </Page.Block>
        </Box>
      </main>
    </Page>
  );
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
        "artikler": select(
          $preview == "true" => *[_type == "aksel_artikkel" && defined(publishedAt) && !(_id in ^.highlights[]._ref)] | order(publishedAt desc)[0...4]{
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
          $preview != "true" => *[_type == "aksel_artikkel" && defined(publishedAt) && !(_id in ^.highlights[]._ref) && count(*[references(^._id)]) > 0] | order(publishedAt desc)[0...4]{
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
          }
        ),
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

export const getStaticProps: GetStaticProps = async ({
  draftMode = false,
}): Promise<PageProps> => {
  const client = getDraftClient({
    draftMode,
    token: draftMode ? draftmodeToken : viewerToken,
  });

  const {
    page = null,
    tema = null,
    blocks = null,
  } = await client.fetch(query, {
    preview: "false",
  });

  const validateTema = tema
    .filter(
      (t) =>
        t?.title &&
        t?.slug &&
        t?.pictogram &&
        t?.seksjoner.some(
          (seksjon) => seksjon?.sider.some((side: any) => side?._ref),
        ),
    )
    .sort((a, b) => a.title.localeCompare(b.title));

  return {
    props: {
      tema: validateTema,
      page,
      blocks,
      slug: "/",
      id: page?._id ?? "",
      title: "Forsiden",
      draftMode,
      token: draftMode ? draftmodeToken : "",
    },
    revalidate: 600,
    notFound: false,
  };
};

export default function FrontPage(props: PageProps["props"]) {
  return props.draftMode ? (
    <PagePreview query={query} props={props} params={{ preview: "true" }}>
      {(_props) => <Forside {..._props} />}
    </PagePreview>
  ) : (
    <Forside {...props} />
  );
}
