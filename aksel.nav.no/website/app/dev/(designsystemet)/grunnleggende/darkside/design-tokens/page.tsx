import React from "react";
import { ClockDashedIcon } from "@navikt/aksel-icons";
import { BodyLong, HStack, Heading, Link, VStack } from "@navikt/ds-react";
import { FigmaIcon, GithubIcon } from "@/assets/Icons";
import { DesignsystemetEyebrow } from "../../../_ui/Designsystemet.eyebrow";
import { DesignsystemetPageLayout } from "../../../_ui/DesignsystemetPage";
import TokenTableOfContents from "./_ui/TokenTableOfContents";
import TokensPage from "./_ui/TokensPage";

export const metadata = {
  title: "Design tokens",
  description:
    "Ved å bruke design tokens sørger vi for at både designere og utviklere arbeider etter de samme reglene og retningslinjene. " +
    "Dette forenkler vedlikeholdet av designet og sikrer en helhetlig visuell fremstilling på tvers av produkter.",
  /* openGraph: {
      images: ogImages, // Need to add manually from somewhere?
    }, */
};

const Page = async () => {
  return (
    <DesignsystemetPageLayout layout="with-toc">
      <VStack gap="space-40">
        <VStack gap="space-24">
          <VStack>
            <DesignsystemetEyebrow type="ds_artikkel" />
            <Heading level="1" size="xlarge" data-aksel-heading-color>
              Tokenoversikt
            </Heading>
            <BodyLong size="large">
              Tokens er alle farger, avstander, typografi, osv. som vi bruker i
              komponenter og layout.
            </BodyLong>
          </VStack>
          <VStack gap="space-16">
            <HStack gap="space-16" align="center">
              <Link href="https://github.com/navikt/aksel" variant="neutral">
                <GithubIcon aria-hidden="true" />
                GitHub
              </Link>
              <Link
                href="https://www.figma.com/community/file/1214869602572392330"
                variant="neutral"
              >
                <FigmaIcon aria-hidden="true" />
                Figma-community
              </Link>
              <Link
                href="https://aksel.nav.no/grunnleggende/kode/endringslogg"
                variant="neutral"
              >
                <ClockDashedIcon aria-hidden="true" />
                Endringslogg
              </Link>
            </HStack>
          </VStack>
        </VStack>
        <TokensPage />
      </VStack>
      <TokenTableOfContents />
    </DesignsystemetPageLayout>
  );
};

export default Page;
