import { BodyLong, Heading, VStack } from "@navikt/ds-react";
import { DesignsystemetEyebrow } from "../../_ui/Designsystemet.eyebrow";
import { DesignsystemetPageLayout } from "../../_ui/DesignsystemetPage";
import TokenTableOfContents from "../darkside/design-tokens/_ui/TokenTableOfContents";
import ChangelogPage from "./_ui/ChangelogPage";

export default async function Page() {
  return (
    <DesignsystemetPageLayout layout="with-toc">
      <VStack gap="space-40">
        <VStack gap="space-24">
          <VStack>
            <DesignsystemetEyebrow type="ds_artikkel" />
            <Heading level="1" size="xlarge" data-aksel-heading-color>
              Endringslogg
            </Heading>
            <BodyLong size="large">
              Oversikt over endringer i design, kode og dokumentasjon i Aksel.
            </BodyLong>
          </VStack>
        </VStack>
        <ChangelogPage />
      </VStack>
      <TokenTableOfContents />
    </DesignsystemetPageLayout>
  );
}
