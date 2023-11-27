import {
  BodyShort,
  Box,
  Button,
  HGrid,
  Heading,
  Link,
  List,
  Page,
} from "@navikt/ds-react";
import { useEffect } from "react";

export default function Example() {
  useDekorator();

  return (
    <Page footer={<Footer />}>
      <Header />
      <Page.Block as="main" width="xl" gutters>
        <Box paddingBlock="20 8">
          <HGrid gap="12" columns={{ sm: 1, md: 2 }}>
            <Box>
              <BodyShort textColor="subtle" size="small">
                Statuskode 500
              </BodyShort>
              <Heading level="1" size="large" spacing>
                Beklager, det har skjedd en feil
              </Heading>
              <BodyShort>
                En teknisk feil gjør at siden er utilgjengelig.
              </BodyShort>
              <List>
                <List.Item>Last siden på nytt (det kan hjelpe)</List.Item>
                <List.Item>Prøv igjen om noen minutter</List.Item>
                <List.Item>
                  Dersom problemet vedvarer kan du{" "}
                  {/* https://nav.no/kontaktoss for eksterne flater */}
                  <Link href="#">kontakte oss</Link>
                </List.Item>
              </List>

              <Box paddingBlock="8">
                <BodyShort size="small">Feil-id: ##### </BodyShort>
              </Box>

              <Box paddingBlock="12 16">
                <Button>Gå til Min side</Button>
              </Box>

              <Heading level="1" size="large" spacing>
                Something went wrong
              </Heading>
              <BodyShort>
                <Link href="#">Contact us</Link> if the problem persists. You
                can try to remedy the problem by refreshing this again in a few
                minutes.
              </BodyShort>
            </Box>
          </HGrid>
        </Box>
      </Page.Block>
      <Env />
    </Page>
  );
}

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

export const args = {
  index: 2,
  title: "Komplett",
  desc: "Burde inneholde et hint om hva som er feil, feil-id, CTA, og feilmelding på flere språk",
  sandbox: false,
};
