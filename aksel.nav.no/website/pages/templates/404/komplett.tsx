import { useEffect } from "react";
import { BugIcon } from "@navikt/aksel-icons";
import {
  BodyShort,
  Box,
  Button,
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
    <Page data-aksel-template="404-v1" footer={<Footer />}>
      <Header />
      <Page.Block as="main" width="xl" gutters>
        <Box paddingBlock="20 16">
          <HGrid gap="12" columns={{ sm: 1, md: 2 }}>
            <VStack gap="16">
              <VStack gap="12" align="start">
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
                <Button as="a" href="#">
                  Gå til Min side
                </Button>
                <Link href="#">
                  <BugIcon aria-hidden />
                  Meld gjerne fra om at lenken ikke virker
                </Link>
              </VStack>

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
  index: 0,
  title: "Komplett",
  desc: "I sin fullstendige form kan en 404-side inneholde tittel, feilmelding, løsningsforslag, CTA, tilbakemeldingsfunksjon, flere språk og illustrasjon.",
};
