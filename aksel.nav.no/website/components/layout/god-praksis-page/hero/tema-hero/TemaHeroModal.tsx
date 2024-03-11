import { useState } from "react";
import { Box, Modal } from "@navikt/ds-react";
import Cube from "@/layout/god-praksis-page/hero/HeroCube";
import { HeroList } from "@/layout/god-praksis-page/hero/tema-hero/parts/HeroCardList";
import { HeroIntro } from "@/layout/god-praksis-page/hero/tema-hero/parts/HeroIntro";
import { HeroSelectButton } from "@/layout/god-praksis-page/hero/tema-hero/parts/HeroSelectButton";
import { GpTemaT, HeroNavT } from "@/layout/god-praksis-page/interface";

type GpTemaHeroModalProps = { tema: GpTemaT | null } & HeroNavT;

export function TemaHeroModal({ tema, heroNav }: GpTemaHeroModalProps) {
  const [open, setOpen] = useState(false);
  return (
    <Box
      background="surface-alt-3-subtle"
      borderRadius="large"
      paddingInline={{ xs: "4", lg: "10" }}
      paddingBlock="10 6"
      className="relative bg-gradient-to-tr from-deepblue-200 via-deepblue-100 to-deepblue-100 transition-[height]"
    >
      <Cube />

      <HeroSelectButton onClick={() => setOpen(true)} expanded={open} />
      <HeroIntro title={tema?.title} description={tema?.description} />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        header={{ heading: "Tema", closeButton: true }}
        className="bg-surface-subtle"
        width="small"
      >
        <Box paddingInline="8" paddingBlock="0 6">
          <Cube variant="light" />

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
