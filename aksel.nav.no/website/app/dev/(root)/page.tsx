import { Metadata } from "next";
import NextLink from "next/link";
import { Image } from "sanity";
import {
  Page as AkselPage,
  Bleed,
  BodyLong,
  BoxNew,
  HGrid,
  Heading,
  Link,
  VStack,
} from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import { urlForOpenGraphImage } from "@/app/_sanity/utils";
import { sanityFetch } from "../../_sanity/live";
import {
  GOD_PRAKSIS_TEMA_QUERY,
  LANDINGSSIDE_LATEST_QUERY,
  LANDINGSSIDE_META_QUERY,
} from "../../_sanity/queries";
import Footer from "../../_ui/footer/Footer";
import { Header } from "../../_ui/header/Header";
import "../../globals.css";
import { PauseAnimationProvider } from "./_ui/AnimationStopContext";
import { Hero } from "./_ui/FrontpageHero";
import { FrontpageLatest } from "./_ui/FrontpageLatest";
import { GpFrontpageCard } from "./_ui/GpFrontpageCard";
import { MainWrapper } from "./_ui/MainWrapper";
import styles from "./_ui/frontpage.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const { data: seo } = await sanityFetch({
    query: LANDINGSSIDE_META_QUERY,
    stega: false,
  });

  return {
    title: "God praksis",
    description:
      seo?.meta ??
      `Mange som jobber med produktutvikling i Nav sitter på kunnskap og erfaring som er nyttig for oss alle. Det er god praksis som vi deler her.`,
    openGraph: {
      images: urlForOpenGraphImage(seo?.image as Image),
    },
  };
}

const Page = async () => {
  const [{ data: tema }, { data: latest }] = await Promise.all([
    sanityFetch({
      query: GOD_PRAKSIS_TEMA_QUERY,
    }),
    sanityFetch({
      query: LANDINGSSIDE_LATEST_QUERY,
    }),
  ]);

  return (
    <>
      <AkselPage
        footer={<Footer />}
        footerPosition="belowFold"
        contentBlockPadding="none"
        className={styles.akselPage}
      >
        {/* insert context for AnimationContext wrap here */}
        <Header />
        <PauseAnimationProvider>
          <MainWrapper>
            <div className={styles.heroLinearBG} />
            <div className={styles.mainBanner}>
              <Link
                href="/darkside"
                target="_blank"
                as={NextLink}
                className={styles.bannerLink}
              >
                Vi trenger testere fra team i Nav for darkmode og theming!
              </Link>
            </div>

            <BoxNew className={styles.forsidePageWrapper}>
              <PageBlock width="xl" gutters>
                <Hero />
                {/* God praksis */}
                <Bleed
                  /* TODO: maybe this fading & blocking of cubeanim should be baked into the cubeanim? */
                  className={styles.cubeFader}
                  marginInline="full"
                  reflectivePadding
                >
                  <BoxNew
                    background="raised"
                    borderWidth="1"
                    borderColor="neutral-subtleA"
                    borderRadius="xlarge"
                    paddingBlock={{ xs: "space-48" }}
                    paddingInline={{ xs: "space-16", sm: "space-48" }}
                  >
                    <VStack gap="space-12">
                      <BoxNew paddingInline={{ xs: "2", sm: "6" }}>
                        <Heading
                          level="2"
                          size="xlarge"
                          spacing
                          data-aksel-heading-color
                        >
                          God praksis
                        </Heading>
                        <BodyLong
                          size="large"
                          className={styles.godPraksisInfo}
                        >
                          Alle som jobber med produktutvikling i Nav sitter på
                          kunnskap og erfaring som er nyttig for andre. Derfor
                          deler vi god praksis med hverandre her.
                        </BodyLong>
                      </BoxNew>

                      <HGrid as="ul" columns={{ md: 2, xl: 3 }}>
                        {tema.map((t) => (
                          <GpFrontpageCard
                            key={t.title}
                            href={`/god-praksis/${t.slug?.current}`}
                            image={t.pictogram}
                          >
                            {t.title}
                          </GpFrontpageCard>
                        ))}
                      </HGrid>
                    </VStack>
                  </BoxNew>
                </Bleed>
                {/* Siste fra Aksel */}
                {latest && (
                  <Bleed
                    reflectivePadding
                    marginInline="full"
                    className={styles.cubeBlocker}
                  >
                    <FrontpageLatest latest={latest} />
                  </Bleed>
                )}
              </PageBlock>
            </BoxNew>
          </MainWrapper>
        </PauseAnimationProvider>
      </AkselPage>
    </>
  );
};

export default Page;
