import {
  Page as AkselPage,
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
import { FrontpageLatest } from "./_ui/FrontpageLatest";
import GpFrontpageCard from "./_ui/GpFrontpageCard";
import { Hero } from "./_ui/Hero";
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
        <Header />
        <div className={styles.heroLinearBG} />
        <main tabIndex={-1} id="hovedinnhold" className={styles.frontPage}>
          <div className={styles.mainBanner}>
            <a href="/darkside" target="_blank">
              Vi trenger testere fra team i Nav for darkmode og theming!
            </a>
          </div>

          <Hero />

          <BoxNew className={styles.godPraksis}>
            {/* God praksis */}
            <PageBlock width="2xl" gutters>
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
                    <BodyLong size="large" className={styles.godPraksisInfo}>
                      Alle som jobber med produktutvikling i Nav sitter på
                      kunnskap og erfaring som er nyttig for andre. Derfor deler
                      vi god praksis med hverandre her.
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
            </PageBlock>
            {/* Siste fra Aksel */}
            <PageBlock width="2xl" gutters>
              {latest && <FrontpageLatest latest={latest} />}
            </PageBlock>
          </BoxNew>
        </main>
      </AkselPage>
    </>
  );
};

export default Page;
