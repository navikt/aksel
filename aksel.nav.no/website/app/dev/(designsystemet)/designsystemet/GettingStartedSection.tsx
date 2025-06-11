import { CodeIcon, PaletteIcon } from "@navikt/aksel-icons";
import { HGrid } from "@navikt/ds-react";
import GettingStartedCard from "./GettingStartedCard";

const GettingStartedSection = () => (
  <HGrid gap="space-24" width="768px" columns={2}>
    <GettingStartedCard
      title="Start med design"
      description="Figma-filer og kreative arenaer"
      icon={<PaletteIcon fontSize="48" />}
      link="/grunnleggende/introduksjon/kom-i-gang-med-figma"
    />
    <GettingStartedCard
      title="Start med utvikling"
      description="Installasjon og tips"
      icon={<CodeIcon fontSize="48" />}
      link="/grunnleggende/introduksjon/kom-i-gang-med-kodepakkene"
    />
  </HGrid>
);

export default GettingStartedSection;
