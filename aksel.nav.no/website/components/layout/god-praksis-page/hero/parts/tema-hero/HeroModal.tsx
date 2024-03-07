import { useRef, useState } from "react";
import { BodyLong, Box, Heading, Modal } from "@navikt/ds-react";
import Cube from "@/layout/god-praksis-page/hero/Cube";
import { HeroList } from "@/layout/god-praksis-page/hero/parts/HeroList";
import { TemaSelectButton } from "@/layout/god-praksis-page/hero/parts/tema-hero/SelectButton";
import { GpTemaT, HeroNavT } from "@/layout/god-praksis-page/interface";

type GpTemaHeroModalProps = { tema: GpTemaT | null } & HeroNavT;

export function TemaHeroModal({ tema, heroNav }: GpTemaHeroModalProps) {
  const currentSelected = useRef<HTMLElement | null>(null);

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

      <TemaSelectButton onClick={() => setOpen(true)} expanded={open} />
      <div className="relative z-10">
        <Heading
          level="1"
          size="xlarge"
          className="z-10 mt-2 text-aksel-heading"
        >
          {tema?.title}
        </Heading>
        {tema?.description && (
          <BodyLong size="large" className="relative z-10 mt-4">
            {tema.description}
          </BodyLong>
        )}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        header={{ heading: "Tema", closeButton: true }}
        className="bg-surface-subtle"
        width="small"
      >
        <Box paddingInline="8" paddingBlock="0 6">
          <Cube variant="dark" />

          <HeroList
            currentSelected={currentSelected}
            currentSlug={tema?.slug}
            heroNav={heroNav}
            setOpen={setOpen}
          />
        </Box>
      </Modal>
    </Box>
  );
}
