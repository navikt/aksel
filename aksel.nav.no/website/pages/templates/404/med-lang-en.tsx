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
          gap="space-64"
          paddingBlock="space-64 space-80"
          data-aksel-template="404-v4"
        >
          <div>
            <Heading level="1" size="large" spacing>
              Beklager, vi fant ikke siden
            </Heading>
            <VStack gap="space-12">
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
          </div>

          <div>
            <Heading level="2" size="large" spacing>
              Page not found
            </Heading>
            <BodyShort spacing>
              The page you requested cannot be found.
            </BodyShort>
            <BodyShort>
              Go to the <Link href="#">front page</Link>, or use one of the
              links in the menu.
            </BodyShort>
          </div>
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
  index: 4,
  title: "Flerspråk",
  desc: "En 404-feil kan være frustrerende, spesielt hvis den er på et ukjent språk. En melding på engelsk kan gjøre det lettere å forstå problemet og hva du skal gjøre videre.",
};
