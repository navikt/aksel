import React from "react";
import { ArrowRightIcon } from "@navikt/aksel-icons";
import {
  Accordion,
  Bleed,
  BodyLong,
  Box,
  Button,
  Checkbox,
  GuidePanel,
  Heading,
  Link,
  List,
  Page,
  Stack,
  VStack,
} from "@navikt/ds-react";
import ApplicationPictogram from "../../../components/website-modules/examples/__parts/ApplicationPictogram";
import {
  Env,
  Footer,
  Header,
  useDekorator,
} from "../../../components/website-modules/examples/__parts/Dekorator";

function Example() {
  useDekorator();

  return (
    <Page footer={<Footer />}>
      <Header />
      <Page.Block width="text" gutters>
        <VStack as="main" gap="8" data-aksel-template="form-intropage-v3">
          <Stack
            gap={{ xs: "3", lg: "6" }}
            direction={{ xs: "column", lg: "row" }}
            wrap={false}
            position="relative"
          >
            <Bleed asChild marginInline={{ lg: "32" }}>
              <Box
                width={{ xs: "64px", lg: "96px" }}
                height={{ xs: "64px", lg: "96px" }}
                asChild
                position={{ xs: "relative", lg: "absolute" }}
              >
                <ApplicationPictogram />
              </Box>
            </Bleed>
            <Heading level="1" size="xlarge">
              Søknad om alderspensjon
            </Heading>
          </Stack>

          <GuidePanel poster>
            <Heading level="2" size="medium" spacing>
              Hei, Luke Skywalker!
            </Heading>
            <BodyLong spacing>
              Jeg er her for å veilede deg gjennom søknaden. Svarene dine lagres
              underveis, slik at du trygt kan gå tilbake og endre dem.
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
                Du kan jobbe samtidig som du tar ut alderspensjon fra Nav.
              </List.Item>
              <List.Item>
                Det er ulike regler for alderspensjon avhengig av når du er
                født.
              </List.Item>
            </List>
            <BodyLong>
              <Link href="#">
                Les mer om alderspensjon, hvem som kan søke og hva du kan få på
                nav.no.
              </Link>
            </BodyLong>
          </GuidePanel>
          <div>
            <Heading level="2" size="large" spacing>
              Her kan du søke om
            </Heading>
            <List>
              <List.Item>Alderspensjon</List.Item>
              <List.Item>Avtalefestet pensjon (AFP) i privat sektor</List.Item>
            </List>
            <BodyLong spacing>
              Du kan lese mer om AFP i privat sektor hos Fellesordningen for
              AFP.
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
                pensjon nå, kan du bruke <Link href="#">kalkulatoren</Link> vår.
                Her kan du også se hvor mye du kan få i pensjon og når du kan ta
                ut pensjon.
              </List.Item>
              <List.Item>
                Du kan søke opptil fire måneder før du skal ta ut pensjon. Nav
                må ha mottatt søknaden senest måneden før uttak. Det er ikke
                mulig å søke tilbake i tid, fordi alderspensjon først kan
                innvilges fra måneden etter at søknad er fremsatt. Du må alltid
                søke for å få alderspensjon, også etter fylte 67 år.
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
                  <BodyLong>
                    Her skal det så informasjon om hvor vi vil hente
                    opplysninger om søkeren og hva slags opplysninger vi henter.
                  </BodyLong>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header>
                  Hvordan vi behandler personopplysninger
                </Accordion.Header>
                <Accordion.Content>
                  <BodyLong>
                    Her skal det stå informasjon om hvordan vi behandler
                    personopplysningene til søkeren.
                  </BodyLong>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header>Automatisk saksbehandling</Accordion.Header>
                <Accordion.Content>
                  <BodyLong>
                    Her skal det stå informasjon om hva automatisk behandling
                    er, hva det betyr for søkeren og informasjon om søkerens
                    rettigheter ved automatisk avslag.
                  </BodyLong>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header>Vi lagrer svar underveis</Accordion.Header>
                <Accordion.Content>
                  <BodyLong>
                    Her skal det stå informasjon om hvordan denne søknaden
                    mellomlagrer informasjonen til søkeren og hvor lenge
                    informasjonen lagres. Vi skal informere om mellomlagring ved
                    både automatisk lagring og ved samtykke til lagring med
                    lagre-knapp.
                  </BodyLong>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </Box>
          <div>
            <BodyLong>
              Det er viktig at du gir oss riktige opplysninger slik at vi kan
              behandle saken din.{" "}
              <Link href="https://www.nav.no/endringer">
                Les mer om viktigheten av å gi riktige opplysninger.
              </Link>
            </BodyLong>
            <Box paddingBlock="4 8">
              <Checkbox>
                Jeg bekrefter at jeg vil svare så riktig som jeg kan.
              </Checkbox>
            </Box>
            <Button
              variant="primary"
              icon={<ArrowRightIcon aria-hidden />}
              iconPosition="right"
            >
              Start søknad
            </Button>
          </div>
        </VStack>
      </Page.Block>
      <Env />
    </Page>
  );
}

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default Example;

/* Storybook story */
export const Demo = {
  render: Example,
  parameters: { layout: "fullscreen" },
};

export const args = {
  index: 0,
  sandbox: false,
  title: "Alderspensjon",
};
