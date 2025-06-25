import React from "react";
import { VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import { sanityFetch } from "@/app/_sanity/live";
import { DS_FRONT_PAGE_QUERY } from "@/app/_sanity/queries";
import { DesignsystemetPageLayout } from "../_ui/DesignsystemetPage";
import DSLandingPageHeading from "./_ui/DSLandingPageHeading";
import AkselByNumbers from "./_ui/aksel-by-numbers/AkselByNumbers";
import { ChangeLogNews } from "./_ui/change-log/ChangeLogNews";
import DSLayersOverview from "./_ui/ds-layers-overview/DSLayersOverview";
import { GettingStartedSection } from "./_ui/getting-started/GettingStartedSection";
import SupportSection from "./_ui/support-section/SupportSection";
import "./ds-forside.css";

export const metadata = {
  title: "Designsystemet",
  description:
    "Designsystemet Aksel er et felles design- og utviklingsrammeverk for NAV. " +
    "Det inneholder retningslinjer, komponenter og verktøy for å bygge digitale tjenester " +
    "som er brukervennlige, tilgjengelige og i tråd med NAVs visuelle identitet.",
};

const DesignsystemetPage = async () => {
  const [{ data: dsFrontPageData }] = await Promise.all([
    sanityFetch({
      query: DS_FRONT_PAGE_QUERY,
    }),
  ]);

  if (dsFrontPageData === null) {
    throw new Error("Kunne ikke hente data for Designsystemet forsiden");
  }

  return (
    <DesignsystemetPageLayout layout="without-toc">
      <VStack align="center" gap="space-80" asChild>
        <PageBlock width="lg">
          <VStack asChild gap="space-48" align="center">
            <PageBlock width="md">
              <DSLandingPageHeading
                title={dsFrontPageData.ds_forside_title}
                introText={dsFrontPageData.ds_forside_ingress}
                promoTag={dsFrontPageData.ds_forside_promo_tag}
              />
              <GettingStartedSection
                cards={dsFrontPageData.ds_getting_started}
              />
            </PageBlock>
          </VStack>
          <DSLayersOverview
            title={dsFrontPageData.ds_layers_overview?.title}
            description={dsFrontPageData.ds_layers_overview?.ingress}
          />
          <ChangeLogNews
            title={dsFrontPageData.ds_changelog?.title ?? "Endringslogg"}
            description={dsFrontPageData.ds_changelog?.ingress}
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
        </PageBlock>
      </VStack>
    </DesignsystemetPageLayout>
  );
};

export default DesignsystemetPage;
