"use client";

import cl from "clsx";
import { useState } from "react";
import { PauseFillIcon, PlayFillIcon } from "@navikt/aksel-icons";
import {
  Page as AkselPage,
  BodyLong,
  BoxNew,
  Button,
  HGrid,
  Heading,
  VStack,
  useClientLayoutEffect,
} from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import { userPrefersReducedMotion } from "@/utils";
import { AkselCubeAnimated } from "@/web/aksel-cube/AkselCube";
import Footer from "../_ui/footer/Footer";
import {
  LinkCard,
  LinkCardAnchor,
  LinkCardDescription,
  LinkCardTitle,
} from "./(god-praksis)/_ui/link-card/LinkCard";

const LinkCards = ({
  links,
}: {
  links: {
    title: string;
    desc: string;
    href: string;
  }[];
}) => {
  return (
    <HGrid columns={3} paddingInline="space-12" gap="space-12">
      {links.map((link) => {
        return (
          <LinkCard key={link.title}>
            <LinkCardTitle as="h2">
              <LinkCardAnchor href={link.href}>{link.title}</LinkCardAnchor>
            </LinkCardTitle>
            <LinkCardDescription>{link.desc}</LinkCardDescription>
          </LinkCard>
        );
      })}
    </HGrid>
  );
};

const Page = ({ page, blocks }) => {
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
    <AkselPage
      footer={<Footer />}
      footerPosition="belowFold"
      contentBlockPadding="none"
      className={cl(
        "header-animated-bg relative overflow-hidden bg-violet-200",
        { "animation-stop": pause },
      )}
    >
      <main tabIndex={-1} id="hovedinnhold" className="focus:outline-none">
        <div className="bg-violet-600 p-4 text-center text-xl text-white">
          <a
            href="/darkside"
            target="_blank"
            className="rounded p-1 underline hover:decoration-2 focus:shadow-focus-inverted focus:outline-none"
          >
            Vi trenger testere fra team i Nav for darkmode og theming!
          </a>
        </div>
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

          <LinkCards
            links={[
              {
                title: "Komponenter",
                desc: "Bibliotekene Core og Interne flater",
                href: "/komponenter",
              },
              {
                title: "Design Tokens",
                desc: "Farger, spacing, shadows, etc.",
                href: "/grunnleggende/styling/design-tokens",
              },
              {
                title: "Ikoner",
                desc: "Alle ikonene våre",
                href: "/ikoner",
              },
            ]}
          />
        </div>

        <BoxNew>
          {/* God praksis */}

          <PageBlock
            width="2xl"
            gutters
            className="-translate-y-48 sm:-translate-y-32"
          >
            <HGrid columns="1fr" gap="16">
              <BoxNew
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
                  <BoxNew paddingInline={{ xs: "2", sm: "6" }}>
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
                  </BoxNew>

                  {/*
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
                  */}
                </VStack>
              </BoxNew>
              {blocks && (
                <BoxNew paddingInline={{ xs: "2", lg: "18" }}>
                  {/*
                  <FrontpageBlock blocks={blocks} />
                  */}
                </BoxNew>
              )}
            </HGrid>
          </PageBlock>
        </BoxNew>
      </main>
    </AkselPage>
  );
};

export default Page;
