import {
  BodyShort,
  Box,
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
              <BodyShort size="small">Statuskode 500</BodyShort>
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
  index: 4,
  title: "Med feil-id",
  desc: "Burde inneholde et hint om hva som er feil, og en feil-id som kan screenshottes",
  sandbox: false,
};
