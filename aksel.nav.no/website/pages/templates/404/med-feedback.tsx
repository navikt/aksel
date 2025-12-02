import React from "react";
import { BugIcon } from "@navikt/aksel-icons";
import {
  BodyShort,
  Box,
  Heading,
  Link,
  List,
  Page,
  VStack,
} from "@navikt/ds-react";
import {
  Env,
  Footer,
  Header,
  useDekorator,
} from "../../../components/website-modules/examples/__parts/Dekorator";

const Example = () => {
  useDekorator();

  return (
    <Page footer={<Footer />}>
      <Header />
      <Page.Block as="main" width="xl" gutters>
        <Box paddingBlock="space-80 space-64" data-aksel-template="404-v3">
          <VStack gap="space-48" align="start">
            <VStack gap="space-16">
              <Heading level="1" size="large">
                Beklager, vi fant ikke siden
              </Heading>
              <BodyShort>
                Denne siden kan være slettet eller flyttet, eller det er en feil
                i lenken.
              </BodyShort>
              <List>
                <List.Item>Bruk gjerne søket eller menyen</List.Item>
                <List.Item>
                  <Link href="#">Gå til forsiden</Link>
                </List.Item>
              </List>
            </VStack>
            <Link href="#">
              <BugIcon aria-hidden />
              Meld gjerne fra om at lenken ikke virker
            </Link>
          </VStack>
        </Box>
      </Page.Block>
      <Env />
    </Page>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default Example;

/* Storybook story */
export const Demo = {
  render: Example,
  parameters: { layout: "fullscreen" },
};

export const args = {
  index: 3,
  title: "Med tilbakemeldingsfunksjon",
  desc: "Hvis løsningen din støtter det, kan du vurdere å gi brukerne muligheten til å rapportere avvik.",
};
