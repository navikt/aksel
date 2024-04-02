import cl from "clsx";
import { useState } from "react";
import { Box, Heading, Modal } from "@navikt/ds-react";
import Cube from "@/layout/god-praksis-page/hero/HeroCube";
import { HeroList } from "@/layout/god-praksis-page/hero/tema-hero/parts/HeroCardList";
import { HeroIntro } from "@/layout/god-praksis-page/hero/tema-hero/parts/HeroIntro";
import { HeroSelectButton } from "@/layout/god-praksis-page/hero/tema-hero/parts/HeroSelectButton";
import { GpTemaT, HeroNavT } from "@/layout/god-praksis-page/interface";
import styles from "../Hero.module.css";

type GpTemaHeroModalProps = { tema: GpTemaT | null } & HeroNavT;

export function TemaHeroModal({ tema, heroNav }: GpTemaHeroModalProps) {
  const [open, setOpen] = useState(false);
  return (
    <Box
      borderRadius="large"
      paddingInline={{ xs: "4", lg: "10" }}
      paddingBlock="10 6"
      className={cl(
        "relative ring-1 ring-teal-400 transition-[height]",
        styles.heroGradient,
      )}
    >
      <Cube />

      <HeroSelectButton onClick={() => setOpen(true)} expanded={open} />
      <HeroIntro title={tema?.title} description={tema?.description} />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className="bg-surface-subtle"
        width="small"
        aria-label="Velg tema"
      >
        <Cube variant="muted" />
        <Modal.Header closeButton className="z-10">
          <Heading level="1" size="medium">
            Tema
          </Heading>
        </Modal.Header>
        <Box paddingInline="8" paddingBlock="0 6">
          <HeroList
            currentSlug={tema?.slug}
            heroNav={heroNav}
            setOpen={setOpen}
          />
        </Box>
      </Modal>
    </Box>
  );
}
