import { BugIcon } from "@navikt/aksel-icons";
import { BodyShort, Heading, Link, List, Page, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";
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
      <Page.Block as="main" width="text" gutters>
        <VStack
          gap="space-48"
          align="start"
          paddingBlock="space-64 space-80"
          data-aksel-template="404-v4"
        >
          <div>
            <Heading level="1" size="large" spacing>
              Beklager, vi fant ikke siden
            </Heading>

            <BodyShort spacing>
              Denne siden kan være slettet eller flyttet, eller det er en feil i
              lenken.
            </BodyShort>
            <List>
              <List.Item>Bruk gjerne søket eller menyen</List.Item>
              <List.Item>
                <Link href="#">Gå til forsiden</Link>
              </List.Item>
            </List>
          </div>
          <Link href="#">
            <BugIcon aria-hidden />
            Meld gjerne fra om at lenken ikke virker
          </Link>
        </VStack>
      </Page.Block>
      <Env />
    </Page>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  theme: {
    forcedTheme: "light",
    switch: false,
  },
  variant: "fullscreen",
});

/* Storybook story */
export const Demo = {
  render: Example,
  parameters: { layout: "fullscreen" },
};

export const args: ExampleArgsT = {
  index: 3,
  title: "Med tilbakemeldingsfunksjon",
  desc: "Hvis løsningen din støtter det, kan du gi brukerne muligheten til å rapportere inn feilen.",
};
