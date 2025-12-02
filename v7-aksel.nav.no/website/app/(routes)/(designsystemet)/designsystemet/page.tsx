import { Metadata } from "next";
import { notFound } from "next/navigation";
import { VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import { sanityFetch } from "@/app/_sanity/live";
import { DS_FRONT_PAGE_QUERY } from "@/app/_sanity/queries";
import { DesignsystemetPageLayout } from "../_ui/DesignsystemetPage";
import { DSLayersOverview } from "./_ui/ds-layers-overview/DSLayersOverview";
import { GettingStartedSection } from "./_ui/getting-started/GettingStartedSection";
import DSLandingPageHeading from "./_ui/page-heading/DSLandingPageHeading";
import SupportSection from "./_ui/support-section/SupportSection";

export async function generateMetadata(): Promise<Metadata> {
  const { data: pageData } = await sanityFetch({
    query: DS_FRONT_PAGE_QUERY,
  });

  return {
    title: pageData?.ds_forside_title,
  };
}

const DesignsystemetPage = async () => {
  const { data: dsFrontPageData } = await sanityFetch({
    query: DS_FRONT_PAGE_QUERY,
  });

  if (dsFrontPageData === null) {
    notFound();
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
              />
              <GettingStartedSection
                cards={dsFrontPageData.ds_getting_started}
              />
            </PageBlock>
          </VStack>
          <DSLayersOverview
            title={
              dsFrontPageData.ds_layers_overview?.title ??
              "Et fleksibelt system"
            }
            description={dsFrontPageData.ds_layers_overview?.ingress}
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
