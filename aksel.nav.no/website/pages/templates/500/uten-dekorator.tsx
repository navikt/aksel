import Footer from "@/layout/footer/Footer";
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

export default function Example() {
  return (
    <Page footer={<Footer />}>
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
                  <Link href="https://nav.no/kontaktoss">kontakte oss</Link>
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
                Please refresh this page or try again in a few minutes. If the
                problem persists,{" "}
                <Link href="https://nav.no/kontaktoss">contact us</Link>
              </BodyShort>
            </Box>
          </HGrid>
        </Box>
      </Page.Block>
    </Page>
  );
}

export const args = {
  index: 1,
  title: "Enkel",
  desc: "I sin enkleste form skal 404-side inneholde en tittel, feilmelding, løsningsforslag og illustrasjon.",
  sandbox: false,
};
