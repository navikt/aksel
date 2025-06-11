"use client";

import cl from "clsx";
import { PauseFillIcon, PlayFillIcon } from "@navikt/aksel-icons";
import { BoxNew, Button, HGrid, HStack, Heading } from "@navikt/ds-react";
import {
  LinkCard,
  LinkCardAnchor,
  LinkCardDescription,
  LinkCardTitle,
} from "../../(god-praksis)/_ui/link-card/LinkCard";
import { AkselCubeAnimated } from "../../_ui/aksel-cube/AkselCube";
import styles from "../_ui/frontpage.module.css";
import { useShouldStopAnimation } from "./useShouldStopAnimation";

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
    <HStack justify="center">
      <HGrid columns={{ xs: 1, md: 3 }} paddingInline="space-12" gap="space-12">
        {links.map((link) => {
          return (
            <LinkCard key={link.title}>
              <LinkCardTitle as="div">
                <LinkCardAnchor href={link.href}>{link.title}</LinkCardAnchor>
              </LinkCardTitle>
              <LinkCardDescription>{link.desc}</LinkCardDescription>
            </LinkCard>
          );
        })}
      </HGrid>
    </HStack>
  );
};

export const Hero = () => {
  const { pause, reducedMotion, setPause, shouldStopAnimation } =
    useShouldStopAnimation();

  return (
    <>
      <BoxNew paddingBlock={{ xs: "0 space-28", md: "0 space-72" }}>
        <div className={styles.hero}>
          <Heading
            level="1"
            size="xlarge"
            className={cl(styles.heroText, {
              "animation-stop": shouldStopAnimation,
            })}
          >
            Aksel gjør det enklere å lage digitale produkter
          </Heading>
          <div>
            <AkselCubeAnimated />
          </div>
        </div>

        <LinkCards
          links={[
            {
              title: "Komponenter",
              desc: "Layout primitives og komponenter",
              href: "/komponenter",
            },
            {
              title: "Design Tokens",
              desc: "Farger, spacing, radius, etc.",
              href: "/grunnleggende/styling/design-tokens",
            },
            {
              title: "Ikoner",
              desc: "900+ linje og fylte ikoner",
              href: "/komponenter/ikoner",
            },
          ]}
        />
      </BoxNew>
      {!reducedMotion && (
        <HStack justify="end" marginBlock="0 space-16">
          <Button
            className={styles.animationButton}
            variant="tertiary-neutral"
            size="small"
            icon={
              pause ? (
                <PlayFillIcon title="Start" />
              ) : (
                <PauseFillIcon title="Stopp" />
              )
            }
            onClick={() => {
              setPause(!pause);
              localStorage.setItem("pause-animations", JSON.stringify(!pause));
            }}
          >
            Animasjon
          </Button>
        </HStack>
      )}
    </>
  );
};
