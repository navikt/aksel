import { Metadata } from "next/types";
import { Image } from "sanity";
import { BodyLong, Box, HGrid, Heading } from "@navikt/ds-react";
import { DesignsystemetEyebrow } from "@/app/(routes)/(designsystemet)/_ui/Designsystemet.eyebrow";
import { DesignsystemetPageLayout } from "@/app/(routes)/(designsystemet)/_ui/DesignsystemetPage";
import { DesignsystemetOverviewCard } from "@/app/(routes)/(designsystemet)/_ui/overview/DesignsystemetOverview";
import { sanityFetch } from "@/app/_sanity/live";
import {
  DESIGNSYSTEM_OVERVIEW_BY_TYPE_QUERY,
  DESIGNSYSTEM_TEMPLATES_LANDINGPAGE_QUERY,
} from "@/app/_sanity/queries";
import { urlForOpenGraphImage } from "@/app/_sanity/utils";
import { templatesKategorier } from "@/sanity/config";

export async function generateMetadata(): Promise<Metadata> {
  const { data: page } = await sanityFetch({
    query: DESIGNSYSTEM_TEMPLATES_LANDINGPAGE_QUERY,
    stega: false,
  });

  return {
    title: "Mønster og maler",
    description: page?.seo?.meta,
    openGraph: {
      images: urlForOpenGraphImage(page?.seo?.image as Image),
    },
  };
}

export default async function Page() {
  const { data: links } = await sanityFetch({
    query: DESIGNSYSTEM_OVERVIEW_BY_TYPE_QUERY,
    params: { docType: "templates_artikkel" },
  });

  return (
    <DesignsystemetPageLayout>
      <div>
        <DesignsystemetEyebrow text="Oversikt" />
        <Heading level="1" size="xlarge" data-aksel-heading-color>
          Mønster og maler
        </Heading>
        <Box marginBlock="space-8 space-48" asChild>
          <BodyLong size="large">
            En samling maler og mønstre som kan brukes i Navs digitale
            tjenester.
          </BodyLong>
        </Box>
      </div>

      <div>
        {templatesKategorier
          .filter((kat) => links?.some((x) => x.kategori === kat.value))
          .map((kat) => {
            return (
              <div key={kat.title}>
                <Heading level="2" size="large" data-aksel-heading-color>
                  {kat.title}
                </Heading>
                <HGrid
                  as="ul"
                  columns="repeat(auto-fill, minmax(min(14rem, 100%), 1fr))"
                  gap="space-24"
                  marginBlock="space-16 space-48"
                >
                  {links
                    .filter((page) => page.kategori === kat.value)
                    .map((page) => (
                      <li key={page.slug}>
                        <DesignsystemetOverviewCard page={page} />
                      </li>
                    ))}
                </HGrid>
              </div>
            );
          })}
      </div>
    </DesignsystemetPageLayout>
  );
}
