import { ArrowRightIcon } from "@navikt/aksel-icons";
import {
  Accordion,
  Bleed,
  BodyLong,
  BodyShort,
  Box,
  Button,
  Checkbox,
  GuidePanel,
  Heading,
  Link,
  List,
  Page,
  Show,
  Stack,
  VStack,
} from "@navikt/ds-react";
import { ApplicationPictogram } from "@/assets/Icons";
import {
  Env,
  Footer,
  Header,
  useDekorator,
} from "../../../components/utils/dekorator";

function Example() {
  useDekorator();

  return (
    <Page data-aksel-template="500-v2" footer={<Footer />}>
      <Header />
      <VStack as="main" gap="8">
        <Page.Block width="text" gutters>
          <Bleed marginInline={{ lg: "24" }}>
            <Stack
              align="center"
              gap="6"
              direction={{ xs: "row-reverse", lg: "row" }}
              justify="start"
              wrap={false}
            >
              <Show above="sm">
                <ApplicationPictogram title="Application" />
              </Show>
              <VStack gap="1" style={{ flex: 1 }}>
                <BodyShort size="small">NAV 10-07.03 (om relevant)</BodyShort>
                <Heading level="1" size="large">
                  Søknad om arbeidsavklaringspenger (AAP)
                </Heading>
              </VStack>
            </Stack>
          </Bleed>
        </Page.Block>
        <Page.Block width="text" gutters>
          <VStack gap="12">
            <GuidePanel poster>
              <Heading level="2" size="medium" spacing>
                Hei, Luke Skywalker!
              </Heading>
              <BodyLong spacing>
                Jeg er her for å veilede deg gjennom søknaden. Svarene dine
                lagres underveis, slik at du trygt kan gå tilbake og endre dem.
              </BodyLong>
              <BodyLong spacing>
                Arbeidsavklaringspenger forkortes ofte med “AAP”.
              </BodyLong>
              <BodyLong>
                AAP skal sikre deg inntekt når du på grunn av sykdom eller skade
                har behov for å få avklart mulighetene dine til å jobbe.{" "}
                <Link href="#">
                  Les mer om AAP, hvem som kan søke og hva du kan få på nav.no
                </Link>
                .
              </BodyLong>
            </GuidePanel>
            <Box>
              <Heading level="2" size="large" spacing>
                Før du søker
              </Heading>
              <List>
                <List.Item>
                  Vanligvis kan du tidligst få AAP fra den dagen du søker.
                </List.Item>
                <List.Item>
                  Du kan søke om AAP selv om du ikke har mottatt sykepenger.
                </List.Item>
              </List>
            </Box>
            <Box>
              <Accordion>
                <Accordion.Item>
                  <Accordion.Header>
                    Informasjon vi henter om deg
                  </Accordion.Header>
                  <Accordion.Content>
                    <BodyLong spacing>
                      Her skal det så informasjon om hvor vi vil hente
                      opplysninger om søkeren og hva slags opplysninger vi
                      henter.
                    </BodyLong>
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                  <Accordion.Header>
                    Hvordan vi behandler personopplysninger
                  </Accordion.Header>
                  <Accordion.Content>
                    <BodyLong spacing>
                      Her skal det stå informasjon om hvordan vi behandler
                      personopplysningene til søkeren.
                    </BodyLong>
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                  <Accordion.Header>Automatis behandling</Accordion.Header>
                  <Accordion.Content>
                    <BodyLong spacing>
                      Her skal det stå informasjon om hva automatisk behandling
                      er for noe og hva det betyr for søkeren. Samt informasjon
                      om søkers rettigheter ved automatisk avslag.
                    </BodyLong>
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                  <Accordion.Header>Vi lagrer svar underveis</Accordion.Header>
                  <Accordion.Content>
                    <BodyLong spacing>
                      Her skal det stå informasjon om hvordan denne søknaden
                      mellomlagrer informasjonen til søkeren og hvor lenge
                      informasjonen lagres. Både automatisk lagring og samtykke
                      til lagring med lagre-knapp.
                    </BodyLong>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion>
            </Box>
            <Box paddingBlock="0 12">
              <BodyLong>
                Det er viktig at du gir oss riktige opplysninger slik at vi kan
                behandle saken din.{" "}
                <Link href="#gi-riktige-opplysninger">
                  Les mer om viktigheten av å gi riktige opplysninger.
                </Link>
              </BodyLong>
              <Box paddingBlock="4 8">
                <Checkbox>
                  Jeg vil svare så godt jeg kan på spørsmålene i søknaden.
                </Checkbox>
              </Box>
              <Button
                variant="primary"
                icon={<ArrowRightIcon />}
                iconPosition="right"
              >
                Start søknad
              </Button>
            </Box>
          </VStack>
        </Page.Block>
      </VStack>
      <Env />
    </Page>
  );
}

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default Example;

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
  title: "Introside AAP",
};
