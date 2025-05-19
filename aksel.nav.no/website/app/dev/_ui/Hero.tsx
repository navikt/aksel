"use client";

import { useState } from "react";
import { PauseFillIcon, PlayFillIcon } from "@navikt/aksel-icons";
import {
  Button,
  HGrid,
  HStack,
  Heading,
  useClientLayoutEffect,
} from "@navikt/ds-react";
import { userPrefersReducedMotion } from "@/utils";
import { AkselCubeAnimated } from "@/web/aksel-cube/AkselCube";
import {
  LinkCard,
  LinkCardAnchor,
  LinkCardDescription,
  LinkCardTitle,
} from "../(god-praksis)/_ui/link-card/LinkCard";
import styles from "./landingpage.module.css";

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
    </HStack>
  );
};

export const Hero = () => {
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
    <>
      <div className="z-20 pb-28">
        <div className={styles.hero}>
          <Heading level="1" size="xlarge" className={styles.heroText}>
            Aksel gjør det enklere å lage digitale produkter
          </Heading>
          <div className={styles.cubeWrapper}>
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
              href: "/ikoner",
            },
          ]}
        />
      </div>
      {!reducedMotion && (
        <HStack justify="end">
          <Button
            className={styles.animationButton}
            variant="tertiary-neutral"
            size="small"
            icon={
              pause ? (
                <PlayFillIcon title="Start animasjon" />
              ) : (
                <PauseFillIcon title="Stopp animasjon" />
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
