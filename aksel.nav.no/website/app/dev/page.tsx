import {
  Page as AkselPage,
  Bleed,
  BodyLong,
  BoxNew,
  HGrid,
  Heading,
  VStack,
} from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import { sanityFetch } from "../_sanity/live";
import {
  GOD_PRAKSIS_TEMA_QUERY,
  LANDINGSSIDE_LATEST_QUERY,
} from "../_sanity/queries";
import Footer from "../_ui/footer/Footer";
import { Header } from "../_ui/header/Header";
import "../globals.css";
import { PauseAnimationProvider } from "./_ui/AnimationStopContext";
import { FrontpageLatest } from "./_ui/FrontpageLatest";
import GpFrontpageCard from "./_ui/GpFrontpageCard";
import { Hero } from "./_ui/Hero";
import { HeroGradientBG } from "./_ui/HeroGradientBG";
import styles from "./_ui/landingpage.module.css";

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
          <HeroGradientBG />
          <main tabIndex={-1} id="hovedinnhold" className={styles.frontPage}>
            <div className={styles.mainBanner}>
              <a href="/darkside" target="_blank">
                Vi trenger testere fra team i Nav for darkmode og theming!
              </a>
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
                          className={styles.godPraksisHeading}
                          spacing
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
          </main>
        </PauseAnimationProvider>
      </AkselPage>
    </>
  );
};

export default Page;
