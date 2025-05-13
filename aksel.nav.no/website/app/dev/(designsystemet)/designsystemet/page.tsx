import React from "react";
import { BodyLong, Heading, Tag, VStack } from "@navikt/ds-react";

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
      </VStack>
    </VStack>
  );
};

export default Page;
