import React from "react";
import { VStack } from "@navikt/ds-react";
import { sanityFetch } from "@/app/_sanity/live";
import { N_LATEST_CHANGE_LOGS_QUERY } from "@/app/_sanity/queries";
import { DesignsystemetPageLayout } from "../_ui/DesignsystemetPage";
import GettingStartedSection from "./GettingStartedSection";
import AkselByNumbers from "./_ui/AkselByNumbers";
import ChangeLogNews from "./_ui/ChangeLogNews";
import DSLandingPageHeading from "./_ui/DSLandingPageHeading";
import DSLayersOverview from "./_ui/DSLayersOverview";
import SupportSection from "./_ui/SupportSection";
import "./ds-forside.css";

export const metadata = {
  title: "Designsystemet",
  description:
    "Designsystemet Aksel er et felles design- og utviklingsrammeverk for NAV. " +
    "Det inneholder retningslinjer, komponenter og verktøy for å bygge digitale tjenester " +
    "som er brukervennlige, tilgjengelige og i tråd med NAVs visuelle identitet.",
};

const DesignsystemetPage = async () => {
  const { data: changeLogEntries } = await sanityFetch({
    query: N_LATEST_CHANGE_LOGS_QUERY,
    params: { count: 3 },
  });

  return (
    <DesignsystemetPageLayout layout="without-toc">
      <VStack align="center" gap="space-80" maxWidth="1024px">
        <VStack
          gap="space-48"
          paddingBlock="space-24"
          maxWidth="768px"
          align="center"
        >
          <DSLandingPageHeading
            title="Aksel designsystemet"
            introText="Aksel er designsystemet til Navs produktutvikling, en samling med designtokens, dokumenterte komponenter, maler og guider. En komplett plattform for å lage førsteklasses grensesnitt"
          />
          <GettingStartedSection />
        </VStack>
        <DSLayersOverview />
        <ChangeLogNews entries={changeLogEntries} />
        <AkselByNumbers />
        <SupportSection />
      </VStack>
    </DesignsystemetPageLayout>
  );
};

export default DesignsystemetPage;
