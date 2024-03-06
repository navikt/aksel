import { useState } from "react";
import { BodyLong, Box, Heading } from "@navikt/ds-react";
import Cube from "@/layout/god-praksis-page/hero/Cube";
import HeroSelect from "@/layout/god-praksis-page/hero/HeroSelect";
import { GpTemaT, HeroNavT } from "@/layout/god-praksis-page/interface";

type GpHeroProps = { tema: GpTemaT | null } & HeroNavT;

function Hero({ tema, heroNav }: GpHeroProps) {
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
      <HeroSelect
        heroNav={heroNav}
        currentSlug={tema?.slug}
        open={open}
        setOpen={setOpen}
      />
      <div aria-hidden={open} className="relative z-10">
        <Heading
          level="1"
          size="xlarge"
          className="z-10 mt-2 text-aksel-heading"
        >
          {tema?.title ?? "Alle tema"}
        </Heading>
        {tema?.description && (
          <BodyLong size="large" className="relative z-10 mt-4">
            {tema.description}
          </BodyLong>
        )}
      </div>
    </Box>
  );
}

export default Hero;
