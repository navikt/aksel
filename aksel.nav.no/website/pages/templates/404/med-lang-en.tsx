import { useEffect } from "react";
import {
  BodyShort,
  Box,
  HGrid,
  Heading,
  Link,
  List,
  Page,
  VStack,
} from "@navikt/ds-react";

const Example = () => {
  useDekorator();

  return (
    <Page data-aksel-template="404-v2" footer={<Footer />}>
      <Header />
      <Page.Block as="main" width="xl" gutters>
        <Box paddingBlock="20 16">
          <HGrid gap="12" columns={{ sm: 1, md: 2 }}>
            <VStack gap="16">
              <div>
                <Heading level="1" size="large" spacing>
                  Beklager, vi fant ikke siden
                </Heading>
                <BodyShort>
                  Denne siden kan være slettet eller flyttet, eller det er en
                  feil i lenken.
                </BodyShort>
                <List>
                  <List.Item>Bruk gjerne søket eller menyen</List.Item>
                  <List.Item>
                    <Link href="#">Gå til forsiden</Link>
                  </List.Item>
                </List>
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
          </HGrid>
        </Box>
      </Page.Block>
      <Env />
    </Page>
  );
};

function Header() {
  return <div id="decorator-header" />;
}

function Footer() {
  return <div id="decorator-footer" />;
}

const MILJO_URL = "https://www.nav.no/dekoratoren";

function Env() {
  return (
    <div
      id="decorator-env"
      data-src={`${MILJO_URL}/env?context=privatperson`}
    />
  );
}

/**
 * OBS: Dette er ikke anbefalt metode for å laste dekoratør!
 * Se `nav-dekoratoren`-dokumentasjon for riktig implementasjon
 * @see https://github.com/navikt/nav-dekoratoren
 */
function useDekorator() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `${MILJO_URL}/client.js`;
    script.async = true;
    document.body.appendChild(script);

    const styles = document.createElement("link");
    styles.href = `${MILJO_URL}/css/client.css`;
    styles.rel = "stylesheet";
    document.head.appendChild(styles);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(styles);
    };
  }, []);
}

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default Example;

export const args = {
  index: 4,
  title: "Flerspråk",
  desc: "En 404-feil kan være frustrerende, spesielt hvis den er på et ukjent språk. En melding på engelsk kan gjøre det lettere å forstå problemet og hva du skal gjøre videre",
};
