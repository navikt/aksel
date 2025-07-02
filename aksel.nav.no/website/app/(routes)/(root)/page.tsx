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
import PromoTag from "@/app/_ui/promo-tag/PromoTag";
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

          <BoxNew className={styles.forsidePageWrapper}>
            <PageBlock width="xl" gutters>
              <Hero />
              {/* Designsystemet */}
              <Bleed marginInline="full" reflectivePadding>
                <BoxNew
                  paddingInline={{ xs: "space-0", sm: "space-48" }}
                  marginInline={{ xs: "space-0", md: "space-96" }}
                >
                  <BoxNew paddingBlock="space-0 space-24" marginInline="auto">
                    <PromoTag animated />
                  </BoxNew>
                  <HStack justify="end" marginBlock="space-16">
                    <AnimationButton />
                  </HStack>
                  <HGrid gap="space-24" as="ul" columns={{ sm: 1, xl: 2 }}>
                    <BoxNew borderColor="brand-blue" asChild>
                      <LinkCard data-color="brand-blue" arrow={false}>
                        <BoxNew
                          asChild
                          padding="space-16"
                          borderRadius="12"
                          background="brand-blue-strong"
                        >
                          <LinkCardIcon>
                            <svg
                              width="33"
                              height="32"
                              viewBox="0 0 33 32"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden
                              focusable="false"
                            >
                              <path
                                d="M29.5 21.1191V4.83301C29.4998 3.82074 28.6793 3.00018 27.667 3H11.3809C10.8946 3 10.4278 3.19329 10.084 3.53711L3.06056 10.5605C2.47477 11.1463 1.52525 11.1463 0.939462 10.5605C0.353675 9.97476 0.353675 9.02524 0.939462 8.43945L7.9629 1.41602C8.86933 0.509589 10.099 0 11.3809 0H27.667C30.3361 0.000176254 32.4998 2.16389 32.5 4.83301V21.1191C32.5 22.401 31.9904 23.6307 31.084 24.5371L24.0606 31.5606C23.4748 32.1463 22.5253 32.1463 21.9395 31.5606C21.3537 30.9748 21.3537 30.0252 21.9395 29.4395L28.9629 22.416C29.3067 22.0722 29.5 21.6054 29.5 21.1191Z"
                                fill="var(--ax-text-contrast)"
                              />
                              <path
                                d="M7.58188 1.79749C9.46942 -0.0900478 12.5303 -0.0900473 14.4178 1.79749L30.704 18.0826C32.5914 19.9701 32.5913 23.031 30.704 24.9186L24.0604 31.5612C23.4746 32.1469 22.5251 32.1469 21.9393 31.5612C21.3536 30.9754 21.3535 30.0258 21.9393 29.4401L28.5819 22.7975C29.2978 22.0815 29.2978 20.9207 28.5819 20.2047L12.2957 3.91858C11.5798 3.20284 10.4199 3.20284 9.70395 3.91858L3.0604 10.5612C2.47461 11.1469 1.52509 11.1469 0.939303 10.5612C0.35359 9.97537 0.353541 9.02583 0.939303 8.44007L7.58188 1.79749Z"
                                fill="var(--ax-text-contrast)"
                              />
                              <path
                                d="M12.9393 17.4393C13.5251 16.8536 14.4746 16.8536 15.0604 17.4393C15.6462 18.0251 15.6462 18.9746 15.0604 19.5604L3.06043 31.5604C2.47465 32.1462 1.52513 32.1462 0.93934 31.5604C0.353553 30.9746 0.353553 30.0251 0.93934 29.4393L12.9393 17.4393Z"
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
