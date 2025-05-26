import React from "react";
import { Page, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import GettingStartedSection from "./GettingStartedSection";
import AkselByNumbers from "./_ui/AkselByNumbers";
import ChangeLogNews from "./_ui/ChangeLogNews";
import DSLandingPageHeading from "./_ui/DSLandingPageHeading";
import DSLayersOverview from "./_ui/DSLayersOverview";
import "./ds-forside.css";

export const metadata = {
  title: "Designsystemet",
  description:
    "Designsystemet Aksel er et felles design- og utviklingsrammeverk for NAV. " +
    "Det inneholder retningslinjer, komponenter og verktøy for å bygge digitale tjenester " +
    "som er brukervennlige, tilgjengelige og i tråd med NAVs visuelle identitet.",
};

const DesignsystemetPage = async () => {
  return (
    <Page>
      <PageBlock as="main" width="md" gutters>
        <VStack align="center" gap="space-80">
          <VStack gap="space-48" paddingBlock="space-24">
            <DSLandingPageHeading
              title="Aksel designsystemet"
              introText="Aksel er designsystemet til Navs produktutvikling, en samling med designtokens, dokumenterte komponenter, maler og guider. En komplett plattform for å lage førsteklasses grensesnitt"
            />
            <GettingStartedSection />
          </VStack>
          <DSLayersOverview />
          <ChangeLogNews />
          <AkselByNumbers />
        </VStack>
      </PageBlock>
    </Page>
  );
};

export default DesignsystemetPage;
