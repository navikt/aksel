import { Metadata } from "next";
import NextLink from "next/link";
import { Image } from "sanity";
import { ComponentIcon, FaceLaughIcon, TokenIcon } from "@navikt/aksel-icons";
import {
  Bleed,
  BodyLong,
  BoxNew,
  HGrid,
  HStack,
  Heading,
  Link,
  LinkCard,
  Show,
  VStack,
} from "@navikt/ds-react";
import {
  LinkCardAnchor,
  LinkCardDescription,
  LinkCardIcon,
  LinkCardTitle,
} from "@navikt/ds-react/LinkCard";
import { Page as AkselPage, PageBlock } from "@navikt/ds-react/Page";
import { AnimationButton } from "@/app/(routes)/(root)/_ui/AnimationButton";
import { urlForOpenGraphImage } from "@/app/_sanity/utils";
import { AnimatedArrowRight } from "@/app/_ui/animated-arrow/AnimatedArrow";
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
import { FrontpageLatest, LatestT } from "./_ui/FrontpageLatest";
import { GpFrontpageCard } from "./_ui/GpFrontpageCard";
import { MainWrapper } from "./_ui/MainWrapper";
import styles from "./_ui/frontpage.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const { data: page } = await sanityFetch({
    query: LANDINGSSIDE_META_QUERY,
    stega: false,
  });

  return {
    title: "Aksel",
    description:
      page?.seo?.meta ??
      `En samling ressurser fra ulike fagdisipliner som hjelper oss å skape bedre, universelt tilgjengelige og sammenhengende produkter i Nav.`,
    openGraph: {
      images: urlForOpenGraphImage(page?.seo?.image as Image),
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
    <AkselPage
      footer={<Footer />}
      footerPosition="belowFold"
      contentBlockPadding="none"
      className={styles.akselPage}
    >
      <Header />
      <PauseAnimationProvider>
        <MainWrapper>
          <div className={styles.heroLinearBG} />
          <div className={styles.mainBanner}>
            <Link
              href="/darkside"
              target="_blank"
              as={NextLink}
              variant="neutral"
              data-animated-arrow-anchor
            >
              Vi trenger testere fra team i Nav for darkmode og theming!
              <AnimatedArrowRight />
            </Link>
          </div>

          <BoxNew className={styles.forsidePageWrapper}>
            <PageBlock width="xl" gutters>
              <Hero />
              {/* Designsystemet */}
              <Bleed marginInline="full" reflectivePadding>
                <BoxNew
                  paddingInline={{ xs: "space-0", sm: "space-48" }}
                  marginInline={{ xs: "space-0", md: "space-96" }}
                >
                  <HStack justify="end" marginBlock="space-16">
                    <AnimationButton />
                  </HStack>
                  <HGrid gap="space-24" as="ul" columns={{ sm: 1, xl: 2 }}>
                    <BoxNew borderColor="brand-blue" asChild>
                      <LinkCard data-color="brand-blue" arrow={false}>
                        <BoxNew
                          asChild
                          padding="space-20"
                          borderRadius="12"
                          background="brand-blue-strong"
                        >
                          <LinkCardIcon>
                            <svg
                              width="26"
                              height="26"
                              viewBox="0 0 48 48"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden
                              focusable="false"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M11.1213 2.05025C12.4341 0.737498 14.2146 0 16.0711 0H41C44.866 0 48 3.13401 48 7V31.9289C48 33.7854 47.2625 35.5659 45.9497 36.8787L45.8787 36.9497L35.4142 47.4142C34.6332 48.1953 33.3668 48.1953 32.5858 47.4142C31.8047 46.6332 31.8047 45.3668 32.5858 44.5858L43.0503 34.1213C44.2218 32.9497 44.2218 31.0503 43.0503 29.8787L18.1213 4.94974C16.9503 3.77876 15.0522 3.77817 13.8804 4.94799L13.8787 4.94975L3.41421 15.4142C2.63316 16.1953 1.36683 16.1953 0.585786 15.4142C-0.0976316 14.7308 -0.183059 13.6758 0.329504 12.8995C0.402728 12.7886 0.488155 12.6834 0.585786 12.5858L11.0503 2.12132L11.0524 2.11913L11.1213 2.05025ZM44 7V25.1716L22.8284 4H41C42.6569 4 44 5.34315 44 7ZM21.9142 28.9142C22.6953 28.1332 22.6953 26.8668 21.9142 26.0858C21.1332 25.3047 19.8668 25.3047 19.0858 26.0858L0.585786 44.5858C-0.195263 45.3668 -0.195263 46.6332 0.585786 47.4142C1.36683 48.1953 2.63316 48.1953 3.41421 47.4142L21.9142 28.9142Z"
                                fill="var(--ax-text-contrast)"
                              />
                            </svg>
                          </LinkCardIcon>
                        </BoxNew>

                        <Show above="sm" asChild>
                          <LinkCardTitle data-color="neutral">
                            <LinkCardAnchor asChild>
                              <NextLink
                                href="/designsystemet"
                                style={{ fontSize: "1.75rem" }}
                              >
                                Designsystemet
                              </NextLink>
                            </LinkCardAnchor>
                          </LinkCardTitle>
                        </Show>
                        <Show below="sm" asChild>
                          <LinkCardTitle data-color="neutral">
                            <LinkCardAnchor asChild>
                              <NextLink href="/designsystemet">
                                Designsystemet
                              </NextLink>
                            </LinkCardAnchor>
                          </LinkCardTitle>
                        </Show>
                      </LinkCard>
                    </BoxNew>

                    <LinkCard data-color="brand-blue" arrow={false}>
                      <BoxNew
                        asChild
                        padding="space-8"
                        borderRadius="12"
                        background="brand-blue-moderateA"
                      >
                        <LinkCardIcon>
                          <ComponentIcon
                            fontSize="3rem"
                            color="var(--ax-text-subtle)"
                          />
                        </LinkCardIcon>
                      </BoxNew>
                      <LinkCardTitle data-color="neutral">
                        <LinkCardAnchor asChild>
                          <NextLink href="/komponenter/core">
                            Komponenter
                          </NextLink>
                        </LinkCardAnchor>
                      </LinkCardTitle>
                      <LinkCardDescription>
                        Komponenter og primitives
                      </LinkCardDescription>
                    </LinkCard>
                    <LinkCard data-color="brand-blue" arrow={false}>
                      <BoxNew
                        asChild
                        padding="space-8"
                        borderRadius="12"
                        background="brand-blue-moderateA"
                      >
                        <LinkCardIcon>
                          <TokenIcon
                            fontSize="3rem"
                            color="var(--ax-text-subtle)"
                          />
                        </LinkCardIcon>
                      </BoxNew>
                      <LinkCardTitle data-color="neutral">
                        <LinkCardAnchor asChild>
                          <NextLink href="/grunnleggende/styling/design-tokens">
                            Design tokens
                          </NextLink>
                        </LinkCardAnchor>
                      </LinkCardTitle>
                      <LinkCardDescription>
                        Farger, spacing, radius, etc.
                      </LinkCardDescription>
                    </LinkCard>
                    <LinkCard data-color="brand-blue" arrow={false}>
                      <BoxNew
                        asChild
                        padding="space-8"
                        borderRadius="12"
                        background="brand-blue-moderateA"
                      >
                        <LinkCardIcon>
                          <FaceLaughIcon
                            fontSize="3rem"
                            color="var(--ax-text-subtle)"
                          />
                        </LinkCardIcon>
                      </BoxNew>
                      <LinkCardTitle data-color="neutral">
                        <LinkCardAnchor asChild>
                          <NextLink href="/komponenter/ikoner">Ikoner</NextLink>
                        </LinkCardAnchor>
                      </LinkCardTitle>
                      <LinkCardDescription>
                        900+ linje- og fylte ikoner
                      </LinkCardDescription>
                    </LinkCard>
                  </HGrid>
                </BoxNew>
              </Bleed>

              {/* God praksis */}

              <Bleed
                marginInline="full"
                reflectivePadding
                className={styles.cubeFader}
              >
                <BoxNew
                  background="raised"
                  borderWidth="1"
                  borderColor="neutral-subtleA"
                  borderRadius="xlarge"
                  paddingBlock={{ xs: "space-48" }}
                  paddingInline={{ xs: "space-16", sm: "space-48" }}
                  marginBlock="space-64 0"
                >
                  <VStack gap="space-12">
                    <BoxNew>
                      <Heading
                        level="2"
                        size="xlarge"
                        spacing
                        data-aksel-heading-color
                      >
                        <Link
                          as={NextLink}
                          href="/god-praksis"
                          data-aksel-heading-color
                        >
                          God praksis
                        </Link>
                      </Heading>
                      <BodyLong size="large" className={styles.godPraksisInfo}>
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
              {latest && <FrontpageLatest latest={latest as LatestT[]} />}
            </PageBlock>
          </BoxNew>
        </MainWrapper>
      </PauseAnimationProvider>
    </AkselPage>
  );
};

export default Page;
