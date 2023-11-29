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
    <Page footer={<Footer />}>
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
            <StatusSvg />
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

function StatusSvg() {
  return (
    <svg
      data-aksel-template="404-v1"
      width="min(100%, 500px)"
      viewBox="0 0 550 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="404-illustration"
    >
      <path
        d="m60 244 36 1 1-23a541 541 0 0 1 4-49h-1a1233 1233 0 0 1-19 36l-21 35Zm31 91 2-47-88-5 2-39 77-118 70 3-6 119 22 1-2 43-22-1-3 47-52-3Zm175-76c-23 0-42-10-57-28-14-19-21-46-21-82 0-35 7-62 21-80 15-18 34-27 57-27s41 9 56 27c14 18 21 45 21 80 0 36-7 63-21 82a67 67 0 0 1-56 28Zm0-44c4 0 8-2 12-5s7-9 9-19c2-9 3-23 3-42 0-18-1-32-3-41s-5-15-9-18-8-5-12-5c-5 0-9 2-12 5-4 3-7 9-9 18-3 9-4 23-4 41 0 19 1 33 4 42 2 10 5 16 9 19 3 3 7 5 12 5Zm164-86 35-2-1-23a541 541 0 0 1 0-50h-2a1244 1244 0 0 1-15 39l-17 36Zm40 88-2-47-89 5-2-40L441 9l71-3 6 119 22-1 3 42-23 1 3 47-53 3Z"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="6.57 8.76"
        stroke="rgba(203, 207, 213, 1)"
      />
    </svg>
  );
}

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default Example;

export const args = {
  index: 4,
  title: "Flerspråk",
  desc: "En 404-feil kan være frustrerende, spesielt hvis den er på et ukjent språk. En melding på engelsk kan gjøre det lettere å forstå problemet og hva du skal gjøre videre",
};
