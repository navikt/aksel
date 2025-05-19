import { Heading, VStack } from "@navikt/ds-react";
import { DesignsystemetEyebrow } from "../../_ui/Designsystemet.eyebrow";
import { DesignsystemetPageLayout } from "../../_ui/DesignsystemetPage";
import TokenTableOfContents from "../darkside/design-tokens/_ui/TokenTableOfContents";
import ChangelogPage from "./_ui/ChangelogPage";

export default async function Page() {
  return (
    <DesignsystemetPageLayout layout="with-toc">
      <VStack>
        <DesignsystemetEyebrow type="ds_artikkel" />
        <Heading level="1" size="xlarge" spacing>
          Endringslogg
        </Heading>
        <ChangelogPage />
      </VStack>
      <TokenTableOfContents />
    </DesignsystemetPageLayout>
  );
}
