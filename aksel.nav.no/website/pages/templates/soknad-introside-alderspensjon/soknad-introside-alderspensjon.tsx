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
              <VStack gap="1">
                <BodyShort size="small">NAV 10-07.03 (om relevant)</BodyShort>
                <Heading level="1" size="large">
                  Søknad om alderspensjon
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
                Alderspensjon fra folketrygden er livsvarig, og sikrer at du har
                inntekt når du er pensjonist.
              </BodyLong>
              <List>
                <List.Item>
                  Du tjener opp alderspensjon fra inntekt og botid i Norge.
                </List.Item>
                <List.Item>
                  Du kan jobbe samtidig som du tar ut alderspensjon fra NAV.
                </List.Item>
                <List.Item>
                  Det er ulike regler for alderspensjon avhengig av når du er
                  født.
                </List.Item>
              </List>
              <BodyLong>
                <Link href="#">
                  Les mer om alderspensjon, hvem som kan søke og hva du kan få
                  på nav.no.
                </Link>
              </BodyLong>
            </GuidePanel>
            <div>
              <Heading level="2" size="large" spacing>
                Her kan du søke om
              </Heading>
              <List>
                <List.Item>Alderspensjon</List.Item>
                <List.Item>
                  Avtalefestet pensjon (AFP) i privat sektor
                </List.Item>
              </List>
              <BodyLong spacing>
                Du kan lese mer om AFP i privat sektor hos Fellesordningen for
                AFP
              </BodyLong>
              <Heading level="3" size="medium" spacing>
                Dette kan du ikke søke om her
              </Heading>
              <List>
                <List.Item>
                  Avtalefestet pensjon (AFP) i offentlig sektor (link)
                </List.Item>
                <List.Item>Tjenestepensjon (link)</List.Item>
              </List>
              <BodyLong>
                Du kan ikke kombinere AFP i offentlig sektor og alderspensjon.
              </BodyLong>
            </div>
            <div>
              <Heading level="2" size="large" spacing>
                Før du søker
              </Heading>
              <List>
                <List.Item>
                  Er du usikker på om du har høy nok opptjening til å ta ut
                  pensjon nå, kan du bruke <Link href="#">kalkulatoren</Link>{" "}
                  vår. Her kan du også se hvor mye du kan få i pensjon og når du
                  kan ta ut pensjon.
                </List.Item>
                <List.Item>
                  Du kan søke opptil fire måneder før du skal ta ut pensjon. NAV
                  må ha mottatt søknaden senest måneden før uttak. Det er ikke
                  mulig å søke tilbake i tid, fordi alderspensjon først kan
                  innvilges fra måneden etter at søknad er fremsatt. Du må
                  alltid søke for å få alderspensjon, også etter fylte 67 år.
                </List.Item>
                <List.Item>
                  Du kan ta pauser og fortsette å skrive søknaden i inntil fire
                  måneder.
                </List.Item>
              </List>
            </div>
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
                icon={<ArrowRightIcon aria-hidden />}
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
  title: "Introside alderspensjon",
};