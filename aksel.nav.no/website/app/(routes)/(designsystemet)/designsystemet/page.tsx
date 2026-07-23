import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import { DesignsystemStats } from "@/app/(routes)/(designsystemet)/designsystemet/_ui/stats/DesignsystemStats";
import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
  sanityFetchMetadata,
} from "@/app/_sanity/live";
import { DS_FRONT_PAGE_QUERY } from "@/app/_sanity/queries";
import { urlForOpenGraphImage } from "@/app/_sanity/utils";
import { DesignsystemetPageLayout } from "../_ui/DesignsystemetPage";
import { ChangeLogNews } from "./_ui/change-log/ChangeLogNews";
import { DSLayersOverview } from "./_ui/ds-layers-overview/DSLayersOverview";
import { GettingStartedSection } from "./_ui/getting-started/GettingStartedSection";
import DSLandingPageHeading from "./_ui/page-heading/DSLandingPageHeading";
import SupportSection from "./_ui/support-section/SupportSection";

export async function generateMetadata(): Promise<Metadata> {
  const { perspective } = await getDynamicFetchOptions();
  const { data: pageData } = await sanityFetchMetadata({
    query: DS_FRONT_PAGE_QUERY,
    perspective,
  });

  const pageOgImage = urlForOpenGraphImage(pageData?.seo?.image);

  return {
    title: pageData?.ds_forside_title,
    description: pageData?.seo?.meta || pageData?.ds_forside_ingress,
    openGraph: {
      images: pageOgImage,
    },
  };
}

export default async function DesignsystemetPage() {
  const { isEnabled: isDraftMode } = await draftMode();

  if (!isDraftMode) {
    return <CachedDesignsystemetPage perspective="published" stega={false} />;
  }

  return (
    <Suspense fallback={null}>
      <DynamicDesignsystemetPage />
    </Suspense>
  );
}

async function DynamicDesignsystemetPage() {
  const { perspective, stega } = await getDynamicFetchOptions();
  return <CachedDesignsystemetPage perspective={perspective} stega={stega} />;
}

async function CachedDesignsystemetPage({
  perspective,
  stega,
}: DynamicFetchOptions) {
  "use cache";

  const { data: dsFrontPageData } = await sanityFetch({
    query: DS_FRONT_PAGE_QUERY,
    perspective,
    stega,
  });

  if (dsFrontPageData === null) {
    notFound();
  }

  return (
    <DesignsystemetPageLayout layout="without-toc">
      <VStack align="center" gap="space-80" asChild position="relative">
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
          <ChangeLogNews
            title={dsFrontPageData.ds_changelog?.title ?? "Endringslogg"}
            description={dsFrontPageData.ds_changelog?.ingress}
            perspective={perspective}
            stega={stega}
          />
          <DesignsystemStats perspective={perspective} stega={stega} />
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
}
