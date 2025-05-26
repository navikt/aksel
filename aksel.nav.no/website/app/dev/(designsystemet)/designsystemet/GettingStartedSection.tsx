import { CodeIcon, PaletteIcon } from "@navikt/aksel-icons";
import { Bleed, HStack } from "@navikt/ds-react";
import GettingStartedCard from "./GettingStartedCard";

const GettingStartedSection = () => (
  <Bleed marginInline="full">
    <HStack gap="space-24" justify="center">
      <GettingStartedCard
        title="Start med design"
        description="Figma-filer og kreative arenaer"
        icon={<PaletteIcon fontSize="48" />}
      />
      <GettingStartedCard
        title="Start med utvikling"
        description="Installasjon og tips"
        icon={<CodeIcon fontSize="48" />}
      />
    </HStack>
  </Bleed>
);

export default GettingStartedSection;
