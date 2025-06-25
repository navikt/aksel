import React from "react";
import { VStack } from "@navikt/ds-react";
import { sanityFetch } from "@/app/_sanity/live";
import {
  DS_FRONT_PAGE_QUERY,
  N_LATEST_CHANGE_LOGS_QUERY,
} from "@/app/_sanity/queries";
import { DesignsystemetPageLayout } from "../_ui/DesignsystemetPage";
import DSLandingPageHeading from "./_ui/DSLandingPageHeading";
import DSLayersOverview from "./_ui/DSLayersOverview";
import SupportSection from "./_ui/SupportSection";
import AkselByNumbers from "./_ui/aksel-by-numbers/AkselByNumbers";
import ChangeLogNews from "./_ui/change-log/ChangeLogNews";
import GettingStartedSection from "./_ui/getting-started/GettingStartedSection";
import "./ds-forside.css";

export const metadata = {
  title: "Designsystemet",
  description:
    "Designsystemet Aksel er et felles design- og utviklingsrammeverk for NAV. " +
    "Det inneholder retningslinjer, komponenter og verktøy for å bygge digitale tjenester " +
    "som er brukervennlige, tilgjengelige og i tråd med NAVs visuelle identitet.",
};

const DesignsystemetPage = async () => {
  const [{ data: changeLogEntries }, { data: dsFrontPageData }] =
    await Promise.all([
      sanityFetch({
        query: N_LATEST_CHANGE_LOGS_QUERY,
        params: { count: 3 },
      }),
      sanityFetch({
        query: DS_FRONT_PAGE_QUERY,
      }),
    ]);

  if (dsFrontPageData === null) {
    throw new Error("Kunne ikke hente data for Designsystemet forsiden");
  }

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
            title={dsFrontPageData.ds_forside_title}
            introText={dsFrontPageData.ds_forside_ingress}
            promoTag={dsFrontPageData.ds_forside_promo_tag}
          />
          {dsFrontPageData.ds_getting_started && (
            <GettingStartedSection cards={dsFrontPageData.ds_getting_started} />
          )}
        </VStack>
        <DSLayersOverview
          title={dsFrontPageData.ds_layers_overview?.title}
          description={dsFrontPageData.ds_layers_overview?.ingress}
        />
        <ChangeLogNews
          title={dsFrontPageData.ds_changelog?.title}
          description={dsFrontPageData.ds_changelog?.ingress}
          entries={changeLogEntries}
        />
        <AkselByNumbers
          title={dsFrontPageData.ds_aksel_in_numbers?.title}
          description={dsFrontPageData.ds_aksel_in_numbers?.ingress}
          entries={dsFrontPageData.ds_aksel_in_numbers?.statistics}
        />
        <SupportSection
          entries={(dsFrontPageData.ds_support || []).map(
            ({ title, description, link }) => ({
              title,
              description,
              link: {
                href: link?.url,
                label: link?.text,
                icon: link?.icon,
              },
            }),
          )}
        />
      </VStack>
    </DesignsystemetPageLayout>
  );
};

export default DesignsystemetPage;
