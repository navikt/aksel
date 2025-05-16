import React from "react";
import { CodeIcon, PaletteIcon } from "@navikt/aksel-icons";
import { BodyLong, HStack, Heading, Tag, VStack } from "@navikt/ds-react";
import {
  LinkCard,
  LinkCardDescription,
  LinkCardIcon,
  LinkCardTitle,
} from "../../(god-praksis)/_ui/link-card/LinkCard";

export const metadata = {
  title: "Designsystemet",
  description:
    "Designsystemet Aksel er et felles design- og utviklingsrammeverk for NAV. " +
    "Det inneholder retningslinjer, komponenter og verktøy for å bygge digitale tjenester " +
    "som er brukervennlige, tilgjengelige og i tråd med NAVs visuelle identitet.",
};

const Page = async () => {
  return (
    <VStack as="main" align="center" gap="space-80">
      <VStack gap="space-48" paddingBlock="space-24">
        <VStack gap="space-16" width="600px" align="center">
          <VStack gap="space-8">
            <Tag variant="success">Ny versjon av Aksel er ute (darkside)</Tag>
            <Heading level="1" size="xlarge">
              Aksel designsystemet
            </Heading>
          </VStack>
          <BodyLong size="large" as="p" align="center">
            Aksel er designsystemet til Navs produktutvikling, en samling med
            designtokens, dokumenterte komponenter, maler og guider. En komplett
            plattform for å lage førsteklasses grensesnitt
          </BodyLong>
        </VStack>
        <HStack gap="space-24">
          <LinkCard>
            <LinkCardTitle as="h2">Start med design</LinkCardTitle>
            <LinkCardDescription>
              Figma-filer og kreative arenaer
            </LinkCardDescription>
            <LinkCardIcon>
              <PaletteIcon fontSize="48" />
            </LinkCardIcon>
          </LinkCard>
          <LinkCard>
            <LinkCardTitle as="h2">Start med utvikling</LinkCardTitle>
            <LinkCardDescription>Installasjon og tips</LinkCardDescription>
            <LinkCardIcon>
              <CodeIcon fontSize="48" />
            </LinkCardIcon>
          </LinkCard>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Page;
