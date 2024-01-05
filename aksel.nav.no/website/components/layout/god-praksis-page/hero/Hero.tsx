import { BodyLong, Box, Heading } from "@navikt/ds-react";
import Cube from "@/layout/god-praksis-page/hero/Cube";
import HeroSelect from "@/layout/god-praksis-page/hero/HeroSelect";
import { GpTemaT, HeroNavT } from "@/layout/god-praksis-page/interface";

/**
 * TODO:
 * - Handle dynamic resize better than vw fontsize?
 * - - Can flex-shrink be used here?
 *
 * - Replace liste-elements with chips like in figma
 * - Better aria-label for <nav>
 */
function Hero({ tema, heroNav }: { tema: GpTemaT | null } & HeroNavT) {
  return (
    <Box
      background="surface-alt-3-subtle"
      borderRadius="large"
      paddingInline={{ xs: "4", lg: "10" }}
      paddingBlock="10 6"
      className="bg-gradient-to-tr isolate from-deepblue-200 via-deepblue-100 to-deepblue-100 relative overflow-clip transition-[height]"
    >
      <Cube />
      <HeroSelect heroNav={heroNav} currentSlug={tema?.slug} />
      <Heading level="1" size="xlarge" className="text-aksel-heading z-10 mt-2">
        {tema?.title ?? "Alle tema"}
      </Heading>
      {tema?.description && (
        <BodyLong size="large" className="mt-4 z-10 relative">
          {tema.description}
        </BodyLong>
      )}
    </Box>
  );
}

export default Hero;
